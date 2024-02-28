import { Scroll, ScrollControls } from '@react-three/drei';
import Background from './Background';
import Objects from './Objects';
import Html from './Html';
import { useThree } from '@react-three/fiber';

export default function ScrollBasedAnimation() {
  const { viewport } = useThree();
  return (
    <ScrollControls
      pages={window.innerWidth < 768 ? 6.45 : 7}
      distance={0.5}
      damping={0.5}
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <Scroll>
        <Background
          size={[window.innerWidth, window.innerHeight]}
          scale={[viewport.width, viewport.height, 1]}
          position-z={-7}
        />

        {/* <NewPlane
          item={source.images[0]}
          boxWidth={viewport.width}
          boxHeight={viewport.height}
          textScaleFactor={1}
          {...source.images[0]}
          text={source.images[0].text}
          tag={source.images[0].tag}
          position-z={-0.9}
        /> */}

        <Objects />
      </Scroll>
      <Scroll html>
        <Html />
      </Scroll>
    </ScrollControls>
  );
}
