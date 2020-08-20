import * as React from 'react';
import ChatWindow from '../../../messaging/chat-window/examples/Basic';
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
        <ScrollableContainer className="d-flex flex-column my-2">
          <SidebarMenu />
        </ScrollableContainer>
        <ShellFooter>
          <SidebarFooter />
        </ShellFooter>
      </ShellSidebar>
      <ShellSidebar
        style={{
          width: '16%',
          flexShrink: 0,
        }}
        className="border-right d-none d-md-flex"
      >
        <NavigationMenu />
      </ShellSidebar>
      <ShellMain>
        <ShellHeader>
          <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center">
            Long navigation with search bar & actions
          </div>
        </ShellHeader>
        <ShellBody>
          <ShellMain>
            <ChatWindow />
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
