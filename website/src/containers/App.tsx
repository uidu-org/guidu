import { ModalTransition } from '@uidu/modal-dialog';
import GlobalTheme from '@uidu/theme';
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

import Shell, {
  ShellSidebar,
  ShellBody,
  ShellContent,
  ShellMain,
} from '@uidu/shell';
import Home from '../pages/Home';
import ChangeLogExplorer from '../pages/ChangeLogExplorer';
import FullscreenExamples from '../pages/Examples';
import FourOhFour from '../pages/FourOhFour';
import Pattern from '../pages/Pattern';
import PatternsInfo from '../pages/PatternsInfo';
import Document from '../pages/Document';
import Package from '../pages/Package';
import PackagesList from '../pages/PackagesList';
import PackageDocument from '../pages/PackageDocument';
import ChangelogModal from '../pages/Package/ChangelogModal';
import ExamplesModal from '../pages/Package/ExamplesModal';
import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';

import Nav from './Nav';

// eslint-disable-next-line
createGlobalStyle`
  body {
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const AppContent = styled.div`
  flex: 1 1 auto;
`;

type ScrollToTopProps = RouteComponentProps<any>;

class ScrollToTop extends React.Component<ScrollToTopProps> {
  componentDidUpdate(prevProps: ScrollToTopProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

const ScrollHandler = withRouter(ScrollToTop);

class Boundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    let { hasError } = this.state;
    if (hasError) {
      return <FourOhFour />;
    }
    return this.props.children;
  }
}

export type State = { mode: 'dark' | 'light' };

export default class App extends React.Component<{}, State> {
  state: State = {
    mode: 'light',
  };
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyup);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyup);
  }
  handleKeyup = (e: KeyboardEvent) => {
    // We only currently allow toggling dark-mode in dev-mode. Once we have
    // landed on a proper GUI implementation, we should remove the dev-mode
    // check, shipping both the GUI and keyboard shortcut to production.
    if (process.env.NODE_ENV === 'development') {
      const canHandleKey = document.activeElement === document.body;
      if (canHandleKey && e.key === 'd') {
        this.setState(state => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        }));
      }
    }
  };
  render() {
    return (
      <GlobalTheme.Provider value={() => ({ mode: this.state.mode })}>
        <BrowserRouter>
          <AnalyticsListeners>
            <Route>
              <ScrollHandler />
            </Route>
            <Switch>
              <Route
                path="/examples/:groupId?/:pkgId?/:exampleId*"
                component={FullscreenExamples}
              />
              <Route>
                <Shell>
                  <ShellSidebar>
                    <ShellBody scrollable>
                      <Nav />
                    </ShellBody>
                  </ShellSidebar>
                  <ShellContent>
                    <ShellMain>
                      <ShellBody scrollable>
                        <Boundary>
                          <div className="row justify-content-center no-gutters">
                            <div className="col-lg-8">
                              <AppContent>
                                <Switch>
                                  <Route
                                    path="/mk-2"
                                    render={props => (
                                      <Redirect
                                        to={props.location.pathname.replace(
                                          '/mk-2',
                                          '',
                                        )}
                                      />
                                    )}
                                  />
                                  <Route
                                    path="/components"
                                    render={props => (
                                      <Redirect
                                        to={props.location.pathname.replace(
                                          '/components',
                                          '/packages/core',
                                        )}
                                      />
                                    )}
                                  />
                                  <Route exact path="/" component={Home} />
                                  <Route
                                    path="/docs/:docId*"
                                    component={Document}
                                  />
                                  <Route
                                    path="/patterns"
                                    component={PatternsInfo}
                                    exact
                                  />

                                  <Route
                                    path="/patterns/:patternId*"
                                    component={Pattern}
                                  />
                                  <Route
                                    path="/packages/examples"
                                    component={({ location }) => (
                                      <Redirect
                                        to={location.pathname.replace(
                                          '/examples',
                                          '',
                                        )}
                                      />
                                    )}
                                  />
                                  <Route
                                    path="/packages/:groupId/:pkgId/docs/:docId"
                                    component={PackageDocument}
                                  />

                                  <Route
                                    path="/packages/:groupId/:pkgId"
                                    component={Package}
                                  />
                                  <Route
                                    path="/packages"
                                    component={PackagesList}
                                  />
                                  <Route
                                    path="/changelog/:groupId/:pkgId/:semver?"
                                    component={ChangeLogExplorer}
                                  />
                                  <Route path="/error" component={FourOhFour} />
                                  <Route component={FourOhFour} />
                                </Switch>

                                <Route
                                  path="/packages/:groupId/:pkgId/changelog/:semver?"
                                  children={props => (
                                    <ModalTransition>
                                      {props.match && (
                                        <ChangelogModal {...props} />
                                      )}
                                    </ModalTransition>
                                  )}
                                />
                                <Route
                                  path="/packages/:groupId/:pkgId/example/:exampleId"
                                  children={props => (
                                    <ModalTransition>
                                      {props.match && (
                                        <ExamplesModal {...props} />
                                      )}
                                    </ModalTransition>
                                  )}
                                />
                              </AppContent>
                            </div>
                          </div>
                        </Boundary>
                      </ShellBody>
                    </ShellMain>
                  </ShellContent>
                </Shell>
              </Route>
            </Switch>
          </AnalyticsListeners>
        </BrowserRouter>
      </GlobalTheme.Provider>
    );
  }
}
