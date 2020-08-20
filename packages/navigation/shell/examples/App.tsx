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

export default function App() {
  return (
    <>
      <ShellSidebar style={{ width: '4rem', backgroundColor: '#4C566A' }}>
        <ShellHeader>
          <SidebarLogo size="large" />
        </ShellHeader>
        <ScrollableContainer className="my-2">
          <SidebarMenu />
        </ScrollableContainer>
        <ShellFooter>
          <SidebarFooter />
        </ShellFooter>
      </ShellSidebar>
      <ShellMain style={{ flex: '1 0 78%' }}>
        <ShellBody>
          <ShellMain>
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
            <ShellBody>
              <ShellSidebar
                style={{
                  flex: '1 0 22%',
                  maxWidth: '22%',
                  // backgroundColor: '#f8f9fa',
                }}
              >
                <NavigationMenu />
              </ShellSidebar>
              <ShellMain>
                <ScrollableContainer>
                  <div className="row no-gutters justify-content-center my-5">
                    <div className="col-lg-10">
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
                    </div>
                  </div>
                </ScrollableContainer>
              </ShellMain>
            </ShellBody>
          </ShellMain>
        </ShellBody>
      </ShellMain>
    </>
  );
}
