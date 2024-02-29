import '../src/styles/App.scss';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// import {  ScrollControls } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import source from './resources.js';
import ScrollBasedAnimation from './components/ScrollBasedAnimation.jsx';

export default function Experience() {
  const { color } = useControls({
    color: {
      value: source.bg,
    },
  });

  return (
    <>
      <Canvas flat shadows gl={{ alpha: false, antialias: true }}>
        <color attach='background' args={[color]} />

        {/* <directionalLight intensity={1.5} ref={directionalLight} />
        <ambientLight /> */}

        <Suspense fallback={null}>
          <ScrollBasedAnimation />
        </Suspense>
      </Canvas>

      <Leva
        // collapsed
        hidden
      />
    </>
  );
}
