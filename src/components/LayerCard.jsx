import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import Text from './Text';

export default function LayerCard(props) {
  const {
    depth,
    boxWidth,
    boxHeight,
    text,
    textColor,
    color,
    map,
    textScaleFactor,
  } = props || {};
  const scroll = useScroll();
  const ref = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    ref.current.opacity = 1 - scroll.range(0.9, 0.12);
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
          opacity={1}
          // wireframe
        />
      </mesh>
      <Text
        bold
        position={[boxWidth / 2, -boxHeight / 2 + 0.4, depth + 1.5]}
        maxWidth={(viewport.width / 2.5) * 1}
        anchorX='center'
        anchorY='middle'
        fontSize={(window.innerWidth < 768 ? 0.6 : 0.4) * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}
      >
        {text}
      </Text>
    </>
  );
}
