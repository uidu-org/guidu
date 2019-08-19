import { ModalTransition } from '@uidu/modal-dialog';
import Shell, { ShellContent, ShellMain, ShellNavigation } from '@uidu/shell';
import GlobalTheme from '@uidu/theme';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';
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

// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`
  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
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
        <GlobalStyle />
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
                  <ShellContent>
                    <ShellNavigation
                      className="d-lg-flex d-none shadow-sm"
                      style={{
                        flex: '1 0 22%',
                        maxWidth: '18rem',
                        minWidth: 'fit-content',
                      }}
                    >
                      <Nav />
                    </ShellNavigation>
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
                          children={props => (
                            <ModalTransition>
                              {props.match && <ChangelogModal {...props} />}
                            </ModalTransition>
                          )}
                        />
                        <Route
                          path="/packages/:groupId/:pkgId/example/:exampleId"
                          children={props => (
                            <ModalTransition>
                              {props.match && <ExamplesModal {...props} />}
                            </ModalTransition>
                          )}
                        />
                      </Boundary>
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
