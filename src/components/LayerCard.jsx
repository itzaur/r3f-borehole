import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import { Box, Flex } from '@react-three/flex';
import gsap from 'gsap';

import source from '../resources.js';
import DepthPlane from './DepthPlane.jsx';
import Text from './Text.jsx';
import fragmentShader from '../shaders/cards/fragmentShader.glsl';
import vertexShader from '../shaders/cards/vertexShader.glsl';

const LayerCard = (props) => {
  const { texture, textScaleFactor, title, subtitle, textColor, depth } =
    props || {};
  const mesh = useRef();
  const plane = useRef();
  const ref = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();
  const isMobile = window.innerWidth < 768;
  const MARGIN = isMobile ? 0.05 : 0.09;

  const tex = useTexture(texture);
  const depthboxTextures = useLoader(
    THREE.TextureLoader,
    source.content[1].images
  );
  const depthboxUnderTextures = useLoader(
    THREE.TextureLoader,
    source.content[1].underImages
  );

  const prevMouse = new THREE.Vector2();

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

    // ref.current.opacity = 1 - scroll.range(0.92, 0.2);
    ref.current.uniforms.uOpacity.value = 1 - scroll.range(0.94, 0.05);
  });

  const boxProps = {
    centerAnchor: true,
    width: 'auto',
    height: 'auto',
    // grow: 1,
    // marginTop: 1,
    // marginLeft: 0,
    // marginRight: 0,
    // paddingTop: 0,
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
        align='center'
      >
        <Box
          {...boxProps}
          dir={isMobile ? 'column' : 'row'}
          //   dir='row'
          width='100%'
          height='100%'
          flexWrap='wrap'
        >
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
                {/* <meshStandardMaterial
                  ref={ref}
                  map={tex}
                  transparent
                  toneMapped={false}
                  color={color}
                /> */}
                <shaderMaterial ref={ref} args={[shaderProps]} transparent />
              </mesh>

              <Text
                bold
                position={[
                  -width / 2 + 1.16,
                  -height * (window.innerWidth < 768 ? 8.33 : 8.75),
                  depth + 1.5,
                ]}
                maxWidth={width / 2}
                anchorX='left'
                anchorY='bottom'
                fontSize={
                  (window.innerWidth < 768 ? 0.8 : 0.6) * textScaleFactor
                }
                lineHeight={1}
                letterSpacing={0.01}
                color={textColor}
              >
                {title}
              </Text>
              <Text
                position={[
                  -width / 2 + 1.16,
                  -height * (window.innerWidth < 768 ? 8.33 : 8.75),
                  depth + 1.5,
                ]}
                maxWidth={width / 2}
                anchorX='left'
                anchorY={isMobile ? 0.2 : 0.3}
                fontSize={
                  (window.innerWidth < 768 ? 0.6 : 0.4) * textScaleFactor
                }
                lineHeight={1}
                letterSpacing={0.01}
                color={textColor}
                textAlign='left'
              >
                {subtitle}
              </Text>

              {depthboxTextures.map((item, i) => (
                <Box key={i} margin={MARGIN} centerAnchor dir='column'>
                  <DepthPlane
                    position={[
                      -width / 2,
                      -height * (isMobile ? 8.68 : 9),
                      source.depthbox[1].depth,
                    ]}
                    planeWidth={width / (isMobile ? 2.5 : 3.35)}
                    planeHeight={height / (isMobile ? 4.2 : 2)}
                    texture={item}
                    texture2={depthboxUnderTextures[i]}
                  />
                </Box>
              ))}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default LayerCard;
