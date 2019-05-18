import React, { PureComponent } from 'react';
import ItemsRenderer from '../ItemsRenderer';
import { NavigationProps } from './types';

export default class Navigation extends PureComponent<NavigationProps> {
  render() {
    const { schema, children } = this.props;

    if (!schema && !children) {
      throw 'Navigation needs either a schema or children to render';
    }

    if (schema) {
      return (
        <div
          className="position-absolute w-100 d-flex flex-column h-100"
          style={{ overflow: 'hidden' }}
        >
          <ItemsRenderer items={schema} />
        </div>
      );
    }

    return children;
  }
}
