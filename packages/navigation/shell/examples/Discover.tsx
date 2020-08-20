import * as React from 'react';
import { Element, Link } from 'react-scroll';
import Shell, {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
} from '../src';

export default function App() {
  return (
    <Shell id="desktop-scroller">
      <ShellMain>
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
        <ShellBody style={{ flex: '1 0 78%' }}>
          <ScrollableContainer>
            <div className="bg-light sticky-top">
              <div className="container px-0">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <Link
                      to="summary"
                      className="nav-link py-3 px-4"
                      containerId="desktop-scroller"
                      smooth
                      spy
                    >
                      Description
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      exact
                      to="comments"
                      className="nav-link py-3 px-4"
                      smooth
                      spy
                    >
                      Comments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="gallery"
                      className="nav-link py-3 px-4"
                      smooth
                      spy
                    >
                      Gallery
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="directions"
                      className="nav-link py-3 px-4"
                      smooth
                      spy
                    >
                      Directions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
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
                <Element name="summary">
                  <h1>Summary</h1>
                </Element>
                <div className="sticky-top">Test sticky</div>
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
        </ShellBody>
        <ShellFooter>Tabbar</ShellFooter>
      </ShellMain>
    </Shell>
  );
}
