module Common.Room exposing (Dir, Exits, Options, Room, Rooms, RoomsWith, XY, east, fold, generate, generateWith, neighbors, north, options, shortcuts, south, west)

import Dict exposing (Dict)
import Random exposing (Generator)
import Util.List as List exposing (remove)
import Util.Random as Random exposing (few)



--https://ondra.nepozitek.cz/blog/42/dungeon-generator-part-1-node-based-approach/
--http://www.squidi.net/three/index.php


type alias XY =
    ( Int, Int )


shortcuts : Int -> RoomsWith data -> RoomsWith data
shortcuts distance acc =
    let
        check fn1 fn2 xy v =
            Dict.get (fn1 xy) acc
                |> Maybe.map (\a -> abs (v.depth - a.depth) <= distance || fn2 v.exits)
                |> Maybe.withDefault (fn2 v.exits)
    in
    Dict.map
        (\xy ({ exits } as v) ->
            { v
                | exits =
                    { exits
                        | n = check north .n xy v
                        , e = check east .e xy v
                        , s = check south .s xy v
                        , w = check west .w xy v
                    }
            }
        )
        acc


generate : Int -> Random.Seed -> RoomsWith {}
generate maxDepth =
    generateWith { options | depth = maxDepth }


generateWith : Options data -> Random.Seed -> RoomsWith data
generateWith opt seed =
    let
        ( aaa, _, _ ) =
            generate2 opt 0 ( 0, 0 ) South ( Dict.empty, seed, False )
    in
    aaa


type alias Options data =
    { next : Dir -> Bool -> Int -> List Dir -> Generator ( List Dir, data )
    , depth : Int
    }


options : Options {}
options =
    { next =
        \from goal depth can ->
            Random.weighted ( 20, 1 ) [ ( 10, 2 ), ( 5, 3 ), ( 1, 4 ) ]
                |> Random.andThen (\i -> few i [] can |> Random.map (\a -> ( a, {} )))
    , depth = 12
    }


type Dir
    = North
    | East
    | South
    | West


neighbors :
    XY
    -> RoomsWith data
    ->
        { n : Maybe ( XY, Room data )
        , e : Maybe ( XY, Room data )
        , s : Maybe ( XY, Room data )
        , w : Maybe ( XY, Room data )
        }
neighbors xy rooms =
    { n = Dict.get (north xy) rooms |> Maybe.map (Tuple.pair (north xy))
    , e = Dict.get (east xy) rooms |> Maybe.map (Tuple.pair (east xy))
    , s = Dict.get (south xy) rooms |> Maybe.map (Tuple.pair (south xy))
    , w = Dict.get (west xy) rooms |> Maybe.map (Tuple.pair (west xy))
    }


north : XY -> XY
north ( x, y ) =
    ( x, y + 1 )


east : XY -> XY
east ( x, y ) =
    ( x + 1, y )


south : XY -> XY
south ( x, y ) =
    ( x, y - 1 )


west : XY -> XY
west ( x, y ) =
    ( x - 1, y )


fold : (Int -> Int -> Room data -> acc -> acc) -> acc -> RoomsWith data -> acc
fold fn =
    Dict.foldl (\( x, y ) v -> fn x y v)


type alias RoomsWith data =
    Dict XY (Room data)


type alias Rooms =
    Dict XY (Room {})


type alias Room data =
    { exits : Exits
    , end : Bool
    , depth : Int
    , data : data
    }


emptyRoom : data -> Room data
emptyRoom data =
    { exits =
        { n = False
        , e = False
        , s = False
        , w = False
        }
    , end = False
    , depth = 0
    , data = data
    }


generate2 :
    Options data
    -> Int
    -> XY
    -> Dir
    -> ( RoomsWith data, Random.Seed, Bool )
    -> ( RoomsWith data, Random.Seed, Bool )
