import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useIntersect } from '@react-three/drei';

export default function RoundedCube(props) {
  const { nodes, materials } = useGLTF('./models/cube.glb');

  const visible = useRef();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));

  const [xRandomFactor, yRandomFactor] = useMemo(() => {
    return [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5];
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    ref.current.rotation.x = elapsedTime * xRandomFactor;
    ref.current.rotation.y = elapsedTime * yRandomFactor;

    const scale = THREE.MathUtils.damp(
      ref.current.scale.x,
      visible.current ? 4 : 0.2,
      5,
      delta / 2
    );
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
      />
    </group>
  );
}

useGLTF.preload('./models/cube.glb');
