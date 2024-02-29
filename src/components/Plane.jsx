import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Box, Flex } from '@react-three/flex';
import gsap from 'gsap';

import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';

const Plane = (props) => {
  const { texture, left = false } = props || {};
  const mesh = useRef();
  const plane = useRef();
  const { viewport } = useThree();
  const prevMouse = new THREE.Vector2();

  const tex = useTexture(texture);

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uTexture: { value: tex },
        uDirection: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uMouseSpeed: { value: 0 },
        uOpacity: { value: 1 },
      },
      fragmentShader,
      vertexShader,
    }),
    [tex]
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    shaderProps.uniforms.uTime.value = time;

    const mouseSpeed = Math.sqrt(
      (prevMouse.x - mesh.current.material.uniforms.uMouse.value.x) ** 2,
      (prevMouse.y - mesh.current.material.uniforms.uMouse.value.y) ** 2
    );

    mesh.current.material.uniforms.uMouseSpeed.value = mouseSpeed;
  });

  const boxProps = {
    centerAnchor: true,
    width: 'auto',
    height: 'auto',
    grow: 1,
    marginTop: 1,
    marginLeft: window.innerWidth < 768 ? 0 : 1.4 * !left,
    marginRight: window.innerWidth < 768 ? 0 : 1.4 * left,
    paddingTop: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 6,
    maxHeight: 5,
    minWidth: 4,
    minHeight: 5,
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

  function onPointerMove(e) {
    mesh.current.material.uniforms.uMouse.value.x = e.uv.x;
    mesh.current.material.uniforms.uMouse.value.y = e.uv.y;
  }

  return (
    <>
      <Flex
        dir='column'
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        align={left ? 'flex-end' : 'flex-start'}
      >
        <Box {...boxProps} dir='row' width='100%' height='100%' flexWrap='wrap'>
          {(width, height) => (
            <>
              <mesh
                ref={mesh}
                {...props}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
              >
                <planeGeometry args={[width, height, 32, 32]} ref={plane} />
                <shaderMaterial args={[shaderProps]} />
              </mesh>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Plane;
