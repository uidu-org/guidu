import React, { useState } from 'react';
import { StyledActions, StyledActionWrapper, StyledFab } from '../styled';
import MainButton from './MainButton';

export default function Fab({
  event = 'hover',
  children,
  position = { bottom: 0, right: 0 },
  icon,
  mainButtonStyles,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const enter = () => event === 'hover' && open();
  const leave = () => event === 'hover' && close();
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const toggle = () => (event === 'click' ? setIsOpen(!isOpen) : null);

  const actionOnClick = (userFunc) => {
    setIsOpen(false);
    setTimeout(() => {
      // Hack to allow the FAB to close before the user event fires
      userFunc();
    }, 1);
  };

  const rc = () => {
    if (React.Children.count(children) > 6)
      console.warn('@uidu/fab only supports up to 6 action buttons');
    return React.Children.map(children as React.ReactElement<any>, (ch, i) => (
      <StyledActionWrapper className={`${'top' in position ? 'top' : ''}`}>
        {React.cloneElement(ch, {
          'data-testid': `action-button-${i}`,
          'aria-label': ch.props.text || `Menu button ${i + 1}`,
          'aria-hidden': !isOpen,
          ...ch.props,
          onClick: () => actionOnClick(ch.props.onClick),
        })}
        {ch.props.text && (
          <span
            className={'right' in position ? 'right' : ''}
            aria-hidden={!isOpen}
          >
            {ch.props.text}
          </span>
        )}
      </StyledActionWrapper>
    ));
  };

  return (
    <StyledFab
      onMouseEnter={enter}
      onMouseLeave={leave}
      isOpen={isOpen}
      style={position}
    >
      <StyledActions>
        <MainButton
          onClick={toggle}
          style={mainButtonStyles}
          role="button"
          aria-label="Floating menu"
          tabIndex="0"
        >
          {icon}
        </MainButton>
        <ul>{rc()}</ul>
      </StyledActions>
    </StyledFab>
  );
}
