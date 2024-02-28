import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import Text from './Text';

export default function LayerCard(props) {
  const {
    depth,
    boxWidth,
    boxHeight,
    title,
    subtitle,
    textColor,
    color,
    map,
    textScaleFactor,
  } = props || {};
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    ref.current.opacity = 1 - scroll.range(0.92, 0.2);
  });

  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        <planeGeometry args={[boxWidth, boxHeight, 32, 32]} />
        <meshStandardMaterial
          ref={ref}
          color={color}
          map={map}
          toneMapped={false}
          transparent
          // opacity={1}
          // wireframe
        />
      </mesh>
      <Text
        bold
        position={[boxWidth / 4, -boxHeight / 3, depth + 1.5]}
        maxWidth={boxWidth / 2}
        anchorX='left'
        anchorY='middle'
        fontSize={(window.innerWidth < 768 ? 0.8 : 0.5) * textScaleFactor}
        lineHeight={1}
        letterSpacing={0.01}
        color={textColor}
      >
        {title}
      </Text>
      <Text
        position={[
          boxWidth / 4,
          -boxHeight / 2 + (window.innerWidth < 768 ? 0.1 : 0),
          depth + 1.5,
        ]}
        maxWidth={boxWidth / 2}
        anchorX='left'
        anchorY='middle'
        fontSize={(window.innerWidth < 768 ? 0.6 : 0.4) * textScaleFactor}
        lineHeight={1}
        letterSpacing={0.01}
        color={textColor}
        textAlign='left'
      >
        {subtitle}
      </Text>
    </>
  );
}
