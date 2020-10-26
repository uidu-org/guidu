import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import GlobalItem from './GlobalNavigationItem';
import { FakeGlobalItemWrapper, FakeItemWrapper } from './styled';
import { GlobalNavigationProps } from './types';

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

export default function GlobalNavigation({
  className = null,
  backgroundColor = '#4C566A',
  isOpen: propIsOpen = false,
  width = '4rem',
  navigationWidth = 25,
  showOverlay = true,
  showAfter = 1000,
  footer = [],
  header = [],
  body = [],
  style,
  navigationMinWidth,
}: GlobalNavigationProps) {
  const timer = useRef(null);
  const [isOpen, setIsOpen] = useState(propIsOpen);

  const onMouseEnter = () => {
    if (!showOverlay) {
      return false;
    }
    timer.current = window.setTimeout(() => {
      setIsOpen(true);
    }, showAfter);
    return true;
  };

  const onMouseLeave = () => {
    if (!showOverlay) {
      return false;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    return setIsOpen(false);
  };

  return (
    <>
      <ShellSidebar
        style={{
          width,
          backgroundColor,
          zIndex: 3,
          ...style,
        }}
        className={className}
        // onMouseEnter={onMouseEnter}
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
              // onMouseLeave={onMouseLeave}
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
                      {body.map(({ children, name, ...otherProps }, index) => (
                        <FakeItemWrapper
                          key={`global-navigation-fake-body-${index}`}
                          {...otherProps}
                        >
                          <FakeGlobalItemWrapper style={{ width }}>
                            <GlobalItem as="span">{children}</GlobalItem>
                          </FakeGlobalItemWrapper>
                          {name}
                        </FakeItemWrapper>
                      ))}
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
