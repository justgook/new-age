module JumpGun.Game exposing (main)

import Browser
import Html exposing (div, img, text)
import Html.Attributes exposing (src)
import Json.Decode as D


type alias Model =
    List String


main : Program D.Value Model msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init flags =
    case D.decodeValue decode flags of
        Ok info ->
            ( info, Cmd.none )

        _ ->
            ( [], Cmd.none )


view model =
    List.map (\a -> img [ src a ] []) model
        |> div []


update msg model =
    ( model, Cmd.none )


subscriptions model =
    Sub.none


decode =
    D.field "lut" (D.list D.string)
