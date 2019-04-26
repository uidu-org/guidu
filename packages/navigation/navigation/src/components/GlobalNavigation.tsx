import React, { PureComponent } from 'react';
import { ShellSidebar, ShellHeader, ShellBody, ShellFooter } from '@uidu/shell';
import { Transition } from 'react-transition-group';
import { FakeItemWrapper, FakeGlobalItemWrapper } from '../styled';
import { GlobalNavigationProps } from '../types';
import GlobalItem from './GlobalItem';

const defaultStyle = {
  transition: 'transform 130ms ease-in',
  position: 'absolute',
  width: 'calc((100% - 4rem) * 0.25 + 4rem)',
  left: 0,
  backgroundColor: '#4C566A',
  height: '100%',
  willChange: 'transform',
};

const transitionStyles = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)', zIndex: 30 },
  exiting: {
    transform: 'translateX(-100%)',
    transition: 'transform 300ms ease-out',
  },
  exited: { transform: 'translateX(-100%)' },
};

export default class GlobalNavigation extends PureComponent<
  GlobalNavigationProps
> {
  state = {
    isOpen: false,
  };

  render() {
    const { header, body, footer, width } = this.props;
    const { isOpen } = this.state;

    return [
      <ShellSidebar
        style={{
          width: '4rem',
          backgroundColor: '#4C566A',
          zIndex: 2,
        }}
        onMouseEnter={() => this.setState({ isOpen: true })}
      >
        <ShellHeader className="justify-content-center">
          <GlobalItem {...header} />
        </ShellHeader>
        <ShellBody scrollable className="d-flex flex-column align-items-center">
          {body.map(bodyItem => (
            <GlobalItem {...bodyItem} />
          ))}
        </ShellBody>
        <ShellFooter
          className="d-flex flex-column align-items-center py-3"
          style={{ backgroundColor: 'rgba(255, 255, 255, .05)' }}
        >
          {footer.map(footerItem => (
            <GlobalItem {...footerItem} />
          ))}
        </ShellFooter>
      </ShellSidebar>,
      <Transition in={isOpen} timeout={300}>
        {state => (
          <ShellSidebar
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            onMouseLeave={() => this.setState({ isOpen: false })}
          >
            <ShellHeader>
              <FakeGlobalItemWrapper style={{ width: '4rem' }}>
                <GlobalItem {...header} />
              </FakeGlobalItemWrapper>
              <h5 className="m-0 text-light">{header.name}</h5>
            </ShellHeader>
            <ShellBody scrollable className="d-flex flex-column">
              {body.map(bodyItem => (
                <FakeItemWrapper>
                  <FakeGlobalItemWrapper style={{ width: '4rem' }}>
                    <GlobalItem {...bodyItem} />
                  </FakeGlobalItemWrapper>
                  {bodyItem.name}
                </FakeItemWrapper>
              ))}
            </ShellBody>
            <ShellFooter
              className="d-flex flex-column py-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, .05)' }}
            >
              {footer.map(footerItem => (
                <FakeItemWrapper as="a" href="#">
                  <FakeGlobalItemWrapper style={{ width: '4rem' }}>
                    <GlobalItem {...footerItem} />
                  </FakeGlobalItemWrapper>
                  {footerItem.name}
                </FakeItemWrapper>
              ))}
            </ShellFooter>
          </ShellSidebar>
        )}
      </Transition>,
    ];
  }
}
