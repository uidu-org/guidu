import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React from 'react';
import { Transition } from 'react-transition-group';
import GlobalItem from './GlobalNavigationItem';
import { FakeGlobalItemWrapper, FakeItemWrapper } from './styled';
import { GlobalNavigationProps } from './types';

const defaultStyle = {
  transition: 'transform 130ms ease-in',
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
  isOpen = false,
  width = '4rem',
  navigationWidth = 25,
  footer = [],
  header = [],
  body = [],
  style,
  navigationMinWidth,
}: GlobalNavigationProps) {
  return (
    <>
      <ShellSidebar
        style={{
          width,
          zIndex: 3,
          ...style,
        }}
        className={className}
      >
        <ShellHeader tw="justify-center">
          <GlobalItem {...header} />
        </ShellHeader>
        {body.length > 0 && (
          <ShellBody>
            <ShellMain>
              <ScrollableContainer>
                <div tw="space-y-0.5">
                  {body.map((bodyItem, index) => (
                    <GlobalItem
                      key={`global-navigation-body-${index}`}
                      {...bodyItem}
                    />
                  ))}
                </div>
              </ScrollableContainer>
            </ShellMain>
          </ShellBody>
        )}
        {footer.length > 0 && (
          <ShellFooter tw="space-y-0.5 flex flex-col py-4">
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
      <Transition in={isOpen} timeout={0}>
        {(state) => {
          return (
            <ShellSidebar
              tw="flex absolute left-0 h-full border-r"
              className={className}
              style={{
                ...defaultStyle,
                width: `calc(${width} + ${navigationWidth}% + 1px)`,
                ...(navigationMinWidth && {
                  minWidth: `calc(${navigationMinWidth} + ${width})`,
                }),
                ...style,
                ...transitionStyles[state],
              }}
            >
              <ShellHeader>
                <FakeGlobalItemWrapper style={{ width }}>
                  <GlobalItem {...header} />
                </FakeGlobalItemWrapper>
                <h5>{header.name}</h5>
              </ShellHeader>
              {body.length > 0 && (
                <ShellBody>
                  <ShellMain>
                    <ScrollableContainer>
                      <div tw="space-y-0.5">
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
                      </div>
                    </ScrollableContainer>
                  </ShellMain>
                </ShellBody>
              )}
              {footer.length > 0 && (
                <ShellFooter tw="space-y-0.5 flex flex-col py-4">
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
          );
        }}
      </Transition>
    </>
  );
}
