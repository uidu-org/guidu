import { byName } from '@uidu/data-views';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Plus } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import { ViewerProps } from './types';

export default class Viewer extends Component<ViewerProps> {
  render() {
    const {
      onChange,
      onAdd,
      dataViews,
      availableViews,
      currentView,
    } = this.props;
    const { icon: Icon, color } = byName[currentView.kind];
    return (
      <DropdownMenu
        shouldFitContent
        trigger={
          <Trigger activeBg="#fee2d5" className="btn mr-2" active={false}>
            <span className="mr-2 d-flex align-items-center">
              <Icon strokeWidth={2} size={14} color={color} />
            </span>
            <span style={{ textTransform: 'initial' }}>{currentView.name}</span>
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          {dataViews.map(dataView => {
            const { icon: Icon, color } = byName[dataView.kind];
            return (
              <DropdownItem
                key={dataView.id}
                onClick={e => {
                  e.preventDefault();
                  onChange(dataView);
                }}
                elemBefore={<Icon strokeWidth={2} size={14} color={color} />}
              >
                {dataView.name}
              </DropdownItem>
            );
          })}
        </DropdownItemGroup>
        <div className="border-top mt-1 pt-1">
          <DropdownItemGroup>
            <DropdownItem
              onClick={e => {
                e.preventDefault();
                onAdd({
                  name: 'New',
                  kind: currentView.kind,
                  id: dataViews.length + 1,
                });
              }}
              elemBefore={<Plus strokeWidth={2} size={14} />}
            >
              <FormattedMessage
                id="guidu.data_controls.viewer.add"
                defaultMessage="Add view"
              />
            </DropdownItem>
          </DropdownItemGroup>
        </div>
      </DropdownMenu>
    );
  }
}
