import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import GlobalItem from './GlobalNavigationItem';
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
    showOverlay: true,
    showAfter: 1000,
    footer: [],
    header: [],
    body: [],
  };

  private timer: number = null;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  onMouseEnter = () => {
    const { showAfter, showOverlay } = this.props;
    if (!showOverlay) {
      return false;
    }
    this.timer = window.setTimeout(() => {
      this.setState({ isOpen: true });
    }, showAfter);
    return true;
  };

  onMouseLeave = () => {
    const { showOverlay } = this.props;
    if (!showOverlay) {
      return false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    return this.setState({ isOpen: false });
  };

  render() {
    const {
      style,
      backgroundColor,
      header,
      body,
      footer,
      width,
      navigationWidth,
      navigationMinWidth,
      showOverlay,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <ShellSidebar
          style={{
            width,
            backgroundColor,
            zIndex: 3,
            ...style,
          }}
          // onMouseEnter={this.onMouseEnter}
        >
          <ShellHeader className="justify-content-center">
            <GlobalItem {...header} />
          </ShellHeader>
          {body.length > 0 && (
            <ShellBody>
              <ShellMain>
                <ScrollableContainer>
                  {body.map((bodyItem, index) => (
                    <GlobalItem
                      key={`global-navigation-body-${index}`}
                      {...bodyItem}
                    />
                  ))}
                </ScrollableContainer>
              </ShellMain>
            </ShellBody>
          )}
          {footer.length > 0 && (
            <ShellFooter className="d-flex flex-column align-items-center py-3">
              {footer.map((footerItem, index) => (
                <GlobalItem
                  key={`global-navigation-footer-${index}`}
                  {...footerItem}
                />
              ))}
              {/* {showOverlay && (
                <GlobalItem
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isOpen: true });
                  }}
                >
                  <ChevronsRight />
                </GlobalItem>
              )} */}
            </ShellFooter>
          )}
        </ShellSidebar>
        {showOverlay && (
          <Transition in={isOpen} timeout={300}>
            {(state) => (
              <ShellSidebar
                style={{
                  ...defaultStyle,
                  ...{
                    backgroundColor,
                    width: `calc((100% - ${width}) * ${
                      navigationWidth / 100
                    } + ${width})`,
                  },
                  ...(navigationMinWidth && {
                    minWidth: `calc(${navigationMinWidth} + ${width})`,
                  }),
                  ...transitionStyles[state],
                }}
                // onMouseLeave={this.onMouseLeave}
              >
                <ShellHeader>
                  <FakeGlobalItemWrapper style={{ width }}>
                    <GlobalItem {...header} />
                  </FakeGlobalItemWrapper>
                  <h5 className="m-0 text-light">{header.name}</h5>
                </ShellHeader>
                {body.length > 0 && (
                  <ShellBody>
                    <ShellMain>
                      <ScrollableContainer>
                        {body.map(
                          ({ children, name, ...otherProps }, index) => (
                            <FakeItemWrapper
                              key={`global-navigation-fake-body-${index}`}
                              {...otherProps}
                            >
                              <FakeGlobalItemWrapper style={{ width }}>
                                <GlobalItem as="span">{children}</GlobalItem>
                              </FakeGlobalItemWrapper>
                              {name}
                            </FakeItemWrapper>
                          ),
                        )}
                      </ScrollableContainer>
                    </ShellMain>
                  </ShellBody>
                )}
                {footer.length > 0 && (
                  <ShellFooter className="d-flex flex-column py-3">
                    {footer.map(({ name, children, ...otherProps }, index) => (
                      <FakeItemWrapper
                        key={`global-navigation-fake-footer-${index}`}
                        {...otherProps}
                      >
                        <FakeGlobalItemWrapper style={{ width }}>
                          <GlobalItem>{children}</GlobalItem>
                        </FakeGlobalItemWrapper>
                        {name}
                      </FakeItemWrapper>
                    ))}
                    {/* <FakeItemWrapper
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ isOpen: false });
                      }}
                    >
                      <FakeGlobalItemWrapper style={{ width }}>
                        <GlobalItem>
                          <ChevronsLeft />
                        </GlobalItem>
                      </FakeGlobalItemWrapper>
                    </FakeItemWrapper> */}
                  </ShellFooter>
                )}
              </ShellSidebar>
            )}
          </Transition>
        )}
      </>
    );
  }
}
