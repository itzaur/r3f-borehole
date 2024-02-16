import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box, Flex } from '@react-three/flex';
import gsap from 'gsap';

import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';

const NewPlane = (props) => {
  const { texture, left = false } = props || {};
  const mesh = useRef();
  const plane = useRef();
  const { size, viewport } = useThree();
  const prevMouse = new THREE.Vector2();

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
        uMouse: { value: new THREE.Vector2() },
        uMouseSpeed: { value: 0 },
      },
      fragmentShader,
      vertexShader,
    }),
    [size.height, size.width, tex]
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
        // justify={left ? 'flex-end' : 'flex-start'}
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        align={left ? 'flex-end' : 'flex-start'}
      >
        <Box
          {...boxProps}
          dir='row'
          width='100%'
          height='100%'
          //   align={left ? 'flex-start' : 'flex-end'}
          //   justify={left ? 'flex-end' : 'flex-start'}
          flexWrap='wrap'
          //   marginLeft={left ? 1.5 : 1}
          //   marginRight={left ? 1 : 1.5}
          //   align='flex-end'
          //   justify='flex-end'
        >
          {(width, height) => (
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
          )}
        </Box>
      </Flex>
    </>
  );
};

export default NewPlane;
