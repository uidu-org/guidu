import React, { PureComponent } from 'react';
import Media from 'react-media';
import {
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
                {items.map(({ to, component: Component, items }) => {
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
                        {items.map(({ anchor, component: ChildComponent }) => (
                          <Route
                            key={`${to}/${anchor}`}
                            path={`${to}/${anchor}`}
                            render={routeProps => (
                              <ChildComponent {...this.props} {...routeProps} />
                            )}
                          />
                        ))}
                      </>
                    );
                  }

                  return (
                    <Route
                      exact
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

          return this.props.children;
        }}
      </Media>
    );
  }
}

export default withRouter(Treenav as any);
