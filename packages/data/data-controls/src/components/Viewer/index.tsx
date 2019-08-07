import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { AlignJustify, Calendar, Grid, List } from 'react-feather';
import { Trigger } from '../../styled';

const viewIcons = {
  calendar: <Calendar strokeWidth={2} size={14} color="#A3BE8C" />,
  gallery: <Grid strokeWidth={2} size={14} color="#EBCB8B" />,
  list: <List strokeWidth={2} size={14} color="#D08770" />,
  table: <AlignJustify strokeWidth={1} size={14} color="#BF616A" />,
};

export default class Viewer extends Component<any> {
  render() {
    const {
      onChange,
      onAdd,
      dataViews,
      availableViews,
      currentView,
    } = this.props;
    return (
      <DropdownMenu
        shouldFitContent
        trigger={
          <Trigger activeBg="#fee2d5" className="btn pr-5 mr-3" active={false}>
            <span className="mr-2 d-flex align-items-center">
              {viewIcons[currentView.kind]}
            </span>
            <span style={{ textTransform: 'initial' }}>{currentView.name}</span>
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          {dataViews.map(dataView => (
            <DropdownItem
              key={dataView.id}
              onClick={e => {
                e.preventDefault();
                onChange(dataView);
              }}
              elemBefore={viewIcons[dataView.kind]}
            >
              {dataView.name}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
        <div className="border-top p-2 mt-2">
          <DropdownItemGroup className="d-flex" title="Aggiungi">
            {availableViews.map(availableView => (
              <DropdownItem
                key={availableView}
                onClick={e => {
                  e.preventDefault();
                  onAdd(availableView);
                }}
                elemBefore={viewIcons[availableView]}
              >
                {availableView}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </div>
      </DropdownMenu>
    );
  }
}
