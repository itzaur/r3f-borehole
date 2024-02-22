import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useGLTF, useIntersect } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Pipes(props) {
  const { nodes, materials } = useGLTF('./models/pipes.glb');

  const visible = useRef();
  const pipes = useIntersect((isVisible) => (visible.current = isVisible));

  const [yRandomFactor] = useMemo(() => {
    return [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5];
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;

    pipes.current.rotation.y = elapsedTime * yRandomFactor;

    const scale = THREE.MathUtils.damp(
      pipes.current.scale.y,
      visible.current ? 0.45 : 0,
      5,
      delta / 2
    );
    pipes.current.scale.set(scale, scale, scale);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={pipes}
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        // position={[0.8, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('./models/pipes.glb');
