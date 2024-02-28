import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import { useState } from 'react';

import depthVertexShader from '../../src/shaders/depthCards/depthVertexShader.glsl';
import depthFragmentShader from '../../src/shaders/depthCards/depthFragmentShader.glsl';
// import { useControls } from 'leva';

export default function DepthPlane(props) {
  const { texture, texture2, planeWidth, planeHeight } = props || {};
  const mesh = useRef();
  // const { viewport, size, camera } = useThree();
  const [hovered, setHover] = useState(false);

  // console.log(viewport);
  // const material = useRef();

  // useFrame((state) => {
  //   const time = state.clock.elapsedTime;

  //   mesh.current.rotation.y = time * 0.2;
  //   mesh.current.rotation.x = time * 0.2;
  // });

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
  const ref = useRef();

  const dispTexture = useTexture('./images/disp.png');

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uTexture1: { value: texture },
        uTexture2: { value: texture2 },
        uDispTexture: { value: dispTexture },
        uDispFactor: { value: 0 },
        uOpacity: { value: 0 },
        uEffectFactor: { value: 1.2 },
        uScale: { value: new THREE.Vector2(1, 1) },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      fragmentShader: depthFragmentShader,
      vertexShader: depthVertexShader,
    }),
    [dispTexture, texture, texture2]
  );

  // const group = useRef();
  // const shadow = useRef();
  const scroll = useScroll();
  const imageAspect = texture.source.data.width / texture.source.data.height;
  const viewportAspect = planeWidth / planeHeight;

  const shaderScale = shaderProps.uniforms.uScale.value;

  useFrame(({ clock }) => {
    // const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2;
    // mesh.current.position.y = t / 3;
    // shadow.current.scale.y = shadow.current.scale.z = 1 + t;
    // shadow.current.scale.x = (1 + t) * 1.25;
    // mesh.current.rotation.x = mesh.current.rotation.z += 0.005;
    // mesh.current.position.x = THREE.MathUtils.lerp(
    //   mesh.current.position.x,
    //   source.mouse[0] / 2,
    //   0.05
    // );
    // mesh.current.position.z = THREE.MathUtils.lerp(
    //   mesh.current.position.z,
    //   source.mouse[1] / 4,
    //   0.03
    // );
    // mesh.current.material.opacity = scroll.range(0.95, 0.02);
    mesh.current.material.uniforms.uOpacity.value = scroll.range(0.95, 0.05);

    if (imageAspect > viewportAspect) {
      shaderScale.set(imageAspect / viewportAspect, 1);
    } else {
      shaderScale.set(1, viewportAspect / imageAspect);
    }

    ref.current.uniforms.uDispFactor.value = THREE.MathUtils.lerp(
      ref.current.uniforms.uDispFactor.value,
      hovered ? 1 : 0,
      0.075
    );
  });

  return (
    <>
      <mesh
        ref={mesh}
        dispose={null}
        {...props}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[planeWidth, planeHeight, 20, 20]} />
        <shaderMaterial
          attach='material'
          ref={ref}
          {...shaderProps}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
}
