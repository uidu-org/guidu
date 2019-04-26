import * as React from 'react';
import { Activity } from 'react-feather';

import Shell, {
  ShellSidebar,
  ShellHeader,
  ShellContent,
  ShellNavigation,
  ShellMain,
  ShellBody,
  ShellFooter,
} from '../src';
import {
  SidebarLogo,
  SidebarMenu,
  SidebarFooter,
  NavigationMenu,
  NavigationHeader,
} from '../examples-utils';

import ChatWindow from '../../../messaging/chat-window/examples/Basic';

export default function Dashboard() {
  return (
    <Shell>
      <ShellSidebar style={{ width: '4rem', backgroundColor: '#4C566A' }}>
        <ShellHeader>
          <SidebarLogo />
        </ShellHeader>
        <ShellBody scrollable className="d-flex flex-column my-2">
          <SidebarMenu />
        </ShellBody>
        <ShellFooter>
          <SidebarFooter />
        </ShellFooter>
      </ShellSidebar>
      <ShellContent>
        <ShellNavigation
          style={{
            flex: '1 0 22%',
            maxWidth: '22%',
            minWidth: 'fit-content',
          }}
          // className="border-right"
        >
          <ShellHeader>
            <NavigationHeader app="team" />
          </ShellHeader>
          <ShellBody scrollable>
            <NavigationMenu />
          </ShellBody>
        </ShellNavigation>
        <ShellMain style={{ flex: '1 0 78%' }} className="border-left">
          <ShellHeader>
            <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center">
              Long navigation with search bar & actions
            </div>
          </ShellHeader>
          <ShellBody className="d-flex">
            <ChatWindow />
            <ShellNavigation
              className="bg-white border-left p-4 flex-shrink-0"
              style={{ width: '30%' }}
            >
              Group sidebar
            </ShellNavigation>
          </ShellBody>
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
