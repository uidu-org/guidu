import React, { PureComponent } from 'react';
import { NavigationGroup, NavigationItem } from '..';
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
      return schema.map(node => (
        <NavigationGroup heading={node.heading}>
          {node.items.map(item => (
            <NavigationItem className="px-3" {...item}>
              {item.text}
            </NavigationItem>
          ))}
        </NavigationGroup>

        // <ul className="nav flex-column mb-4 px-3" key={node.name}>
        //   {(node.icon || node.name) && (
        //     <NavigationItem>
        //       <NavigationHeader className="px-3">
        //         {node.icon}
        //         <span>{node.name}</span>
        //       </NavigationHeader>
        //     </NavigationItem>
        //   )}
        // </ul>
      ));
    }

    return children;
  }
}
