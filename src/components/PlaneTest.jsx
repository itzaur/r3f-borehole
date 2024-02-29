import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box } from '@react-three/flex';
import gsap from 'gsap';

import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';

import Text from './Text';

const Plane = ({
  texture,
  width,
  height,
  active,
  text,
  boxWidth,
  boxHeight,
  depth,
  textColor,
  textScaleFactor,
  id,
  tag,
  ...props
}) => {
  const mesh = useRef();
  const box = useRef();
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
    margin: 1,
    paddingTop: 0.8,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 7,
    maxHeight: 8,
    minWidth: 5.5,
    minHeight: 7,
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
    <Box
      ref={box}
      {...boxProps}
      justify='center'
      align='center'
      alignSelf='center'
      centerAnchor
      position-z={-2}
    >
      {(width, height) => (
        <>
          <mesh
            ref={mesh}
            {...props}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <planeGeometry args={[width, height, 32, 32]} ref={plane} />
            <shaderMaterial args={[shaderProps]} />
          </mesh>

          <Box
            // alignContent='center'
            alignItems='center'
            // alignSelf='center'
            justify='center'
            width='auto'
            height='auto'
            centerAnchor
            position-z={-2}

            // alignItems='flex-start'
          >
            <Text
              bold
              position={[-width / 1.15, height - 0.2, depth - 0.5]}
              maxWidth={(boxWidth / 3) * 1.7}
              // maxHeight={boxHeight / 2}
              // width={boxWidth}
              anchorX='left'
              anchorY='top'
              fontSize={0.3}
              lineHeight={1.2}
              letterSpacing={-0.05}
              color={textColor}
            >
              {text}
              <meshBasicMaterial color='#ffffff' toneMapped={false} />
            </Text>
          </Box>

          <Box justify='flex-start' align='space-between'>
            <Text
              bold
              position={[-width / 2, height + 0.8, depth]}
              fontSize={0.6 * textScaleFactor}
              lineHeight={1}
              letterSpacing={-0.05}
              maxWidth={(viewport.width / 4) * 1.9}
              anchorX='bottom'
              anchorY='middle'
              // textAlign='left'
            >
              {tag}
              <meshNormalMaterial
                color='#cccccc'
                opacity={0.4}
                toneMapped={false}
              />
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Plane;
