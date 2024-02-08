import { Text as TextPage } from '@react-three/drei';
// import { useReflow } from '@react-three/flex';

export default function Text({
  bold = false,
  anchorX = 'left',
  anchorY = 'top',
  textAlign = 'left',
  ...props
}) {
  const font = './font/DelaGothicOne-Regular.ttf';
  // const reflow = useReflow();

  return (
    <TextPage
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={font}
      // onSync={reflow}
      {...props}
    />
  );
}
