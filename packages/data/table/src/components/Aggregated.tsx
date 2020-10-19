import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React from 'react';

export default function Aggregated(params) {
  const { setAggregation, column, value } = params;

  if (!column.aggregate) return null;

  return (
    <>
      <DropdownMenu
        position="left"
        trigger={
          <div>
            {column.aggregate}:{' '}
            {column.valueFormatter ? (
              <>{column.valueFormatter({ value })}</>
            ) : (
              value || null
            )}
          </div>
        }
        boundariesElement="window"
      >
        <DropdownItemGroup>
          <DropdownItem onClick={() => setAggregation(params.column, 'sum')}>
            Sum
          </DropdownItem>
          <DropdownItem
            onClick={() => setAggregation(params.column, 'average')}
          >
            Average
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </>
  );
}
