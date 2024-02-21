import * as THREE from 'three';
import { useIntersect } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
// import source from '../resources';

export default function Item(props) {
  const { color, position, wireframe, children } = props || {};
  const visible = useRef();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  // const [
  //   mapColor,
  //   mapNormal,
  //   mapDisplacement,
  //   mapAmbientOcclusion,
  //   mapSpecular,
  // ] = useTexture(source.depthbox[0].images);
  // [
  //   mapColor,
  //   mapNormal,
  //   mapDisplacement,
  //   mapAmbientOcclusion,
  //   mapSpecular,
  // ].forEach((tex) => {
  //   tex.colorSpace = THREE.SRGBColorSpace;

  //   tex.wrapS = THREE.RepeatWrapping;
  //   tex.wrapT = THREE.RepeatWrapping;
  //   tex.minFilter = THREE.NearestFilter;
  // });

  const [xRandomFactor, yRandomFactor] = useMemo(() => {
    return [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5];
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    ref.current.rotation.x = elapsedTime * xRandomFactor;
    ref.current.rotation.y = elapsedTime * yRandomFactor;

    const scale = THREE.MathUtils.damp(
      ref.current.scale.x,
      visible.current ? 1.5 : 0.2,
      5,
      delta / 2
    );
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        {children}
        <meshPhysicalMaterial transparent color={color} wireframe={wireframe} />
      </mesh>
    </>
  );
}
