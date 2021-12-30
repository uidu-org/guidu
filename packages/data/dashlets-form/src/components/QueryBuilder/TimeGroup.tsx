import DropdownMenu, { DropdownItem } from '@uidu/dropdown-menu';
import FieldDownshift from '@uidu/field-downshift';
import Select from '@uidu/select';
import React from 'react';

const Menu = ({ selectedItem, children, ref, ...rest }) => {
  return (
    <DropdownMenu
      ref={ref}
      shouldFlip
      trigger={
        <div
          className="mx-3 d-flex align-items-center justify-content-center font-weight-bold text-primary"
          style={{
            backgroundColor: selectedItem
              ? selectedItem.bg
              : 'rgb(196, 196, 196)',
          }}
        >
          {selectedItem ? selectedItem.name : 'Ciao'}
        </div>
      }
    >
      <div {...rest} style={{ padding: '0 4px 0' }}>
        {children}
      </div>
    </DropdownMenu>
  );
};

const Option = ({ item, index, isSelected, getItemProps }) => {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <DropdownItem
      key={index}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      {item.name}
    </DropdownItem>
  );
};

const DateRanges = [
  { id: 'Custom', name: 'custom' },
  { id: 'All time', name: undefined },
  { id: 'Today', name: 'Today' },
  { id: 'Yesterday', name: 'Yesterday' },
  { id: 'This week', name: 'This week' },
  { id: 'This month', name: 'This month' },
  { id: 'This quarter', name: 'This quarter' },
  { id: 'This year', name: 'This year' },
  { id: 'Last 7 days', name: 'Last 7 days' },
  { id: 'Last 30 days', name: 'Last 30 days' },
  { id: 'Last week', name: 'Last week' },
  { id: 'Last month', name: 'Last month' },
  { id: 'Last quarter', name: 'Last quarter' },
  { id: 'Last year', name: 'Last year' },
];

const TimeGroup = ({
  title,
  members = [],
  availableMembers,
  updateMethods,
}) => {
  return (
    <>
      {members.map((m) => (
        <div className="d-flex align-items-center" key={m.name}>
          <Select
            rowClassName="flex-grow-1 mr-3"
            label={title}
            name="dimension"
            options={availableMembers}
            getOptionValue={({ name }) => name}
            getOptionLabel={({ title }) => title}
            value={m.dimension.name}
            onChange={(name, value, { option }) =>
              updateMethods.update(m, { ...m, dimension: option })
            }
          />{' '}
          for{' '}
          <FieldDownshift
            layout="elementOnly"
            name="dateRange"
            options={DateRanges}
            value={m.dateRange}
            menu={Menu}
            option={Option}
            onChange={(name, value) => {
              updateMethods.update(m, {
                ...m,
                dateRange: value,
              });
            }}
          />{' '}
          by{' '}
          <FieldDownshift
            layout="elementOnly"
            name="granularity"
            options={m.dimension.granularities}
            value={m.granularity}
            menu={Menu}
            option={Option}
            getOptionValue={({ name }) => name}
            getOptionLabel={({ title }) => title}
            onChange={(name, value) => {
              updateMethods.update(m, { ...m, granularity: value });
            }}
          />
        </div>
      ))}
    </>
  );
};

export default TimeGroup;