generate2 opt depth xy from ( acc, seed, goal ) =
    if depth > opt.depth then
        ( acc, seed, goal )

    else
        let
            mustHaveExit =
                { n = checkRooms (north xy) acc
                , e = checkRooms (east xy) acc
                , s = checkRooms (south xy) acc
                , w = checkRooms (west xy) acc
                }

            moreDoors =
                if depth >= opt.depth then
                    []

                else
                    [ North, East, South, West ]
                        |> applyIf (not mustHaveExit.n) (remove North)
                        |> applyIf (not mustHaveExit.e) (remove East)
                        |> applyIf (not mustHaveExit.s) (remove South)
                        |> applyIf (not mustHaveExit.w) (remove West)

            ( allWaysFirst, allWaysRest ) =
                allWays

            gen =
                Random.map2 Tuple.pair
                    (exitsGen (opt.next from goal depth moreDoors))
                    (Random.uniform allWaysFirst allWaysRest)
        in
        Random.step gen seed
            |> (\( ( { exits, data }, fns ), seed1 ) ->
                    let
                        end =
                            depth >= opt.depth && not goal

                        safeInsert k v =
                            Dict.update k
                                (\a ->
                                    let
                                        newEnd =
                                            a
                                                |> Maybe.map
                                                    (\aa ->
                                                        let
                                                            _ =
                                                                Debug.log "rewriting" ( xy, aa.depth, depth )
                                                        in
                                                        aa.end
                                                    )
                                                |> Maybe.withDefault v.end
                                    in
                                    Just { v | end = newEnd }
                                )
                    in
                    List.foldl (\fn -> fn opt exits xy depth)
                        ( safeInsert xy { data = data, exits = exits, end = end, depth = depth } acc
                        , seed1
                        , depth >= opt.depth || goal
                        )
                        fns
               )



--wayShuffle =
--    Random.uniform [ a, b, c, d ] []


allWays =
    let
        a opt exits xy depth =
            applyIf exits.n (validate opt (removeN xy) depth (north xy) South)

        b opt exits xy depth =
            applyIf exits.e (validate opt (removeE xy) depth (east xy) West)

        c opt exits xy depth =
            applyIf exits.s (validate opt (removeS xy) depth (south xy) North)

        d opt exits xy depth =
            applyIf exits.w (validate opt (removeW xy) depth (west xy) East)
    in
    case List.permutations [ a, b, c, d ] of
        x :: xs ->
            ( x, xs )

        [] ->
            ( [ a, b, c, d ], [] )


validate opt removeDoor depth newXY from ( acc, seed, goal ) =
    if checkRooms newXY acc then
        generate2 opt (depth + 1) newXY from ( acc, seed, goal )

    else
        ( removeDoor acc, seed, goal )


removeN xy acc =
    Dict.update xy (Maybe.map (\({ exits } as item) -> { item | exits = { exits | n = False } })) acc


removeE xy acc =
    Dict.update xy (Maybe.map (\({ exits } as item) -> { item | exits = { exits | e = False } })) acc


removeS xy acc =
    Dict.update xy (Maybe.map (\({ exits } as item) -> { item | exits = { exits | s = False } })) acc


removeW xy acc =
    Dict.update xy (Maybe.map (\({ exits } as item) -> { item | exits = { exits | w = False } })) acc


exitsGen =
    Random.map
        (\( l, data ) ->
            { exits =
                { n = List.member North l
                , e = List.member East l
                , s = List.member South l
                , w = List.member West l
                }
            , data = data
            }
        )


checkRooms : XY -> RoomsWith data -> Bool
checkRooms xy plan =
    case Dict.get xy plan of
        Just { exits } ->
            False

        Nothing ->
            True


unsafeGet : comparable -> Dict.Dict comparable v -> v
unsafeGet a b =
    case Dict.get a b of
        Just v ->
            v

        Nothing ->
            unsafeGet a b


type alias Exits =
    { n : Bool
    , e : Bool
    , s : Bool
    , w : Bool
    }


applyIf : Bool -> (a -> a) -> a -> a
applyIf b f world =
    if b then
        f world

    else
        world
