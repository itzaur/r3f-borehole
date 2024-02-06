uniform float uProgress;
uniform float uDirection;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec3 pos = position;
    float dist = length(uv - vec2(0.5));
    float maxDistance = length(vec2(0.5));
    float normalizedDistance = dist / maxDistance;

    float stickTo = -normalizedDistance;
    float stickOut = normalizedDistance;

    float stickEffect = mix(stickTo, stickOut, uDirection);

    float newProgress = min(2.0 * uProgress, 2.0 * (1.0 - uProgress));
    float zOffset = 0.3;

    float zProgress = mix(clamp(2.0 * uProgress, 0.0, 1.0), clamp(1.0 - 2.0 * (1.0 - uProgress), 0.0, 1.0), uDirection);

    pos.z += (stickEffect * newProgress + zProgress) * zOffset;
    pos.z += uProgress * sin(dist * 10.0 + uTime * 0.8) * 0.1;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
}