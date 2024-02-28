varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDispTexture;
uniform float uDispFactor;
uniform float uEffectFactor;
uniform vec2 uScale;
uniform float uOpacity;

void main() {
    vec2 uv = (vUv - vec2(0.5)) / uScale + vec2(0.5);

    vec4 disp = vec4(vec3(1.0), uOpacity) * texture2D(uDispTexture, uv);
    vec2 distortedPosition = vec2(uv.x + uDispFactor * (disp.r * uEffectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - uDispFactor) * (disp.r * uEffectFactor), uv.y);

    vec4 _texture = vec4(vec3(1.0), uOpacity) * texture2D(uTexture1, distortedPosition);
    vec4 _texture2 = vec4(vec3(1.0), uOpacity) * texture2D(uTexture2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, uDispFactor);

    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}