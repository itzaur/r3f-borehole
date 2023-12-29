import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import vertexShader from '../../src/shaders/vertexShader.glsl';
import fragmentShader from '../../src/shaders/fragmentShader.glsl';
import { useControls } from 'leva';

export default function Cube(props) {
  const { size } = props || {};
  const mesh = useRef();
  const material = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    mesh.current.rotation.y = time * 0.2;
    mesh.current.rotation.x = time * 0.2;
  });

  const { color, wireframe, position } = useControls('mesh', {
    color: {
      value: '#00ffff',
      onChange: (value) => {
        material.current.uniforms.uColor.value.set(value);
      },
    },
    wireframe: {
      value: false,
      onChange: (value) => {
        material.current.wireframe = value;
      },
    },
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
    },
  });

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      },
      fragmentShader,
      vertexShader,
      wireframe: wireframe,
    }),
    [color, wireframe]
  );

  return (
    <mesh {...props} ref={mesh} position={[position.x, position.y, position.z]}>
      <boxGeometry args={size} />
      <shaderMaterial ref={material} attach='material' {...shaderProps} />
    </mesh>
  );
}
