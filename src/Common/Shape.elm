module Common.Shape exposing (circleFx, tilemap2)

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import Playground exposing (Shape)
import Playground.Advanced exposing (Render, custom, useTexture)
import WebGL exposing (Mesh, Shader)
import WebGL.Settings as WebGL exposing (Setting)
import WebGL.Settings.Blend as Blend
import WebGL.Texture


circleFx d color =
    custom d d <|
        \uP uT opacity ->
            WebGL.entityWith
                defaultEntitySettings
                vertFullscreen
                fragFxCircle
                mesh
                { color = setAlpha color opacity
                , uP = uP
                , uT = uT
                }


vertFullscreen =
    [glsl|
precision mediump float;
attribute vec2 aP;
uniform vec4 uT;
uniform vec2 uP;
varying vec2 uv;
vec2 edgeFix = vec2(0.0000001, -0.0000001);
mat2 inverse(mat2 m) {
  return mat2(m[1][1],-m[0][1],
             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);
}
void main () {
    mat2 aaa = inverse(mat2(uT));
    uv = vec2(aP * aaa + uP);
    gl_Position = vec4(aP, 0., 1.0);
}
        |]


tilemap2 : Float -> Float -> String -> String -> Shape
tilemap2 tileW tileH tileset lut =
    useTexture tileset
        (\tileset_ ->
            useTexture lut
                (\lut_ ->
                    let
                        ( w1, h1 ) =
                            WebGL.Texture.size tileset_
                                |> Tuple.mapBoth toFloat toFloat

                        ( w2, h2 ) =
                            WebGL.Texture.size lut_
                                |> Tuple.mapBoth toFloat toFloat
                    in
                    custom
                        (w2 * tileW)
                        (h2 * tileH)
                        (\translate scaleRotateSkew opacity ->
                            WebGL.entityWith
                                defaultEntitySettings
                                vertImage
                                fragTilemap
                                mesh
                                { uP = translate
                                , uT = scaleRotateSkew
                                , uA = opacity
                                , uTileSize = vec2 tileW tileH
                                , uAtlas = tileset_
                                , uAtlasSize = vec2 w1 h1
                                , uLut = lut_
                                , uLutSize = vec2 w2 h2
                                }
                        )
                )
        )


{-| -}
vertRect : Shader { a | aP : Vec2 } { b | uP : Vec2, uT : Vec4 } { uv : Vec2 }
vertRect =
    [glsl|
            precision mediump float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            varying vec2 uv;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                uv = aP + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, 0., 1.0);
            }
        |]


{-| -}
fragFxCircle : Shader a { b | color : Vec4 } { uv : Vec2 }
fragFxCircle =
    [glsl|
        precision mediump float;
        uniform vec4 color;
        varying vec2 uv;
        void main () {
            gl_FragColor = color;
            gl_FragColor.a *= step(1.0, length(uv));
        }
    |]


{-| -}
mesh : Mesh { aP : Vec2 }
mesh =
    WebGL.triangleStrip
        [ { aP = vec2 -1 -1 }
        , { aP = vec2 -1 1 }
        , { aP = vec2 1 -1 }
        , { aP = vec2 1 1 }
        ]


fragTilemap =
    [glsl|
precision mediump float;
varying vec2 uv;
uniform sampler2D uAtlas;
uniform sampler2D uLut;
uniform vec2 uAtlasSize;
uniform vec2 uLutSize;
uniform vec2 uTileSize;
uniform float uA;
float color2float(vec4 color) {
    return
    color.a * 255.0
    + color.b * 256.0 * 255.0
    + color.g * 256.0 * 256.0 * 255.0
    + color.r * 256.0 * 256.0 * 256.0 * 255.0;
    }
float modI(float a, float b) {
   float m = a - floor((a + 0.5) / b) * b;
   return floor(m + 0.5);
}
void main () {
   vec2 point = uv * uLutSize;
   vec2 look = floor(point);
   //(2i + 1)/(2N) Pixel center
   vec2 coordinate = (look + 0.5) / uLutSize;
   float uIndex = color2float(texture2D(uLut, coordinate));
   vec2 grid = uAtlasSize / uTileSize;
   // tile indexes in uAtlas starts from zero, but in lut zero is used for
   // "none" placeholder
   vec2 tile = vec2(modI((uIndex - 1.), grid.x), int(uIndex - 1.) / int(grid.x));
   // inverting reading botom to top
   tile.y = grid.y - tile.y - 1.;
   vec2 fragmentOffsetPx = floor((point - look) * uTileSize);
   //(2i + 1)/(2N) Pixel center
   vec2 pixel = (floor(tile * uTileSize + fragmentOffsetPx) + 0.5) / uAtlasSize;
   gl_FragColor = texture2D(uAtlas, pixel);
   gl_FragColor.a *= float(uIndex > 0.);
   gl_FragColor.rgb *= gl_FragColor.a;

}
    |]


{-| -}
vertImage : Shader { a | aP : Vec2 } { b | uP : Vec2, uT : Vec4 } { uv : Vec2 }
vertImage =
    [glsl|
            precision mediump float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            varying vec2 uv;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                uv = aP * .5 + 0.5 + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, 0., 1.0);
            }
        |]


{-| -}
defaultEntitySettings : List Setting
defaultEntitySettings =
    [ Blend.add Blend.srcAlpha Blend.oneMinusSrcAlpha
    , WebGL.colorMask True True True False
    ]


setAlpha c =
    c |> Math.Vector3.toRecord |> (\c1 -> Math.Vector4.vec4 c1.x c1.y c1.z)
