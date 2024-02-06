import { useEffect, useRef, useState } from 'react';
import Plane from './Plane';
import { useThree } from '@react-three/fiber';

const CardItem = (props) => {
  const {
    depth,
    boxWidth,
    boxHeight,
    text,
    textColor,
    color,
    map,
    textScaleFactor,
    index,
    width,
    height,
    item,
    tag,
    activePlane,
    setActivePlane,
  } = props || {};

  const cardItem = useRef();
  const { viewport } = useThree();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
    } else {
      setIsActive(null);
    }
  }, [activePlane, index]);

  return (
    <>
      {/* <group ref={cardItem}> */}

      <Plane texture={item.image} active={isActive} {...props} />

      {/* </group> */}
    </>
  );
};

export default CardItem;
