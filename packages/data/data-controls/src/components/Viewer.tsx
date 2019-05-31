import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { AlignJustify, Calendar, Grid, List } from 'react-feather';
import { Trigger } from '../styled';

const viewIcons = {
  calendar: (
    <Calendar strokeWidth={2} size={14} className="mr-2" color="#A3BE8C" />
  ),
  gallery: <Grid strokeWidth={2} size={14} className="mr-2" color="#EBCB8B" />,
  list: <List strokeWidth={2} size={14} className="mr-2" color="#D08770" />,
  table: (
    <AlignJustify strokeWidth={1} size={14} className="mr-2" color="#BF616A" />
  ),
};

export default class Viewer extends Component<any> {
  render() {
    const { onChange, availableViews, currentView } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn pr-5 mr-3" active={false}>
            {viewIcons[currentView.kind]}
            <span style={{ textTransform: 'initial' }}>{currentView.kind}</span>
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          {availableViews.map(availableView => (
            <DropdownItem
              key={availableView}
              onClick={e => {
                e.preventDefault();
                onChange({
                  kind: availableView,
                });
              }}
            >
              {viewIcons[availableView]}
              {availableView}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
