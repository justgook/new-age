port module PewPew.Build exposing (main)

import Image
import Json.Decode as D
import Json.Encode as E
import Tiled
import Tiled.Layer as Layer
import Tiled.Level as Level exposing (Level, LevelData)


port done : E.Value -> Cmd msg


main : Program D.Value () msg
main =
    Platform.worker
        { init = init
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


init : D.Value -> ( (), Cmd msg )
init flags =
    case D.decodeValue decode flags of
        Ok info ->
            ( ()
            , info
                |> E.object
                |> done
            )

        Err err ->
            ( (), done <| E.string (D.errorToString err) )


decode : D.Decoder (List ( String, E.Value ))
decode =
    D.field "level" Tiled.decode
        |> D.map
            (getLevelData
                >> .layers
                >> List.foldl
                    (withTileLayer
                        (\{ data, width } ->
                            (::) (Image.fromList width data |> Image.toPngUrl)
                        )
                    )
                    []
                >> E.list E.string
                >> Tuple.pair "lut"
                >> List.singleton
            )


withTileLayer fn layer =
    case layer of
        Layer.Tile tileData ->
            fn tileData

        _ ->
            identity


getLevelData : Level -> LevelData
getLevelData level =
    case level of
        Level.Orthogonal info ->
            { backgroundcolor = info.backgroundcolor
            , height = info.height
            , infinite = info.infinite
            , layers = info.layers
            , nextobjectid = info.nextobjectid
            , renderorder = info.renderorder
            , tiledversion = info.tiledversion
            , tileheight = info.tileheight
            , tilesets = info.tilesets
            , tilewidth = info.tilewidth
            , version = info.version
            , width = info.width
            , properties = info.properties
            }

        Level.Isometric info ->
            { backgroundcolor = info.backgroundcolor
            , height = info.height
            , infinite = info.infinite
            , layers = info.layers
            , nextobjectid = info.nextobjectid
            , renderorder = info.renderorder
            , tiledversion = info.tiledversion
            , tileheight = info.tileheight
            , tilesets = info.tilesets
            , tilewidth = info.tilewidth
            , version = info.version
            , width = info.width
            , properties = info.properties
            }

        Level.Staggered info ->
            { backgroundcolor = info.backgroundcolor
            , height = info.height
            , infinite = info.infinite
            , layers = info.layers
            , nextobjectid = info.nextobjectid
            , renderorder = info.renderorder
            , tiledversion = info.tiledversion
            , tileheight = info.tileheight
            , tilesets = info.tilesets
            , tilewidth = info.tilewidth
            , version = info.version
            , width = info.width
            , properties = info.properties
            }

        Level.Hexagonal info ->
            { backgroundcolor = info.backgroundcolor
            , height = info.height
            , infinite = info.infinite
            , layers = info.layers
            , nextobjectid = info.nextobjectid
            , renderorder = info.renderorder
            , tiledversion = info.tiledversion
            , tileheight = info.tileheight
            , tilesets = info.tilesets
            , tilewidth = info.tilewidth
            , version = info.version
            , width = info.width
            , properties = info.properties
            }
