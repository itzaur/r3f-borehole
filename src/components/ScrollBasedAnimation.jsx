import { useThree } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';

import Background from './Background';
import Objects from './Objects';
import Html from './Html';

export default function ScrollBasedAnimation() {
  const { viewport } = useThree();

  return (
    <ScrollControls
      pages={window.innerWidth < 768 ? 6.8 : 7}
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
        <Objects />
      </Scroll>
      <Scroll html>
        <Html />
      </Scroll>
    </ScrollControls>
  );
}
