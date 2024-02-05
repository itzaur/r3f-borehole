import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { useRef, useState } from 'react';
import { Box, Flex } from '@react-three/flex';
import { useScroll, useAspect } from '@react-three/drei';

import Background from './Background.jsx';
import LayerCard from './LayerCard.jsx';
import source from '../resources.js';
import Text from './Text.jsx';
import Cube from './Cube.jsx';
import CardItem from './CardItem.jsx';

export default function Content() {
  const group = useRef();
  const { viewport } = useThree();
  const [boxWidth, boxHeight] = useAspect(1920, 1920, 0.5);
  const texture = useLoader(THREE.TextureLoader, source.depthbox[0].image);

  const [activePlane, setActivePlane] = useState(null);

  const options = useControls({
    debug: { value: false },
  });

  const fontScale = Math.min(1, viewport.width / 16);

  // useFrame(({ pointer, camera }) => {
  //   camera.position.x = THREE.MathUtils.lerp(
  //     camera.position.x,
  //     pointer.x * 0.5,
  //     0.03
  //   );
  //   camera.position.y = THREE.MathUtils.lerp(
  //     camera.position.y,
  //     pointer.y * 0.8,
  //     0.01
  //   );
  //   camera.position.z = THREE.MathUtils.lerp(
  //     camera.position.z,
  //     Math.max(6, Math.abs(pointer.x * pointer.y * 8)),
  //     0.01
  //   );
  //   camera.rotation.y = THREE.MathUtils.lerp(
  //     camera.rotation.y,
  //     pointer.x * -Math.PI * 0.025,
  //     0.001
  //   );
  // });

  const layerCardRef = useRef();

  const scroll = useScroll();

  const camLookAt0 = new THREE.Vector3(-0.2, 0, 2);
  const camLookAt1 = new THREE.Vector3(0.5, 1, -6);

  const camLookAtLerped = new THREE.Vector3(0, 0, 0);

  const lastScroll = useRef(0);

  useFrame((state, delta) => {
    let friction = 1;
    const scrollOffset = Math.max(0, scroll.offset);

    const e = scroll.range(0.9, 0.3);
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
      state.camera.position.z = offset * theta - 2;
    } else {
      state.camera.position.z = 5;
    }

    document.querySelector('.scroll').textContent = scroll.offset;
  });

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      {/* <color attach='background' args={[options.colorBg]} /> */}

      <Background
        size={[2, window.innerHeight]}
        scale={[viewport.width, viewport.height, 1]}
        position-z={-1}
      />

      <group ref={group}>
        <Flex
          debug
          dir='column'
          position={[-viewport.width / 2, viewport.height / 2, 0]}
          size={[viewport.width, viewport.height, 0]}
        >
          <Box
            dir='row'
            width='100%'
            height='100%'
            align='center'
            justify='center'
            flexWrap='wrap'
          >
            <Box centerAnchor>
              <Text
                bold
                position-z={0}
                anchorX='center'
                anchorY='middle'
                fontSize={1.2 * fontScale}
                lineHeight={1}
                letterSpacing={0.05}
                textAlign='center'
                color='white'
                maxWidth={(viewport.width / 4) * 3}
                curveRadius={25}
              >
                {source.content[0].text}
              </Text>
            </Box>
          </Box>

          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            width='100%'
          >
            {/* {source.content.map((props, index) => (
              <Page key={index} {...props} />
            ))} */}
            <group
            // ref={setCardsRoot}
            >
              {source.images.map((item, i) => (
                <CardItem
                  key={item.id}
                  index={i}
                  // width={1}
                  // height={2}
                  item={item}
                  activePlane={activePlane}
                  setActivePlane={setActivePlane}
                />
              ))}
            </group>
          </Box>

          <Box
            ref={layerCardRef}
            dir='row'
            width='100%'
            height='100%'
            align='center'
            justify='center'
            marginTop={0.7}
          >
            <Box>
              <LayerCard
                {...source.depthbox[0]}
                text={source.depthbox[1].text}
                boxWidth={boxWidth}
                boxHeight={boxHeight}
                map={texture}
                textScaleFactor={fontScale}
              />
              <Cube
                position={[
                  boxWidth / 2,
                  -boxHeight / 2,
                  source.depthbox[1].depth,
                ]}
              />
            </Box>
          </Box>
        </Flex>
      </group>
    </>
  );
}
