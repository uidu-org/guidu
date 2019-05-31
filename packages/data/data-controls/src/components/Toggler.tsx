import { ToggleStateless } from '@uidu/toggle';
import React, { Component } from 'react';
import { EyeOff, MoreVertical } from 'react-feather';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Trigger } from '../styled';
import DropdownMenu from '../utils/DropdownMenu';

const SortableItem = SortableElement(({ value: column, onToggle }) => (
  <div
    key={column.colId}
    className="d-flex align-items-center"
    role="button"
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      onToggle(column.colId, !!column.hide);
    }}
  >
    <div className="d-flex align-items-center flex-grow-1">
      <ToggleStateless
        isChecked={!column.hide}
        className="mr-2"
        size="xsmall"
      />
      <div style={{ maxWidth: 160 }} className="text-truncate">
        {column.headerComponentParams &&
        column.headerComponentParams.menuIcon ? (
          <small className="mx-2">
            {column.headerComponentParams.menuIcon}
          </small>
        ) : null}
        {column.headerName}
      </div>
    </div>
    <div>
      <MoreVertical size={12} />
      <MoreVertical size={12} className="ml-n2" />
    </div>
  </div>
));

const SortableList = SortableContainer(({ items, onToggle, api }) =>
  items
    .filter(f => !f.pinned)
    .map((item, index) => (
      <SortableItem
        key={`item-${item.colId}`}
        api={api}
        index={index}
        value={item}
        onToggle={onToggle}
      />
    )),
);

export default class Toggler extends Component<any> {
  render() {
    const { fields, onSortEnd, onToggle, api } = this.props;
    const hiddenCount = fields.filter(f => f.hide).length;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" active={!!hiddenCount} className="btn">
            <EyeOff strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              {hiddenCount ? `${hiddenCount} fields hidden` : 'Hide fields'}
            </span>
          </Trigger>
        }
      >
        <div className="p-3">
          <input
            type="search"
            className="form-control form-control-sm bg-light border-0 mb-2"
            placeholder="Cerca tra le colonne"
          />
          <SortableList
            items={fields}
            // onSortEnd={onSortEnd}
            onToggle={onToggle}
            // useDragHandle
            helperClass="sortableHelper"
            hideSortableGhost={false}
          />
          <div className="row mt-2 mb-n2">
            <div className="col-sm-6">
              <button
                className="btn btn-sm btn-block text-nowrap bg-light"
                type="button"
              >
                Hide all
              </button>
            </div>
            <div className="col-sm-6">
              <button
                className="btn btn-sm btn-block text-nowrap bg-light"
                type="button"
              >
                Show all
              </button>
            </div>
          </div>
        </div>
      </DropdownMenu>
    );
  }
}
