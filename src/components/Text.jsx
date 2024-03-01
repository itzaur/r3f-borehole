import { Text as TextPage } from '@react-three/drei';

export default function Text(props) {
  const {
    bold = false,
    anchorX = 'left',
    anchorY = 'top',
    textAlign = 'left',
    ...otherProps
  } = props || {};
  const font = bold ? './font/DelaGothicOne-Regular.ttf' : './font/Arial.ttf';

  return (
    <TextPage
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={font}
      {...otherProps}
    />
  );
}
