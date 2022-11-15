import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React from 'react';
import GlobalItem from './GlobalNavigationItem';
import { GlobalNavigationProps } from './types';

export default function GlobalNavigation({
  className = null,
  width = '4rem',
  footer = [],
  header = [],
  body = [],
  style,
}: GlobalNavigationProps) {
  return (
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
        </ShellFooter>
      )}
    </ShellSidebar>
  );
}
