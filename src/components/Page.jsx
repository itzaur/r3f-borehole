import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Box } from '@react-three/flex';

export default function Page(props) {
  const { id, tag, text, images } = props || {};

  // Load textures
  const textures = useLoader(THREE.TextureLoader, images);

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

  return (
    <>
      {textures.map((texture, index) => (
        <Box key={index} {...boxProps}>
          {(width, height) => (
            <mesh>
              <planeGeometry args={[width, height]} />
              <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
          )}
        </Box>
      ))}
    </>
  );
}
