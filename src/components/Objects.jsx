import * as THREE from 'three';
import {
  useFrame,
  // useLoader,
  useThree,
} from '@react-three/fiber';
import { useRef } from 'react';
import {
  Environment,
  RenderTexture,
  // useAspect,
  useScroll,
} from '@react-three/drei';

import source from '../resources';
import Text from './Text';
import Plane from './Plane.jsx';
import RoundedCube from './RoundedCube.jsx';
import Pipes from './Pipes.jsx';
import Video from './Video.jsx';
import Guarantee from './Guarantee.jsx';
import LayerCard from './LayerCard.jsx';

export default function Objects() {
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = window.innerWidth < 768;
  // const MARGIN = 0.1;

  // const [boxWidth, boxHeight] = useAspect(1920, 1920, 0.5);

  const fontScale = Math.min(1, width / 16);

  // const texture = useLoader(THREE.TextureLoader, source.depthbox[0].texture);

  // const depthboxTextures = useLoader(
  //   THREE.TextureLoader,
  //   source.content[1].images
  // );
  // const depthboxUnderTextures = useLoader(
  //   THREE.TextureLoader,
  //   source.content[1].underImages
  // );
  // const depthboxPlaneWidth = isMobile ? boxWidth / 2 : boxWidth / 3;
  // const depthboxPlaneHeight = isMobile ? boxHeight / 3 - 0.2 : boxHeight / 2.5;

  const scroll = useScroll();

  const camLookAt0 = new THREE.Vector3(-0.2, 0, 2);
  const camLookAt1 = new THREE.Vector3(0.5, 1, -6);

  const camLookAtLerped = new THREE.Vector3(0, 0, 0);

  const lastScroll = useRef(0);

  // const layerCardRef = useRef();

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

    // const distance = layerCardRef.current.position.distanceTo(
    //   state.camera.position
    // );

    // if (distance < 19) {
    //   friction = Math.max(distance / 19, 0.1);
    // }

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

  // const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'red');

  // const options = useMemo(() => {
  //   return {
  //     x: { value: -0.3, min: -10, max: Math.PI * 4, step: 0.01 },
  //     y: { value: -20, min: -30, max: Math.PI * 4, step: 0.01 },
  //     z: { value: 8.86, min: -10, max: Math.PI * 4, step: 0.01 },
  //     intensity: { value: 1.13, min: 0, max: 20, step: 0.01 },
  //   };
  // }, []);

  // const dice = useControls('Dice', options);

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

      {/* <color args={['#000000']} attach='background' /> */}

      <Text
        bold
        position-y={isMobile ? 0.5 : -0.8}
        position-z={0}
        anchorX='center'
        anchorY='bottom'
        fontSize={isMobile ? 0.4 : 0.92 * fontScale}
        lineHeight={1.3}
        letterSpacing={0.01}
        textAlign='center'
        maxWidth={isMobile ? width * 2 : (width / 4) * 3}
        curveRadius={25}
      >
        БУРЕНИЕ{isMobile ? '\n' : '  '}СКВАЖИН{isMobile ? '\n' : '  '}НА
        &nbsp;ВОДУ
        <meshBasicMaterial color='white' toneMapped={false}>
          <RenderTexture attach={'map'}>
            <color attach='background' args={['#fff']} />
            <Environment preset='sunset' />
            <Video url='./video/720p.mp4' />
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <Text
        position-y={isMobile ? -0.7 : -2}
        anchorX='center'
        anchorY={-1}
        font='./font/Arial.ttf'
        fontSize={isMobile ? 0.2 : 0.35 * fontScale}
        lineHeight={1.2}
        letterSpacing={0.01}
        textAlign='center'
        color='white'
        maxWidth={(width / 4) * 3}
        curveRadius={30}
      >
        по Могилеву и Могилевской области
      </Text>

      <Plane
        position={[0, -height + (isMobile ? 1.2 : 0), 0]}
        texture={source.images[0].image}
        left={source.images[0].id % 2}
      />

      <Guarantee
        scale={0.06}
        position={[isMobile ? -0.7 : width / 5, isMobile ? -0.8 : -6.5, 0]}
      />

      <RoundedCube
        position={[width * 0.2, -height * (isMobile ? 1.3 : 1.4), 0.5]}
      />
      <RoundedCube
        position={[width * 0.35, -height * 1.535, -0.4]}
        scale={0.8}
      />
      <RoundedCube
        position={[width * (isMobile ? -0.1 : 0.1), -height * 1.55 + 1, -0.5]}
        scale={0.6}
      />

      <Plane
        position={[0, -height * (isMobile ? 2.2 : 2.37), 0]}
        texture={source.images[1].image}
        left={source.images[1].id % 2}
      />

      <Pipes
        position={[
          width * (isMobile ? 0.1 : -0.2),
          -height * (isMobile ? 2.95 : 3.05),
          1,
        ]}
      />

      <Plane
        position={[0, -height * (isMobile ? 3.5 : 3.7), 0]}
        texture={source.images[2].image}
        left={source.images[2].id % 2}
      />

      <Plane
        position={[0, -height * (isMobile ? 4.4 : 4.6), 0]}
        texture={source.images[3].image}
        left={source.images[3].id % 2}
      />

      <LayerCard
        position={[0, -height * (isMobile ? 5.55 : 5.73), 0]}
        texture={source.images[3].image}
        textScaleFactor={fontScale}
        scale={1.2}
        {...source.depthbox[0]}
        title={source.depthbox[1].title}
        subtitle={source.depthbox[1].subtitle}
      />

      {/* <Flex
        dir='row'
        // justify={left ? 'flex-end' : 'flex-start'}
        position={[
          isMobile ? -width / 2 : -boxWidth / 2,
          -height * (isMobile ? 4.65 : 4.85),
          0,
        ]}
        size={[width, height, 0]}
        // align='flex-end'
        // justify='center'
        // flexGrow={1}
        // justify='center'
        // align='center'
        // centerAnchor
        // width='100%'
        // height='100%'
      >
        <Box
          ref={layerCardRef}
          // centerAnchor
          dir='row'
          // width='auto'
          // height='auto'
          width='100%'
          height='100%'
          // marginTop={isMobile ? 0 : 0}
          // scale={isMobile ? 1.2 : 1.0}
          // flexGrow={1}
          // flexBasis='100%'
          // flexShrink={1}
          justify='flex-start'
          align='center'
        >
          <Box
            // width='100%'
            // height='100%'
            // width='auto'
            // height='auto'
            // centerAnchor
            // justify='center'
            // align='center'
            wrap='wrap'
            dir={isMobile ? 'column' : 'row'}
            // marginTop={isMobile ? 0.0 : 0}
          >
            <LayerCard
              {...source.depthbox[0]}
              title={source.depthbox[1].title}
              subtitle={source.depthbox[1].subtitle}
              boxWidth={isMobile ? width : boxWidth}
              boxHeight={boxHeight}
              map={texture}
              textScaleFactor={fontScale}
            />

            {depthboxTextures.map((item, i) => (
              <Box
                key={i}
                margin={MARGIN}
                centerAnchor
                // paddingLeft={isMobile ? 0 : 0}
              >
                <DepthPlane
                  position={[
                    isMobile
                      ? width / 2 - depthboxPlaneWidth / 2 - MARGIN
                      : -(width - boxWidth) / 2 -
                        MARGIN +
                        (width - (depthboxPlaneWidth * 3 + 4 * MARGIN)) / 2,
                    -boxHeight / 2 -
                      (isMobile
                        ? 0.45
                        : source.depthbox[1].koef / width / height),
                    source.depthbox[1].depth,
                  ]}
                  planeWidth={depthboxPlaneWidth}
                  planeHeight={depthboxPlaneHeight}
                  texture={item}
                  texture2={depthboxUnderTextures[i]}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Flex> */}

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
