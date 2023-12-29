uniform vec3 uColor;

void main() {
    gl_FragColor = vec4(0.5412, 0.2902, 0.9451, 1.0);
    gl_FragColor = vec4(uColor, 1.0);
}