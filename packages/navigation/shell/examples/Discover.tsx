import * as React from 'react';
import Shell, {
  ShellBody,
  ShellContent,
  ShellFooter,
  ShellHeader,
  ShellMain,
} from '../src';

export default function App() {
  return (
    <Shell fixedHeight="mobileOnly">
      <ShellContent>
        <ShellMain style={{ flex: '1 0 78%' }}>
          <ShellHeader>
            <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center">
              <input
                type="search"
                className="form-control bg-light border-0"
                placeholder="Search among your contacts..."
              />
              <button className="btn btn-primary ml-4">Add</button>
            </div>
          </ShellHeader>
          <ShellBody scrollable="mobileOnly">
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
          </ShellBody>
          <ShellFooter>Tabbar</ShellFooter>
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
