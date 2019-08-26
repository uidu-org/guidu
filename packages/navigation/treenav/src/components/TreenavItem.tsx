import { default as React, PureComponent } from 'react';
import { ChevronRight } from 'react-feather';
import { NavLink as Link } from 'react-router-dom';
import { TreenavItem as TreenavItemProps } from '../types';

export default class TreenavItem extends PureComponent<{
  item: TreenavItemProps;
}> {
  render() {
    const { item } = this.props;
    return (
      <Link
        to={item.to}
        key={item.to}
        className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
      >
        {item.name}
        <ChevronRight size={16} className="text-muted" />
      </Link>
    );
  }
}
