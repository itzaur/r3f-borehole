import { useEffect, useRef, useState } from 'react';
import Plane from './Plane';
import { Box } from '@react-three/flex';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';

const CardItem = ({
  index,
  width,
  height,
  item,
  activePlane,
  setActivePlane,
}) => {
  const cardItem = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
    } else {
      setIsActive(null);
    }
  }, [activePlane, index]);

  return (
    <group ref={cardItem}>
      <Plane texture={item.image} active={isActive} />
    </group>
  );
};

export default CardItem;
