import React, { Children, useRef } from 'react';
import { Flipped } from 'react-flip-toolkit';
import {
  Caret,
  DropdownBackground,
  DropdownRoot,
  InvertedDiv,
} from './Components';
import FadeContents from './FadeContents';

const getFirstDropdownSectionHeight = (el) => {
  if (
    !el ||
    !el.querySelector ||
    !el.querySelector('*[data-first-dropdown-section]')
  ) {
    return 0;
  }
  return el.querySelector('*[data-first-dropdown-section]').offsetHeight;
};

const updateAltBackground = ({
  altBackground,
  prevDropdown,
  currentDropdown,
}) => {
  const prevHeight = getFirstDropdownSectionHeight(prevDropdown);
  const currentHeight = getFirstDropdownSectionHeight(currentDropdown);

  const immediateSetTranslateY = (el, translateY) => {
    el.style.transform = `translateY(${translateY}px)`;
    el.style.transition = 'transform 0s';
    requestAnimationFrame(() => (el.style.transitionDuration = ''));
  };

  if (prevHeight) {
    // transition the grey ("alt") background from its previous height to its current height
    immediateSetTranslateY(altBackground, prevHeight);
    requestAnimationFrame(() => {
      altBackground.style.transform = `translateY(${currentHeight}px)`;
    });
  } else {
    // just immediately set the background to the appropriate height
    // since we don't have a stored value
    immediateSetTranslateY(altBackground, currentHeight);
  }
};

export type DropdownContainerProps = {
  children: React.ReactNode;
  animatingOut?: boolean;
  direction?: 'left' | 'right';
  duration?: number;
};

function DropdownContainer({
  children,
  direction,
  animatingOut,
  duration,
}: DropdownContainerProps) {
  const altBackgroundEl = useRef(null);
  const prevDropdownEl = useRef(null);
  const currentDropdownEl = useRef(null);

  // useEffect(() => {
  //   updateAltBackground({
  //     altBackground: altBackgroundEl.current,
  //     prevDropdown: prevDropdownEl.current,
  //     currentDropdown: currentDropdownEl.current,
  //   });
  // }, []);

  const [currentDropdown, prevDropdown] = Children.toArray(children);
  return (
    <DropdownRoot
      direction={direction}
      animatingOut={animatingOut}
      duration={duration}
    >
      <Flipped flipId="dropdown-caret">
        <Caret />
      </Flipped>
      <Flipped flipId="dropdown">
        <DropdownBackground>
          <Flipped inverseFlipId="dropdown">
            <InvertedDiv>
              {/* <AltBackground ref={altBackgroundEl} duration={duration} /> */}
              <FadeContents
                direction={direction}
                duration={duration}
                ref={currentDropdownEl}
              >
                {currentDropdown}
              </FadeContents>
            </InvertedDiv>
          </Flipped>

          <Flipped inverseFlipId="dropdown" scale>
            <InvertedDiv absolute>
              {prevDropdown && (
                <FadeContents
                  animatingOut
                  direction={direction}
                  duration={duration}
                  ref={prevDropdownEl}
                >
                  {prevDropdown}
                </FadeContents>
              )}
            </InvertedDiv>
          </Flipped>
        </DropdownBackground>
      </Flipped>
    </DropdownRoot>
  );
}

export default DropdownContainer;
