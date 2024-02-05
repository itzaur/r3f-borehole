import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box } from '@react-three/flex';
import gsap from 'gsap';

import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';

const Plane = ({ texture, width, height, active, ...props }) => {
  const mesh = useRef();
  const box = useRef();
  const plane = useRef();
  const { size } = useThree();

  const tex = useTexture(texture);

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uTexture: { value: tex },
        uDirection: { value: 0 },
        uTime: { value: 0 },
        uScale: { value: { x: 1, y: 1 } },
        uResolution: { value: { x: size.width, y: size.height } },
        uImageResolution: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
        uViewSize: { value: { x: 1, y: 1 } },
        uPosition: { value: new THREE.Vector2() },
      },
      fragmentShader,
      vertexShader,
    }),
    [size.height, size.width, tex]
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    shaderProps.uniforms.uTime.value = time;
  });

  const boxProps = {
    centerAnchor: true,
    width: 'auto',
    height: 'auto',
    grow: 1,
    margin: 0.5,
    padding: 0.5,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 6,
    maxHeight: 7,
    minWidth: 3,
    minHeight: 4,
  };

  const timeline = useRef();

  function onPointerDown() {
    timeline.current = gsap.timeline();

    timeline.current.to(mesh.current.material.uniforms.uProgress, {
      value: 1,
      duration: 0.5,
    });
  }

  function onPointerUp() {
    timeline.current = gsap.timeline();

    timeline.current.to(mesh.current.material.uniforms.uProgress, {
      value: 0,
      duration: 0.5,
    });
  }

  return (
    <Box ref={box} {...boxProps}>
      {(width, height) => (
        <mesh
          ref={mesh}
          {...props}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <planeGeometry args={[width, height, 32, 32]} ref={plane} />
          <shaderMaterial args={[shaderProps]} />
        </mesh>
      )}
    </Box>
  );
};

export default Plane;
