import '../src/styles/App.scss';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Preload } from '@react-three/drei';
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

        <Suspense fallback={null}>
          <ScrollBasedAnimation />
          <Preload all />
        </Suspense>
      </Canvas>

      <Leva hidden />
      <Loader
        containerStyles={{ backgroundColor: color }}
        innerStyles={{ backgroundColor: '#FBFBFD' }}
        dataStyles={{
          color: '#5b8bd2',
          fontWeight: 'normal',
          fontSize: '2rem',
        }}
        barStyles={{ backgroundColor: '#5b8bd2' }}
        dataInterpolation={(p) => `${p.toFixed(2)}`}
      />
    </>
  );
}
