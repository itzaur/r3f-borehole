import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import gsap from 'gsap';

import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';
import { Box, Flex } from '@react-three/flex';

const NewPlane = ({
  texture,
  left = false,
  //   width,
  //   height,
  //   active,
  //   text,
  //   boxWidth,
  //   boxHeight,
  //   depth,
  //   textColor,
  //   textScaleFactor,
  //   id,
  //   tag,
  ...props
}) => {
  const mesh = useRef();
  //   const box = useRef();
  const plane = useRef();
  const { size, viewport } = useThree();

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
