import React, { useRef, useState } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { AnimatedMenuProps } from '../types';
import DropdownContainer from './DropdownContainer';
import NavbarItem from './Navbar/NavbarItem';

export default function AnimatedMenu({
  duration = 300,
  navbarConfig,
  className,
}: AnimatedMenuProps) {
  const [activeIndices, setActiveIndices] = useState([0]);
  const [animatingOut, setAnimatingOut] = useState(false);
  const animatingOutTimeout = useRef(null);

  const resetDropdownState = (i) => {
    setActiveIndices(typeof i === 'number' ? [i] : []);
    setAnimatingOut(false);
    // animatingOutTimeout = null;
  };

  const onMouseEnter = (i) => {
    if (animatingOutTimeout) {
      clearTimeout(animatingOutTimeout.current);
      resetDropdownState(i);
      return;
    }
    if (activeIndices[activeIndices.length - 1] === i) return;
    setActiveIndices((prevActiveIndices) => prevActiveIndices.concat(i));
    setAnimatingOut(false);
  };

  const onMouseLeave = () => {
    setAnimatingOut(true);
    animatingOutTimeout.current = setTimeout(resetDropdownState, duration);
  };

  let CurrentDropdown;
  let PrevDropdown;
  let direction;

  const currentIndex = activeIndices[activeIndices.length - 1];
  const prevIndex =
    activeIndices.length > 1 && activeIndices[activeIndices.length - 2];

  if (typeof currentIndex === 'number')
    CurrentDropdown = navbarConfig[currentIndex].dropdown;
  if (typeof prevIndex === 'number') {
    PrevDropdown = navbarConfig[prevIndex].dropdown;
    direction = currentIndex > prevIndex ? 'right' : 'left';
  }

  return (
    <Flipper
      flipKey={currentIndex}
      spring={duration === 300 ? 'noWobble' : { stiffness: 10, damping: 10 }}
      className={className}
    >
      {navbarConfig.map(
        (
          {
            path,
            to,
            className: nClassName,
            component: Component = NavbarItem,
            items = [],
            dropdown,
            ...rest
          },
          index,
        ) => (
          <Component
            key={path || to}
            className={nClassName}
            path={path || to}
            to={path || to}
            index={index}
            onMouseEnter={(e) => {
              onMouseEnter(index);
            }}
            // onMouseLeave={onMouseLeave}
            {...rest}
          >
            {currentIndex === index &&
              CurrentDropdown &&
              (dropdown || items.length > 0) && (
                <DropdownContainer
                  direction={direction}
                  animatingOut={animatingOut}
                  duration={duration}
                >
                  <CurrentDropdown items={items} />
                  {PrevDropdown && <PrevDropdown />}
                </DropdownContainer>
              )}
          </Component>
        ),
      )}
    </Flipper>
  );
}
