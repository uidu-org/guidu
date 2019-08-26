import React, { PureComponent } from 'react';
import Media from 'react-media';
import {
  NavLink as Link,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { TreenavProps } from '../types';
import TreenavItem from './TreenavItem';

class Treenav extends PureComponent<TreenavProps & RouteComponentProps> {
  render() {
    const { items, match } = this.props;

    return (
      <Media query={`(max-width: 768px`}>
        {matches => {
          if (matches) {
            return (
              <Switch>
                <Route
                  exact
                  path={match.path}
                  render={routeProps => (
                    <div className="container px-0">
                      <ul className="list-group list-group-flush">
                        {items.map(item => (
                          <TreenavItem item={item} />
                        ))}
                      </ul>
                    </div>
                  )}
                />
                {items.map(({ to, name, component: Component, items }) => {
                  if (items) {
                    return (
                      <>
                        <Route
                          exact
                          path={to}
                          render={routeProps => (
                            <div className="container px-0">
                              <ul className="list-group list-group-flush">
                                {items.map(item => (
                                  <TreenavItem
                                    item={{
                                      ...item,
                                      to: `${item.to}/${item.anchor}`,
                                    }}
                                  />
                                ))}
                              </ul>
                            </div>
                          )}
                        />
                        {items.map(
                          ({ anchor, name, component: ChildComponent }) => (
                            <Route
                              key={`${to}/${anchor}`}
                              path={`${to}/${anchor}`}
                              render={routeProps => (
                                <ChildComponent
                                  {...this.props}
                                  {...routeProps}
                                />
                              )}
                            />
                          ),
                        )}
                      </>
                    );
                  }

                  return (
                    <Route
                      path={to}
                      render={routeProps => (
                        <>
                          <Component {...this.props} {...routeProps} />
                        </>
                      )}
                    />
                  );
                })}
              </Switch>
            );
          }

          return (
            <div className="container px-0 mt-md-4" id="foo">
              <div className="row no-gutters">
                <div className="col-md-3 col-lg-2 px-md-3 navbar-light">
                  <ul className="nav navbar-nav mb-4 px-0 px-lg-2 sticky-top">
                    {items.map(item => [
                      <Link className="nav-link" to={item.to}>
                        {item.name}
                      </Link>,
                      location.pathname === item.to && item.items && (
                        <ul className="nav navbar-nav">
                          {item.items.map(subLink => (
                            <Link
                              // href="#"
                              className="small nav-link py-1"
                              activeClassName="text-primary"
                              to={subLink.anchor}
                              // spy
                              // hashSpy
                              // smooth
                              // offset={-25}
                              // onSetActive={console.log}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </ul>
                      ),
                    ])}
                  </ul>
                </div>
                <Switch>
                  {items.map(({ to, component: Component }) => (
                    <Route
                      path={to}
                      render={routeProps => (
                        <Component {...this.props} {...routeProps} />
                      )}
                    />
                  ))}
                  {/* <Redirect to="/dashboard/settings/profile" /> */}
                </Switch>
              </div>
            </div>
          );
        }}
      </Media>
    );
  }
}

export default withRouter(Treenav);
