import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';

import Navbar from './Navbar';
import NavbarItem from './Navbar/NavbarItem';
import DropdownContainer from './DropdownContainer';

export default class AnimatedNavbar extends Component {
  state = {
    activeIndices: [],
  };

  resetDropdownState = i => {
    this.setState({
      activeIndices: typeof i === 'number' ? [i] : [],
      animatingOut: false,
    });
    delete this.animatingOutTimeout;
  };

  onMouseEnter = i => {
    const { activeIndices } = this.state;
    if (this.animatingOutTimeout) {
      clearTimeout(this.animatingOutTimeout);
      this.resetDropdownState(i);
      return;
    }
    if (activeIndices[activeIndices.length - 1] === i) return;

    this.setState(prevState => ({
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
    const { duration, navbarConfig } = this.props;
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
              title={n.title}
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
                  <CurrentDropdown onMouseLeave={this.onMouseLeave} />
                  {PrevDropdown && (
                    <PrevDropdown onMouseLeave={this.onMouseLeave} />
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
