import { useAspect, useVideoTexture } from '@react-three/drei';

export default function Video(props) {
  const { url } = props || {};

  const texture = useVideoTexture(url);

  const size = useAspect(1800, 1000);

  return (
    <mesh scale={size}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
