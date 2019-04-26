import React, { PureComponent } from 'react';
import { NavigationHeader, NavigationItem, NavigationLink } from '../styled';
import { NavigationProps } from '../types';

export default class Navigation extends PureComponent<NavigationProps> {
  render() {
    const { schema } = this.props;
    return schema.map(node => (
      <ul className="nav flex-column mb-4 px-3" key={node.name}>
        {(node.icon || node.name) && (
          <NavigationItem>
            <NavigationHeader className="px-3">
              {node.icon}
              <span>{node.name}</span>
            </NavigationHeader>
          </NavigationItem>
        )}
        {node.children.map(link => (
          <NavigationItem key={link.path}>
            <NavigationLink
              {...link.props}
              exact
              to={link.path}
              className="px-3"
            >
              {link.name}
            </NavigationLink>
          </NavigationItem>
        ))}
      </ul>
    ));
  }
}
