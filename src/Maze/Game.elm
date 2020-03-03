module Maze.Game exposing (main)

import Browser
import Common.Room as Room exposing (Options, Rooms, RoomsWith)
import Common.Shape exposing (circleFx)
import Dict
import Html exposing (div)
import Html.Attributes exposing (style)
import Playground exposing (..)
import Playground.Advanced exposing (embed, subscriptions)
import Random
import Util.Random exposing (few)


config =
    { w = 40
    , h = 40
    , t = 0.25
    , splash = 1
    , initDepth = 1
    }


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> playground.init
        , view =
            \m ->
                [ playground.view m ]
                    |> div
                        [ style "position" "absolute"
                        , style "top" "0"
                        , style "right" "0"
                        , style "bottom" "0"
                        , style "left" "0"
                        ]
        , update = playground.update
        , subscriptions = \_ -> subscriptions.all
        }


type alias Model =
    Game Memory


type Memory
    = Intro
    | Room RoomData
    | NextLevel Number RoomData RoomData
    | StartGame Number RoomData


type alias RoomData =
    { level : RoomsWith { visited : Bool }
    , p : ( Int, Int )
    , exits : Room.Exits
    , moving : Maybe Animation
    , depth : Int
    }


type alias Animation =
    { from : Room.XY
    , to : Room.XY
    , done : Number
    , total : Number
    }


view : Computer -> Memory -> List Shape
view ({ screen, time } as computer) memory =
    (case memory of
        Room ({ p, exits } as roomData) ->
            renderRoom computer roomData

        StartGame t_ roomData ->
            let
                a =
                    t_ * 2 - 1

                t =
                    abs a
            in
            [ circleFx (max screen.width screen.height * t) (rgb 41 23 76)
            ]
                |> applyIf (a < 0) ((++) (titleView computer))
                |> applyIf (a > 0) ((++) (renderRoom computer roomData))

        NextLevel t_ roomData1 roomData2 ->
            let
                a =
                    t_ * 2 - 1

                t =
                    abs a
            in
            [ circleFx (max screen.width screen.height * t) (rgb 41 23 76)
            ]
                |> applyIf (a < 0) ((++) (renderRoom computer roomData1))
                |> applyIf (a > 0) ((++) (renderRoom computer roomData2))

        Intro ->
            titleView computer
    )
        |> (::) (rectangle (rgb 63 35 60) screen.width screen.height)


titleView { screen, time } =
    let
        text1 =
            "Dungeon\nMaze"

        text2 =
            "Pres Space"
    in
    [ [ words (rgb 18 23 61) text1 |> move (wave -1 -1.5 3 time) (wave -1 -1.5 3 time)
      , words (rgb 41 50 104) text1 |> moveY (wave 0 1 3 time)
      , words (rgb 135 42 56) text2 |> scale (0.5 * 17 / 16) |> moveDown 22
      , words (rgb 216 56 67) text2 |> scale (0.5 * 16.5 / 16) |> moveDown 22
      , words (rgb 255 104 102) text2 |> scale 0.5 |> moveDown 22
      ]
        |> group
        |> moveUp 64
        |> scale (screen.width / 128)
    ]


renderRoom { screen } ({ p, exits, depth } as roomData) =
    let
        ( px, py ) =
            playerMove roomData
    in
    [ viewGame roomData
        ++ nextTileView p exits
        ++ [ move px py (words white "☺") ]
        |> group
        |> move -px -py
    , words white ("level:" ++ String.fromInt depth)
        |> move (screen.left + 56) (screen.top - 24)
    ]
        |> group
        |> List.singleton


moveSystem : Computer -> RoomData -> Memory
moveSystem { keyboard, time } ({ moving, p, level, exits } as memory) =
    case moving of
        Just anim ->
            let
                dt =
                    toFloat (delta time) / 1000 / anim.total

                done =
                    anim.done + dt
            in
            if done < 1 then
                Room { memory | moving = Just { anim | done = done } }

            else
                Room { memory | moving = Nothing }

        Nothing ->
            let
                doMove dir =
                    let
                        newP =
                            dir p

                        newLevel =
                            Dict.update newP (Maybe.map (\({ data } as a) -> { a | data = { visited = True } })) level
                    in
                    { memory
                        | moving = Just { from = p, to = newP, done = 0, total = config.t }
                        , p = newP
                        , exits =
                            Dict.get newP newLevel
                                |> Maybe.map .exits
                                |> Maybe.withDefault { n = False, e = False, s = False, w = False }
                        , level = newLevel
                    }
            in
            (if keyboard.up && exits.n then
                doMove Room.north

             else if keyboard.right && exits.e then
                doMove Room.east

             else if keyboard.down && exits.s then
                doMove Room.south

             else if keyboard.left && exits.w then
                doMove Room.west

             else
                memory
            )
                |> (\m ->
                        if Dict.get m.p m.level |> Maybe.map .end |> Maybe.withDefault False then
                            NextLevel 0 { m | moving = Nothing } (start (m.depth + 1))

                        else
                            Room m
                   )


