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

export default function App() {
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
            // backgroundColor: '#f8f9fa',
          }}
        >
          <ShellHeader>
            <NavigationHeader app="contacts" />
          </ShellHeader>
          <ShellBody scrollable>
            <NavigationMenu />
          </ShellBody>
        </ShellNavigation>
        <ShellMain style={{ flex: '1 0 78%' }}>
          <ShellHeader>
            <div className="d-flex px-4  h-100 w-100 align-items-center">
              <input
                type="search"
                className="form-control bg-light border-0"
                placeholder="Search among your contacts..."
              />
              <button className="btn btn-primary ml-4">Add</button>
            </div>
          </ShellHeader>
          <ShellBody scrollable>
            <div className="row no-gutters justify-content-center my-5">
              <div className="col-lg-10">
                <p>Content</p>
              </div>
            </div>
          </ShellBody>
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
