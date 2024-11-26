import { ModalTransition } from '@uidu/modal-dialog';
import Shell, { ShellBody, ShellMain, ShellSidebar } from '@uidu/shell';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import GlobalStyles from '../GlobalStyles';
import ChangeLogExplorer from '../pages/ChangeLogExplorer';
import Document from '../pages/Document';
import FullscreenExamples from '../pages/Examples';
import FourOhFour from '../pages/FourOhFour';
import Home from '../pages/Home';
import Package from '../pages/Package';
import ChangelogModal from '../pages/Package/ChangelogModal';
import ExamplesModal from '../pages/Package/ExamplesModal';
import PackageDocument from '../pages/PackageDocument';
import PackagesList from '../pages/PackagesList';
import Nav from './Nav';

initializeFileTypeIcons();

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
        this.setState((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        }));
      }
    }
  };
  render() {
    return (
      <IntlProvider defaultLocale="en">
        <GlobalStyles />
        <BrowserRouter>
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
                <ShellMain>
                  {/* <ShellHeader></ShellHeader> */}
                  <ShellBody>
                    <ShellSidebar
                      tw="lg:flex hidden"
                      style={{
                        flex: '1 0 18%',
                        minWidth: '18rem',
                      }}
                    >
                      <Nav />
                    </ShellSidebar>
                    <ShellMain>
                      <Boundary>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route path="/docs/:docId*" component={Document} />
                          <Route
                            path="/packages/examples"
                            component={({ location }) => (
                              <Redirect
                                to={location.pathname.replace('/examples', '')}
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
                          <Route path="/packages" component={PackagesList} />
                          <Route
                            path="/changelog/:groupId/:pkgId/:semver?"
                            component={ChangeLogExplorer}
                          />
                          <Route path="/error" component={FourOhFour} />
                          <Route component={FourOhFour} />
                        </Switch>

                        <Route
                          path="/packages/:groupId/:pkgId/changelog/:semver?"
                          children={(props) => (
                            <ModalTransition>
                              {props.match && <ChangelogModal {...props} />}
                            </ModalTransition>
                          )}
                        />
                        <Route
                          path="/packages/:groupId/:pkgId/example/:exampleId"
                          children={(props) => (
                            <ModalTransition>
                              {props.match && <ExamplesModal {...props} />}
                            </ModalTransition>
                          )}
                        />
                      </Boundary>
                    </ShellMain>
                  </ShellBody>
                </ShellMain>
              </Shell>
            </Route>
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
