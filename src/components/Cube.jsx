import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Shadow, useScroll } from '@react-three/drei';
// import vertexShader from '../../src/shaders/vertexShader.glsl';
// import fragmentShader from '../../src/shaders/fragmentShader.glsl';
// import { useControls } from 'leva';
import source from '../resources.js';

export default function Cube(props) {
  const { size } = props || {};
  const mesh = useRef();
  // const material = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    mesh.current.rotation.y = time * 0.2;
    mesh.current.rotation.x = time * 0.2;
  });

  // const { color, wireframe, position } = useControls('mesh', {
  //   color: {
  //     value: '#00ffff',
  //     // onChange: (value) => {
  //     //   material.current.uniforms.uColor.value.set(value);
  //     // },
  //   },
  //   wireframe: {
  //     value: false,
  //     // onChange: (value) => {
  //     //   material.current.wireframe = value;
  //     // },
  //   },
  //   // position: {
  //   //   value: { x: 0, y: 0, z: 0 },
  //   //   step: 0.1,
  //   // },
  // });

  // const shaderProps = useMemo(
  //   () => ({
  //     uniforms: {
  //       uTime: { value: 0 },
  //       uColor: { value: new THREE.Color(color) },
  //     },
  //     fragmentShader,
  //     vertexShader,
  //     wireframe: wireframe,
  //   }),
  //   [color, wireframe]
  // );

  const group = useRef();
  const shadow = useRef();
  const scroll = useScroll();

  useFrame(({ clock }) => {
    const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2;
    mesh.current.position.y = t / 3;
    shadow.current.scale.y = shadow.current.scale.z = 1 + t;
    shadow.current.scale.x = (1 + t) * 1.25;
    mesh.current.rotation.x = mesh.current.rotation.z += 0.005;
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      source.mouse[0] / 2,
      0.05
    );
    mesh.current.position.z = THREE.MathUtils.lerp(
      mesh.current.position.z,
      source.mouse[1] / 4,
      0.03
    );

    mesh.current.material.opacity = 1 - scroll.range(0.5, 0.12);
    // console.log(mesh.current.material.opacity);
  });

  return (
    <group {...props} dispose={null}>
      <group ref={group}>
        <mesh ref={mesh}>
          <boxGeometry args={size} />
          <meshStandardMaterial />
        </mesh>
        {/* <mesh>
          <sphereGeometry />
          <meshStandardMaterial />
        </mesh> */}

        <Shadow
          ref={shadow}
          opacity={0.3}
          rotation-x={-Math.PI / 2}
          position={[0, -1.51, 0]}
        />
      </group>
    </group>
  );
}
