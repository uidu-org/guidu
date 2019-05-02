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
      return <ItemsRenderer items={schema} />;
    }

    return children;
  }
}
