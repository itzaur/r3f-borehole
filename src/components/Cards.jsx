import { useThree } from '@react-three/fiber';
import { Box } from '@react-three/flex';

export default function Cards() {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      flexWrap='wrap'
      width='100%'
    >
      {new Array(6).fill(0).map((k, i) => (
        <Box margin={0.2} key={i}>
          <mesh position={[1.5, -3, 0]}>
            <planeGeometry args={[width / 2, height]} />
            <meshStandardMaterial
              color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][i % 4]}
            />
          </mesh>
        </Box>
      ))}
    </Box>
  );
}
