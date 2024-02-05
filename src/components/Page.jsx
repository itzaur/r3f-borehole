import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Box } from '@react-three/flex';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import vertexShader from '../../src/shaders/cards/vertexShader.glsl';
import fragmentShader from '../../src/shaders/cards/fragmentShader.glsl';
import { useTexture } from '@react-three/drei';

export default function Page({ id, tag, text, images, ...props }) {
  // const { id, tag, text, images } = props || {};

  // console.log(images);

  // Load textures
  const textures = useLoader(THREE.TextureLoader, images);

  const tex = useTexture(images);

  const boxProps = {
    centerAnchor: true,
    width: 'auto',
    height: 'auto',
    grow: 1,
    margin: 0.5,
    padding: 0.5,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 6,
    maxHeight: 7,
    minWidth: 3,
    minHeight: 4,
  };

  const shaderProps = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: tex },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: 200, y: 300 },
        },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `,
      fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;
          gl_FragColor = vec4( tex, 1.0 );
        }
      `,
    }),
    [tex]
  );

  const material = useRef();
  const component = useRef();

  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: false });

    tl.current.to(material.current.uniforms.uProgress, {
      value: 1,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <>
      {tex.map((texture, index) => (
        <Box
          key={index}
          {...boxProps}
          // toggle={cardClicked}
          ref={component}
        >
          {(width, height) => (
            <mesh ref={component} {...props}>
              <planeGeometry args={[width, height, 20, 20]} />
              {/* <meshBasicMaterial map={texture} toneMapped={false} /> */}
              <shaderMaterial
                ref={material}
                // uniforms={{
                //   uProgress: { value: 0 },
                //   uZoomScale: { value: { x: 1, y: 1 } },
                //   uTex: { value: texture },
                //   uRes: { value: { x: 1, y: 1 } },
                //   uImageRes: {
                //     value: { x: 200, y: 300 },
                //   },
                // }}
                // {...shaderProps}
                // wireframe
                // map={texture}
                // toneMapped={false}
                args={[shaderProps]}
              />
            </mesh>
          )}
        </Box>
      ))}
    </>
  );
}
