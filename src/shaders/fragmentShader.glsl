uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uMousemoved;
uniform float uTime;
uniform sampler2D uMapColor;
uniform sampler2D uMapNormal;
uniform sampler2D uMapRoughness;
uniform float uRadius;
uniform float uLightIntensity;

  #define ENABLE_LIGHTING
  #define ENABLE_SPECULAR

  #define DEPTH 16.0

vec3 pxSize;

vec3 texsample(in vec2 uv, in vec2 sampleOffset, in sampler2D sampler_u) {
  uv += sampleOffset;
  uv = (gl_FragCoord.xy - 0.5 * 2.0 * uResolution.xy) / min(uResolution.y, uResolution.x);

  return texture2D(sampler_u, uv).zyx;
}

float luminance(vec3 c) {
  return dot(c, vec3(.2126, .7152, .0722));
}

vec3 normal(in vec2 uv, in sampler2D sampler_u, vec3 offset) {
  float R = abs(luminance(texsample(uv, offset.xz, sampler_u)));
  float L = abs(luminance(texsample(uv, -offset.xz, sampler_u)));
  float D = abs(luminance(texsample(uv, offset.zy, sampler_u)));
  float U = abs(luminance(texsample(uv, -offset.zy, sampler_u)));

  float X = (L - R) * .5;
  float Y = (U - D) * .5;

  return normalize(vec3(X, Y, 1. / DEPTH));
}

void renderLava(out vec4 fragColor, in vec2 uv, in vec2 movement, in vec2 fragCoord) {
  vec2 mouse = uMouse;
  if (uMousemoved == false) {
    mouse.x = sin(uTime * 2.) * .5;
    mouse.y = cos(uTime) * .5;
  }

  pxSize = vec3(1. / uResolution, 0.);

  vec3 n = normal(uv + movement, uMapNormal, pxSize);

  #ifdef ENABLE_LIGHTING
  vec3 lp = vec3((mouse.xy) + movement, .2);
  vec3 sp = vec3(uv + movement, 0.);

  vec3 c = texsample(uv + movement, vec2(0.), uMapColor) * dot(n, normalize(lp - sp)) * clamp(1. - length((mouse.xy - uv)) * uRadius, 0., 1.) * uLightIntensity;
  c *= c;

  #ifdef ENABLE_SPECULAR
  float e = DEPTH * (1. - texsample(uv + movement, vec2(0.), uMapRoughness).x);
  vec3 ep = vec3(.5, .5, 10.) + vec3(movement, 0.);

  c += (pow(clamp(dot(normalize(reflect(lp - sp, n)), normalize(sp - ep)), 0., 1.), e) * (texsample(uv + movement, vec2(0.0), uMapRoughness).x)) * 0.1;
  #endif /* ENABLE_SPECULAR */

  #else
  vec3 c = n;

  #endif /* ENABLE_LIGHTING */

  fragColor = vec4(c.bgr, 1);
}

void main() {
  vec2 uv = ((gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.y, uResolution.x));

  renderLava(gl_FragColor, uv, vec2(0.), gl_FragCoord.xy);
}