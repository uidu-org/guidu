import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { AnimatedMenuProps, AnimatedMenuState } from '../types';
import DropdownContainer from './DropdownContainer';
import Navbar from './Navbar';
import NavbarItem from './Navbar/NavbarItem';

export default class AnimatedMenu extends Component<
  AnimatedMenuProps,
  AnimatedMenuState
> {
  public readonly state: Readonly<AnimatedMenuState> = {
    activeIndices: [0],
    animatingOut: false,
  };

  animatingOutTimeout = null;

  resetDropdownState = (i) => {
    this.setState({
      activeIndices: typeof i === 'number' ? [i] : [],
      animatingOut: false,
    });
    delete this.animatingOutTimeout;
  };

  onMouseEnter = (i) => {
    const { activeIndices } = this.state;
    if (this.animatingOutTimeout) {
      clearTimeout(this.animatingOutTimeout);
      this.resetDropdownState(i);
      return;
    }
    if (activeIndices[activeIndices.length - 1] === i) return;

    this.setState((prevState) => ({
      activeIndices: prevState.activeIndices.concat(i),
      animatingOut: false,
    }));
  };

  onMouseLeave = () => {
    const { duration } = this.props;
    this.setState({
      animatingOut: true,
    });
    this.animatingOutTimeout = setTimeout(this.resetDropdownState, duration);
  };

  render() {
    const { duration, navbarConfig, ...otherProps } = this.props;
    const { activeIndices, animatingOut } = this.state;
    let CurrentDropdown;
    let PrevDropdown;
    let direction;

    const currentIndex = activeIndices[activeIndices.length - 1];
    const prevIndex =
      activeIndices.length > 1 && activeIndices[activeIndices.length - 2];

    if (typeof currentIndex === 'number') {
      CurrentDropdown = navbarConfig[currentIndex].dropdown;
    }
    if (typeof prevIndex === 'number') {
      PrevDropdown = navbarConfig[prevIndex].dropdown;
      direction = currentIndex > prevIndex ? 'right' : 'left';
    }

    return (
      <Flipper
        flipKey={currentIndex}
        spring={duration === 300 ? 'noWobble' : { stiffness: 10, damping: 10 }}
      >
        <Navbar onMouseLeave={this.onMouseLeave}>
          {navbarConfig.map((n, index) => (
            <NavbarItem
              key={n.path}
              className={n.className}
              name={n.name}
              path={n.path}
              index={index}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {currentIndex === index && (
                <DropdownContainer
                  direction={direction}
                  animatingOut={animatingOut}
                  duration={duration}
                >
                  <CurrentDropdown
                    onMouseLeave={this.onMouseLeave}
                    {...otherProps}
                  />
                  {PrevDropdown && (
                    <PrevDropdown
                      onMouseLeave={this.onMouseLeave}
                      {...otherProps}
                    />
                  )}
                </DropdownContainer>
              )}
            </NavbarItem>
          ))}
        </Navbar>
      </Flipper>
    );
  }
}
