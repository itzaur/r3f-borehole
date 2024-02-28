import { Text as TextPage } from '@react-three/drei';
// import { useReflow } from '@react-three/flex';

export default function Text({
  bold = false,
  anchorX = 'left',
  anchorY = 'top',
  textAlign = 'left',
  ...props
}) {
  const font = bold ? './font/DelaGothicOne-Regular.ttf' : './font/Arial.ttf';

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
