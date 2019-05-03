import { ShellBody, ShellFooter, ShellHeader, ShellSidebar } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import GlobalItem from '../GlobalNavigationItem';
import { FakeGlobalItemWrapper, FakeItemWrapper } from './styled';
import { GlobalNavigationProps, GlobalNavigationState } from './types';

const defaultStyle = {
  transition: 'transform 130ms ease-in',
  position: 'absolute',
  left: 0,
  height: '100%',
  willChange: 'transform',
};

const transitionStyles = {
  entering: { transform: 'translateX(0)', zIndex: 4 },
  entered: { transform: 'translateX(0)', zIndex: 30 },
  exiting: {
    transform: 'translateX(-100%)',
    transition: 'transform 300ms ease-out',
    zIndex: 30,
  },
  exited: { transform: 'translateX(-100%)', zIndex: 2 },
};

export default class GlobalNavigation extends PureComponent<
  GlobalNavigationProps,
  GlobalNavigationState
> {
  static defaultProps = {
    backgroundColor: '#4C566A',
    isOpen: false,
    width: '4rem',
    navigationWidth: 25,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  render() {
    const {
      backgroundColor,
      header,
      body,
      footer,
      width,
      navigationWidth,
      navigationMinWidth,
    } = this.props;
    const { isOpen } = this.state;


    return [
      <ShellSidebar
        style={{
          width,
          backgroundColor,
          zIndex: 3,
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
          style={{
            backgroundColor: 'rgba(255, 255, 255, .05)',
          }}
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
              ...{
                backgroundColor,
                width: `calc((100% - ${width}) * ${navigationWidth /
                  100} + ${width})`,
              },
              ...(navigationMinWidth && {
                minWidth: `calc(${navigationMinWidth} + ${width})`,
              }),
              ...transitionStyles[state],
            }}
            onMouseLeave={() => this.setState({ isOpen: false })}
          >
            <ShellHeader>
              <FakeGlobalItemWrapper style={{ width }}>
                <GlobalItem {...header} />
              </FakeGlobalItemWrapper>
              <h5 className="m-0 text-light">{header.name}</h5>
            </ShellHeader>
            <ShellBody scrollable className="d-flex flex-column">
              {body.map(bodyItem => (
                <FakeItemWrapper>
                  <FakeGlobalItemWrapper style={{ width }}>
                    <GlobalItem {...bodyItem} />
                  </FakeGlobalItemWrapper>
                  {bodyItem.name}
                </FakeItemWrapper>
              ))}
            </ShellBody>
            <ShellFooter
              className="d-flex flex-column py-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
              }}
            >
              {footer.map(footerItem => (
                <FakeItemWrapper as="a" href="#">
                  <FakeGlobalItemWrapper style={{ width }}>
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
