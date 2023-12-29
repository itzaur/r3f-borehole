import '../src/styles/App.scss';

import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';

import Cube from './components/Cube';

export default function Experience() {
  const options = useControls({
    debug: { value: false },
    colorBg: {
      value: '#000000',
    },
  });

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <OrbitControls makeDefault />

      <color attach='background' args={[options.colorBg]} />

      <Cube size={[2, 2, 2, 12, 12, 12]} position={[0, 0, 0]} />
    </>
  );
}
