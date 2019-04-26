import * as React from 'react';

import Shell, {
  ShellSidebar,
  ShellHeader,
  ShellContent,
  ShellNavigation,
  ShellMain,
  ShellBody,
  ShellFooter,
} from '../src';

export default function Empty() {
  return (
    <Shell>
      <ShellSidebar style={{ width: '4.5rem', backgroundColor: '#4C566A' }}>
        <ShellHeader>
          <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
        </ShellHeader>
        <ShellBody scrollable className="d-flex flex-column my-2" />
        <ShellFooter />
      </ShellSidebar>
      <ShellContent>
        <ShellNavigation
          style={{
            flex: '1 0 22%',
            maxWidth: '22%',
            backgroundColor: '#f8f9fa',
            minWidth: 'fit-content',
          }}
        >
          <ShellHeader>
            <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
          </ShellHeader>
          <ShellBody scrollable />
        </ShellNavigation>
        <ShellMain style={{ flex: '1 0 78%' }}>
          <ShellHeader>
            <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
          </ShellHeader>
          <ShellBody className="d-flex" />
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
