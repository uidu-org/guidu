import * as React from 'react';
import { ArrowLeft } from 'react-feather';
import { NavigationMenu } from '../examples-utils';
import Shell, {
  ShellBody,
  ShellContent,
  ShellHeader,
  ShellMain,
  ShellNavigation,
} from '../src';

export default function Event() {
  return (
    <Shell>
      <ShellContent>
        <ShellMain>
          <ShellHeader>
            <div className="d-flex px-4 h-100 w-100 align-items-center">
              <ArrowLeft className="mr-4" />
              <h5 className="m-0">Titolo dell'evento</h5>
              <button className="btn btn-primary ml-auto">Add</button>
            </div>
          </ShellHeader>
          <ShellHeader style={{ height: '3rem' }}>
            <div className="d-flex border-bottom h-100 w-100 align-items-center px-md-3">
              <ul className="nav ml-md-5">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Active
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </ShellHeader>
          <ShellMain className="flex-row" style={{ minHeight: 0 }}>
            <ShellNavigation
              style={{
                flex: '1 0 22%',
                maxWidth: '22%',
              }}
            >
              <NavigationMenu />
            </ShellNavigation>
            <ShellBody scrollable>
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
                </div>
              </div>
            </ShellBody>
          </ShellMain>
        </ShellMain>
      </ShellContent>
    </Shell>
  );
}
