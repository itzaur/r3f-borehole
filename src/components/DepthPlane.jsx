import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';

import depthVertexShader from '../../src/shaders/depthCards/depthVertexShader.glsl';
import depthFragmentShader from '../../src/shaders/depthCards/depthFragmentShader.glsl';

export default function DepthPlane(props) {
  const { texture, texture2, planeWidth, planeHeight } = props || {};
  const ref = useRef();
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  const dispTexture = useTexture('./images/disp.png');

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uTexture1: { value: texture },
        uTexture2: { value: texture2 },
        uDispTexture: { value: dispTexture },
        uDispFactor: { value: 0 },
        uOpacity: { value: 0 },
        uEffectFactor: { value: 1.2 },
        uScale: { value: new THREE.Vector2(1, 1) },
      },
      fragmentShader: depthFragmentShader,
      vertexShader: depthVertexShader,
    }),
    [dispTexture, texture, texture2]
  );

  const scroll = useScroll();
  const imageAspect = texture.source.data.width / texture.source.data.height;
  const viewportAspect = planeWidth / planeHeight;

  const shaderScale = shaderProps.uniforms.uScale.value;

  useFrame(() => {
    mesh.current.material.uniforms.uOpacity.value = scroll.range(0.95, 0.05);

    if (imageAspect > viewportAspect) {
      shaderScale.set(imageAspect / viewportAspect, 1);
    } else {
      shaderScale.set(1, viewportAspect / imageAspect);
    }

    ref.current.uniforms.uDispFactor.value = THREE.MathUtils.lerp(
      ref.current.uniforms.uDispFactor.value,
      hovered ? 1 : 0,
      0.075
    );
  });

  return (
    <>
      <mesh
        ref={mesh}
        dispose={null}
        {...props}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[planeWidth, planeHeight, 20, 20]} />
        <shaderMaterial
          attach='material'
          ref={ref}
          {...shaderProps}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
}
