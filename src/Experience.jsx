import '../src/styles/App.scss';

import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';

import Background from './components/Background';

export default function Experience() {
  const { viewport } = useThree();

  const options = useControls({
    debug: { value: false },
    colorBg: {
      value: '#ffffff',
    },
  });

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <color attach='background' args={[options.colorBg]} />

      <Background size={[2, 2]} scale={[viewport.width, viewport.height, 1]} />
    </>
  );
}
