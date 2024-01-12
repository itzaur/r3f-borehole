import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import vertexShader from '../../src/shaders/vertexShader.glsl';
import fragmentShader from '../../src/shaders/fragmentShader.glsl';
import { useControls } from 'leva';
import resources from '../resources.js';
import { useTexture } from '@react-three/drei';

export default function Background(props) {
  const { size, scale } = props || {};
  const mesh = useRef();
  const material = useRef();

  const texturesUrls = resources
    .filter((texture) => texture.url)
    .map((el) => el.url);

  const [mapColor, mapNormal, mapRoughness] = useTexture(texturesUrls);
  mapColor.colorSpace = THREE.SRGBColorSpace;
  mapColor.wrapS = THREE.RepeatWrapping;
  mapColor.wrapT = THREE.RepeatWrapping;
  mapColor.minFilter = THREE.LinearFilter;

  const { color, wireframe } = useControls('mesh', {
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
        uRadius: { value: 2 },
        uLightIntensity: { value: 3 },
      },
      fragmentShader,
      vertexShader,
      wireframe: wireframe,
    }),
    [color, mapColor, mapNormal, mapRoughness, wireframe]
  );

  function onPointerMove(e) {
    const ratio = window.innerHeight / window.innerWidth;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);

    shaderProps.uniforms.uMouse.value.x = x * ratio;
    shaderProps.uniforms.uMouse.value.y = y;

    shaderProps.uniforms.uMousemoved.value = true;
  }

  function onPointerLeave() {
    shaderProps.uniforms.uMousemoved.value = false;
  }

  useEffect(() => {
    material.current.uniforms.uResolution.value.x = window.innerWidth;
    material.current.uniforms.uResolution.value.y = window.innerHeight;
    material.current.extensions.derivatives = true;
  });

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    material.current.uniforms.uTime.value = time * 0.2;
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
