import { useRef } from 'react';
import { Float, useGLTF, useScroll } from '@react-three/drei';

import { useFrame } from '@react-three/fiber';

export default function Practice(props) {
  const isMobile = window.innerWidth < 768;
  const thicknessKoef = 10;
  const positionY = isMobile ? -1.9 : -2.7;
  const { nodes } = useGLTF('./models/practice.glb');
  const ref = useRef();

  const scroll = useScroll();

  useFrame(() => {
    ref.current.position.y = positionY + scroll.offset * 15;
  }, []);

  return (
    <>
      <Float
        speed={isMobile ? 2 : 0}
        rotationIntensity={0.3}
        floatIntensity={0.2}
        floatingRange={[1, 0.2]}
      >
        <group {...props} ref={ref} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Path_1.geometry}
            material={nodes.Path_1.material}
            material-color='#0095ef'
            position={[0, -0.021, 1.581 / thicknessKoef]}
            scale={[2.362, 2.362, 2.362 / thicknessKoef]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Path_3.geometry}
            material={nodes.Path_3.material}
            position={[0.017, 5.52, 4.154 / thicknessKoef]}
            scale={[2.362, 2.362, 2.362 / thicknessKoef]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Path_4.geometry}
            material={nodes.Path_4.material}
            position={[-5.082, 0.496, 4.188 / thicknessKoef]}
            scale={[2.362, 2.362, 2.362 / thicknessKoef]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Path_5.geometry}
            material={nodes.Path_5.material}
            position={[4.247, 0.485, 4.17 / thicknessKoef]}
            scale={[2.362, 2.362, 2.362 / thicknessKoef]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Path_2.geometry}
            material={nodes.Path_2.material}
            position={[-2.806, -7.315, 4.346 / thicknessKoef]}
            scale={[2.362, 2.362, 2.362 / thicknessKoef]}
          />
        </group>
      </Float>
    </>
  );
}

useGLTF.preload('./models/practice.glb');
