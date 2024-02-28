import * as THREE from 'three';
import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  ` varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  ` varying vec2 vUv;
      uniform sampler2D tex;
      uniform sampler2D tex2;
      uniform sampler2D disp;
      uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }`
);

extend({ ImageFadeMaterial });

console.log(ImageFadeMaterial);

export default function Mesh({ position }) {
  const ref = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
  ]);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    ref.current.dispFactor = THREE.MathUtils.lerp(
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.075
    );
    // const scale = THREE.MathUtils.damp(
    //   refVisible.current.scale.x,
    //   visible.current ? 1 : 0.2,
    //   5,
    //   delta / 2
    // );
    // refVisible.current.scale.set(scale, scale, scale);
    // console.log(scale);
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      position={position}
    >
      <planeGeometry args={[10, 10]} />
      <imageFadeMaterial
        // ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
}
