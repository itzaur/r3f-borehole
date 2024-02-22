import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  CameraControls,
  Environment,
  MeshReflectorMaterial,
  RenderTexture,
  useAspect,
  useHelper,
  useScroll,
} from '@react-three/drei';
import { Flex, Box } from '@react-three/flex';
import source from '../resources';
import Text from './Text';
// import Item from './Item';
import NewPlane from './NewPlane';
import LayerCard from './LayerCard.jsx';
import Cube from './Cube.jsx';
import RoundedCube from './RoundedCube.jsx';
import { useControls } from 'leva';
import Pipes from './Pipes.jsx';
import Video from './Video.jsx';

// import { Box } from '@react-three/drei';

export default function Objects() {
  // const controls = useRef();

  // const intro = async () => {
  //   controls.current.dolly(-22);
  //   controls.current.smoothTime = 1.6;
  //   controls.current.dolly(22, true);
  // };

  // useEffect(() => {
  //   intro();
  // }, []);

  const isMobile = window.innerWidth < 768;

  const { width, height } = useThree((state) => state.viewport);

  const [boxWidth, boxHeight] = useAspect(1920, 1920, 0.5);

  const fontScale = Math.min(1, width / 16);

  const layerCardRef = useRef();

  const { viewport } = useThree();

  const texture = useLoader(THREE.TextureLoader, source.depthbox[0].texture);

  const scroll = useScroll();

  const camLookAt0 = new THREE.Vector3(-0.2, 0, 2);
  const camLookAt1 = new THREE.Vector3(0.5, 1, -6);

  const camLookAtLerped = new THREE.Vector3(0, 0, 0);

  const lastScroll = useRef(0);

  useFrame((state, delta) => {
    let friction = 1;
    const scrollOffset = Math.max(0, scroll.offset);

    // const e = scroll.range(0.897, 0.3);
    const e = scroll.range(0.91, 0.1);
    let offset = 1 - scroll.offset;

    const camLookAtAlpha = scroll.range(1 / 2, 1 / 3);
    camLookAtLerped.lerpVectors(camLookAt0, camLookAt1, camLookAtAlpha);
    // state.camera.lookAt(camLookAtLerped);

    let theta = 65.5;

    const distance = layerCardRef.current.position.distanceTo(
      state.camera.position
    );

    if (distance < 19) {
      friction = Math.max(distance / 19, 0.1);
    }

    // Calculate lerped scroll offset
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );

    //Protect below 0 and above 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);
    lastScroll.current = lerpedScrollOffset;

    if (e) {
      state.camera.position.z = offset * theta - 0.9;
    } else {
      state.camera.position.z = 5;
    }

    // document.querySelector('.scroll').textContent = scroll.offset;
  });

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'red');

  const options = useMemo(() => {
    return {
      x: { value: -0.3, min: -10, max: Math.PI * 4, step: 0.01 },
      y: { value: -20, min: -30, max: Math.PI * 4, step: 0.01 },
      z: { value: 8.86, min: -10, max: Math.PI * 4, step: 0.01 },
      intensity: { value: 1.13, min: 0, max: 20, step: 0.01 },
    };
  }, []);

  const dice = useControls('Dice', options);

  return (
    <>
      {/* <directionalLight
        ref={directionalLight}
        intensity={dice.intensity}
        castShadow
        position={[dice.x, dice.y, dice.z]}
        color={0xffffff}
      /> */}
      {/* <ambientLight intensity={0.2} /> */}
      {/* <CameraControls ref={controls} /> */}

      <Text
        bold
        position-y={0.3}
        position-z={0}
        anchorX='center'
        anchorY='middle'
        fontSize={isMobile ? 0.4 : 0.95 * fontScale}
        lineHeight={1.3}
        letterSpacing={0.01}
        textAlign='center'
        maxWidth={(width / 4) * 3}
        curveRadius={25}
      >
        БУРЕНИЕ{isMobile ? '\n' : ' '}СКВАЖИН{isMobile ? '\n' : ' '}НА ВОДУ
        <meshBasicMaterial color='white'>
          <RenderTexture attach={'map'}>
            <color attach='background' args={['#fff']} />
            <Environment preset='sunset' />
            <Video url='./video/720p.mp4' />
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <Text
        position-y={isMobile ? -0.8 : -1.3}
        anchorX='center'
        anchorY='middle'
        font='./font/Arial.ttf'
        fontSize={isMobile ? 0.2 : 0.35 * fontScale}
        lineHeight={1.2}
        letterSpacing={0.01}
        textAlign='center'
        color='white'
        maxWidth={(width / 4) * 3}
        curveRadius={40}
      >
        по Могилеву и Могилевской области
      </Text>

      <NewPlane
        position={[0, -height, 0]}
        texture={source.images[0].image}
        left={source.images[0].id % 2}
      />

      <RoundedCube position={[width * 0.2, -height * 1.4, 0.5]} />
      <RoundedCube
        position={[width * 0.35, -height * 1.55 - 0.3, -0.4]}
        scale={0.8}
      />
      <RoundedCube
        position={[width * (isMobile ? -0.1 : 0.1), -height * 1.55 + 1, -0.5]}
        scale={0.6}
      />

      <NewPlane
        position={[0, -height * (isMobile ? 2.2 : 2.37), 0]}
        texture={source.images[1].image}
        left={source.images[1].id % 2}
      />

      {/* <Item
        color='orangered'
        position={[
          width * (isMobile ? -0.16 : -0.25),
          -height * (isMobile ? 2.75 : 2.9),
          0.18,
        ]}
        wireframe={true}
      >
        <boxGeometry args={[1, 1, 1, 16, 16, 16]} />
      </Item> */}
      <Pipes
        position={[
          width * (isMobile ? 0.1 : -0.2),
          -height * (isMobile ? 2.95 : 3.05),
          1,
        ]}
      />

      <NewPlane
        position={[0, -height * (isMobile ? 3.5 : 3.7), 0]}
        texture={source.images[2].image}
        left={source.images[2].id % 2}
      />

      <NewPlane
        position={[0, -height * (isMobile ? 4.4 : 4.6), 0]}
        texture={source.images[3].image}
        left={source.images[3].id % 2}
      />

      <Flex
        dir='column'
        // justify={left ? 'flex-end' : 'flex-start'}
        position={[
          -viewport.width,
          -viewport.height * (isMobile ? 4.4 : 4.5),
          0,
        ]}
        size={[viewport.width, viewport.height, 0]}
        align='flex-end'
        // justify='flex-start'
        flexGrow={1}
      >
        <Box
          ref={layerCardRef}
          centerAnchor
          // dir='row'
          width='auto'
          height='auto'
          // align='center'
          // justify='flex-start'
          marginTop={isMobile ? 0 : 1.5}
          // scale={isMobile ? 1.2 : 1.0}
          // flexGrow={1}
          // flexBasis='100%'
          // flexShrink={1}
        >
          <Box>
            <LayerCard
              {...source.depthbox[0]}
              text={source.depthbox[1].text}
              boxWidth={isMobile ? viewport.width : boxWidth}
              boxHeight={isMobile ? viewport.height : boxHeight}
              map={texture}
              textScaleFactor={fontScale}
            />
            <Cube
              position={[
                isMobile ? viewport.width / 2 : boxWidth / 2,
                isMobile ? -viewport.height / 2 - 2.3 : -boxHeight / 2 - 1.8,
                source.depthbox[1].depth,
              ]}
            />
          </Box>
        </Box>
      </Flex>

      {/* <mesh position={[0, -1.5, -15]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100, 100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#222'
          metalness={0.5}
          // wireframe
        />
      </mesh> */}

      <Environment preset='sunset' />
    </>
  );
}
