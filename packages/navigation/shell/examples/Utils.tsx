import * as React from 'react';
import {
  NavigationMenu,
  SidebarFooter,
  SidebarLogo,
  SidebarMenu,
} from '../examples-utils';
import Shell, {
  ShellBody,
  ShellBodyWithSpinner,
  ShellContent,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellNavigation,
  ShellSidebar,
} from '../src';

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
          <NavigationMenu />
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
          <ShellBodyWithSpinner />
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
