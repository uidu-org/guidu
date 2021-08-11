import React, { PureComponent } from 'react';
import ItemsRenderer from '../ItemsRenderer';
import { NavigationProps } from './types';

export default class SideNavigation extends PureComponent<NavigationProps> {
  static defaultProps = {
    position: 'absolute',
  };

  render() {
    const { schema, children, position } = this.props;

    if (!schema && !children) {
      throw 'Navigation needs either a schema or children to render';
    }

    if (schema) {
      return (
        <div tw="overflow-hidden flex flex-col w-full h-full absolute">
          <ItemsRenderer items={schema} />
        </div>
      );
    }

    return children;
  }
}
