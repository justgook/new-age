module PewPew.Game exposing (main)

import Browser
import Common.Room as Room exposing (Rooms, RoomsWith)
import Html exposing (div)
import Html.Attributes exposing (style)
import Playground exposing (..)
import Playground.Advanced exposing (embed, subscriptions)
import Random


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
    = Init
    | Intro
    | Room Rooms


view : Computer -> Memory -> List Shape
view computer memory =
    case memory of
        Intro ->
            [ [ words darkGrey "Pew Pew" |> move -1 -1
              , words blue "Pew Pew"
              ]
                |> group
                |> scale 5
            ]

        Room r ->
            Room.fold (\item x y -> (::) (viewRoom item x y))
                []
                r

        Init ->
            [ rectangle blue 100 100 ]


update _ memory =
    case memory of
        Init ->
            let
                seed0 : Random.Seed
                seed0 =
                    Random.initialSeed 412
            in
            Room.generate 4 seed0
                |> Room.shortcuts 1
                |> Room

        _ ->
            memory


viewRoom x_ y_ item =
    let
        w =
            40

        h =
            40

        x =
            toFloat x_

        y =
            toFloat y_

        door info =
            []
                |> applyIf info.n ((::) (rectangle (rgb 135 42 56) 10 10 |> moveY 15))
                |> applyIf info.e ((::) (rectangle (rgb 135 42 56) 10 10 |> moveX 15))
                |> applyIf info.s ((::) (rectangle (rgb 135 42 56) 10 10 |> moveY -15))
                |> applyIf info.w ((::) (rectangle (rgb 135 42 56) 10 10 |> moveX -15))

        bg =
            if item.end then
                rgb 140 255 155

            else
                rgb 107 116 178
    in
    ([ rectangle (rgb 18 23 61) w h
     , rectangle bg (w - 10) (h - 10)
     , words white <| String.fromInt item.depth
     ]
        ++ door item.exits
    )
        |> group
        |> move (x * w) (y * h)


initialMemory =
    Init


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
