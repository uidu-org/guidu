import * as React from 'react';
import {
  NavigationMenu,
  SidebarFooter,
  SidebarLogo,
  SidebarMenu,
} from '../examples-utils';
import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '../src';

export default function Dashboard() {
  return (
    <>
      <ShellSidebar style={{ width: '4rem', backgroundColor: '#4C566A' }}>
        <ShellHeader>
          <SidebarLogo size="large" />
        </ShellHeader>
        <ScrollableContainer>
          <SidebarMenu />
        </ScrollableContainer>
        <ShellFooter>
          <SidebarFooter />
        </ShellFooter>
      </ShellSidebar>
      <ShellMain>
        <ShellHeader>
          <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center">
            Long navigation with search bar & actions
          </div>
        </ShellHeader>
        <ShellBody style={{ flex: '1 0 78%' }} className="border-left">
          <ShellSidebar
            className="border-right"
            style={{
              flex: '1 0 22%',
              maxWidth: '22%',
              minWidth: 'fit-content',
            }}
            // className="border-right"
          >
            <NavigationMenu />
          </ShellSidebar>
          <ShellMain>
            <ScrollableContainer>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
            </ScrollableContainer>
          </ShellMain>
          <ShellSidebar
            className="bg-white border-left p-4 flex-shrink-0 d-none d-lg-flex"
            style={{ width: '20%' }}
          >
            Group sidebar
          </ShellSidebar>
        </ShellBody>
      </ShellMain>
    </>
  );
}
