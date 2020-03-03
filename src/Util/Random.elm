module Util.Random exposing (few)

import Random exposing (Generator)
import Util.List exposing (remove)


few : Int -> List a -> List a -> Generator (List a)
few n out rest =
    if n <= 0 then
        Random.constant out

    else
        case rest of
            x :: xs ->
                Random.uniform x xs
                    |> Random.andThen (\a -> few (n - 1) (a :: out) (remove a rest))

            [] ->
                Random.constant out
