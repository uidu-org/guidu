import { ShellHeader } from '@uidu/shell';
import React, { PureComponent } from 'react';
import ItemsRenderer from '../ItemsRenderer';
import { NavigationProps } from './types';

export default class Navigation extends PureComponent<NavigationProps> {
  static defaultProps = {
    position: 'absolute',
  };
  render() {
    const { schema, children, className, position } = this.props;

    if (!schema && !children) {
      throw 'Navigation needs either a schema or children to render';
    }

    if (schema) {
      return (
        <ShellHeader className={`px-4 ${className}`}>
          <ItemsRenderer items={schema} />
        </ShellHeader>
      );
    }

    return children;
  }
}