update : Computer -> Memory -> Memory
update computer memory =
    case memory of
        Room a ->
            a
                |> moveSystem computer

        StartGame t a ->
            let
                dt =
                    toFloat (delta computer.time) / 1000 / config.splash

                progress =
                    t + dt
            in
            if progress < 1 then
                StartGame (t + dt) a

            else
                Room a

        Intro ->
            if computer.keyboard.space then
                StartGame 0 (start config.initDepth)

            else
                memory

        NextLevel t a b ->
            let
                dt =
                    toFloat (delta computer.time) / 1000 / config.splash

                progress =
                    t + dt
            in
            if progress < 1 then
                NextLevel (t + dt) a b

            else
                Room b


start depth =
    let
        seed0 : Random.Seed
        seed0 =
            Random.initialSeed (412 + depth)

        options : Options { visited : Bool }
        options =
            { next =
                \from goal depth_ can ->
                    --Random.weighted ( 20, 1 ) [ ( 10, 2 ), ( 5, 3 ), ( 1, 4 ) ]
                    Random.weighted ( 1, 1 ) [ ( 1, 2 ), ( 1, 3 ), ( 1, 4 ) ]
                        |> Random.andThen (\i -> few i [] can |> Random.map (\a -> ( a, { visited = False } )))
            , depth = depth
            }

        level =
            Room.generateWith options seed0
                |> Room.shortcuts 1
                |> Dict.update ( 0, 0 ) (Maybe.map (\({ data } as a) -> { a | data = { data | visited = True } }))
    in
    { level =
        level
    , p = ( 0, 0 )
    , moving = Nothing
    , exits =
        Dict.get ( 0, 0 ) level
            |> Maybe.map .exits
            |> Maybe.withDefault { n = False, e = False, s = False, w = False }
    , depth = depth
    }


nextTileView xy { n, e, s, w } =
    let
        cursor fn a =
            room (rgb 193 217 242)
                ++ [ words (rgb 107 116 178) a ]
                |> group
                |> moveXY (fn xy)
                |> (::)
    in
    []
        |> applyIf n (cursor Room.north "↑")
        |> applyIf e (cursor Room.east "→")
        |> applyIf s (cursor Room.south "↓")
        |> applyIf w (cursor Room.west "←")


playerMove { p, level, moving } =
    let
        ( px, py ) =
            p |> Tuple.mapBoth toFloat toFloat
    in
    Maybe.map
        (\{ to, from, done } ->
            let
                ( nx, ny ) =
                    from
                        |> Tuple.mapBoth toFloat toFloat
            in
            ( (px + (nx - px) * (1 - done)) * config.w
            , (py + (ny - py) * (1 - done)) * config.h
            )
        )
        moving
        |> Maybe.withDefault ( px * config.w, py * config.h )


viewGame { p, level, moving } =
    let
        bg end =
            if end then
                rgb 140 255 155

            else
                rgb 107 116 178

        door info =
            []
                |> applyIf info.n ((::) (rectangle (rgb 135 42 56) 10 10 |> moveY 15))
                |> applyIf info.e ((::) (rectangle (rgb 135 42 56) 10 10 |> moveX 15))
                |> applyIf info.s ((::) (rectangle (rgb 135 42 56) 10 10 |> moveY -15))
                |> applyIf info.w ((::) (rectangle (rgb 135 42 56) 10 10 |> moveX -15))
    in
    level
        |> Room.fold
            (\x y { end, data, exits } ->
                if data.visited then
                    (room (bg end) ++ door exits)
                        --|> applyIf (x == px && y == py) (\a -> a ++ [ player ])
                        |> group
                        |> moveXY ( x, y )
                        |> (::)

                else
                    identity
            )
            []


room color =
    [ rectangle (rgb 18 23 61) config.w config.h
    , rectangle color (config.w - 10) (config.h - 10)
    ]


moveXY ( x, y ) =
    move (toFloat x * config.w) (toFloat y * config.h)


initialMemory =
    Intro


playground :
    { init : ( Model, Cmd Msg )
    , view : Model -> Html.Html a
    , update : Msg -> Game Memory -> ( Model, Cmd Msg )
    }
playground =
    embed view update initialMemory


applyIf : Bool -> (a -> a) -> a -> a
applyIf bool f world =
    if bool then
        f world

    else
        world
