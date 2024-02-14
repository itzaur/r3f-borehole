import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';
import source from '../resources.js';
import vertexShader from '../../src/shaders/vertexShader.glsl';
import fragmentShader from '../../src/shaders/fragmentShader.glsl';

export default function Background(props) {
  const { size, scale } = props || {};
  const mesh = useRef();
  const material = useRef();

  const isMobile = window.innerWidth < 768;

  const texturesUrls = source.textures
    .filter((texture) => texture.url)
    .map((el) => el.url);

  const [mapColor, mapNormal, mapRoughness] = useTexture(texturesUrls);
  [mapColor, mapNormal, mapRoughness].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.minFilter = THREE.LinearFilter;
  });

  const { color, wireframe, lightIntensity } = useControls('mesh', {
    color: {
      value: '#4a5c5c',
      onChange: (value) => {
        material.current.uniforms.uColor.value.set(value);
      },
    },
    wireframe: {
      value: false,
      onChange: (value) => {
        material.current.wireframe = value;
      },
    },
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
    },
    lightIntensity: {
      value: 10,
      min: 1,
      max: 20,
      step: 0.01,
    },
  });

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uMapColor: { value: mapColor },
        uMapNormal: { value: mapNormal },
        uMapRoughness: { value: mapRoughness },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: { value: new THREE.Vector2() },
        uMousemoved: { value: false },
        uProgress: { value: 0 },
        uRadius: { value: isMobile ? 1.6 : 2.5 },
        uLightIntensity: { value: lightIntensity },
        uScale: { value: new THREE.Vector2(1, 1) },

        uCol1: { value: 0.1641 },
        uCol2: { value: 0.3731 },
        uCol3: { value: 0.2502 },
      },
      fragmentShader,
      vertexShader,
      wireframe: wireframe,
    }),
    []
  );

  function onPointerMove(e) {
    const ratio = window.innerHeight / window.innerWidth;
    // const ratio2 = window.innerWidth / window.innerHeight;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);

    shaderProps.uniforms.uMouse.value.x = x;
    shaderProps.uniforms.uMouse.value.y = y * ratio;

    shaderProps.uniforms.uMousemoved.value = isMobile ? false : true;
  }

  function onPointerLeave() {
    shaderProps.uniforms.uMousemoved.value = false;
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    material.current.uniforms.uTime.value = time * 0.2;
    material.current.uniforms.uLightIntensity.value = lightIntensity;

    material.current.uniforms.uResolution.value.x = state.gl.domElement.width;
    material.current.uniforms.uResolution.value.y = state.gl.domElement.height;
    // material.current.uniforms.uResolution.value.x = window.innerWidth;
    // material.current.uniforms.uResolution.value.y = window.innerHeight;

    // if (imageAspect > state.camera.aspect) {
    //   material.current.uniforms.uScale.value.set(
    //     imageAspect / state.camera.aspect,
    //     1
    //   );
    // } else {
    //   material.current.uniforms.uScale.value.set(
    //     1,
    //     state.camera.aspect / imageAspect
    //   );
    // }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <planeGeometry args={size} scale={scale} />
      <shaderMaterial ref={material} attach='material' {...shaderProps} />
    </mesh>
  );
}
