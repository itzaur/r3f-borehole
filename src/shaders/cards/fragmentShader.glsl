uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uMouseSpeed;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    float mouseDistance = length(vUv - uMouse);
    float normalizedSpeed = clamp(uMouseSpeed * 40.0, 0.0, 1.0);
    float circle = smoothstep(0.2 * normalizedSpeed, 0.01, mouseDistance);

    // vec4 color = texture2D(uTexture, vUv);
    float r = texture2D(uTexture, vUv + 0.1 * 0.5 * circle * normalizedSpeed).r;
    float g = texture2D(uTexture, vUv + 0.1 * 0.3 * circle * normalizedSpeed).g;
    float b = texture2D(uTexture, vUv + 0.1 * 0.1 * circle * normalizedSpeed).b;

    gl_FragColor = vec4(r * 0.45, g * 0.45, b * 0.45, uOpacity);

}