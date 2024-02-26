import * as THREE from 'three';
import { Float, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useMemo, useRef } from 'react';

export default function Guarantee(props) {
  const { nodes } = useGLTF('./models/guarantee.glb');

  const ref = useRef();

  const options = useMemo(() => {
    return {
      x: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
      color: {
        value: '#0095ef',
      },
      color2: {
        value: '#ffffff',
      },
    };
  }, []);

  const text = useControls('Guarantee', options);

  return (
    <>
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.2}
        floatingRange={[1, 0.2]}
        position-z={1}
      >
        <group {...props} ref={ref}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NODE_51.geometry}
            material={nodes.NODE_51.material}
            material-color={text.color2}
            scale={0.124}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NODE_52.geometry}
            material={nodes.NODE_52.material}
            material-color={text.color}
            scale={0.124}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NODE_50.geometry}
            material={nodes.NODE_50.material}
            material-color={text.color}
            scale={0.124}
          />
        </group>
      </Float>
    </>
  );
}

useGLTF.preload('./models/guarantee.glb');
