import { useFrame, useThree } from '@react-three/fiber';
import { Environment, RenderTexture, useScroll } from '@react-three/drei';

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
  const fontScale = Math.min(1, width / 16);

  const scroll = useScroll();

  useFrame((state) => {
    const e = scroll.range(0.91, 0.1);
    let offset = 1 - scroll.offset;

    let theta = 65.5;

    if (e) {
      state.camera.position.z = offset * theta - 0.9;
    } else {
      state.camera.position.z = 5;
    }
  });

  return (
    <>
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

      <Environment preset='sunset' />
    </>
  );
}
