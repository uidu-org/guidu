import { CellContext, HeaderContext } from '@tanstack/react-table';
import { CheckboxStateless } from '@uidu/checkbox';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const RowIndex = styled.span`
  line-height: initial;
  display: flex;
  align-items: center;
  white-space: normal;
  min-width: 0;
`;

const useHover = <T extends HTMLElement>(): [
  (node?: T | null) => void,
  boolean,
] => {
  const [value, setValue] = useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseEnter = useCallback(() => setValue(true), []);
  const handleMouseLeave = useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef<T>();

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback<(node?: null | T) => void>(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      ref.current = node || undefined;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter);
        ref.current.addEventListener('mouseleave', handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave],
  );

  return [callbackRef, value];
};

export function RowSelection<T>({ row }: CellContext<T, unknown>) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const { getIsSelected, toggleSelected } = row;
  const isSelected = getIsSelected();

  return (
    <div
      tw="flex justify-center items-center h-full w-full relative"
      ref={hoverRef}
    >
      {isHovered || isSelected ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSelected(!isSelected);
            }}
            tw="absolute inset-0 z-20 w-full"
          />
          <CheckboxStateless
            checked={isSelected}
            onChange={() => toggleSelected(!isSelected)}
            id={row.id}
          />
        </>
      ) : (
        <RowIndex>
          <span tw="flex flex-col justify-center min-w-0 [line-height:initial]">
            <span tw="[color:rgb(var(--body-secondary-color))] text-sm">
              {row.index + 1}
            </span>
          </span>
        </RowIndex>
      )}
    </div>
  );
}

export function HeaderSelection<T>({
  table: {
    getToggleAllRowsSelectedHandler,
    toggleAllRowsSelected,
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
  },
}: HeaderContext<T, unknown>) {
  return (
    <div tw="flex justify-center items-center h-full w-full relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleAllRowsSelected(!getIsAllRowsSelected());
        }}
        tw="absolute inset-0"
      />
      <CheckboxStateless
        onChange={getToggleAllRowsSelectedHandler()}
        checked={getIsAllRowsSelected()}
        isIndeterminate={getIsSomeRowsSelected()}
      />
    </div>
  );
}

export function AggregatedSelection<T>({ table }: CellContext<T, unknown>) {
  const {
    getToggleAllRowsSelectedHandler,
    toggleAllRowsSelected,
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
  } = table;
  return (
    <div tw="flex justify-center items-center h-full w-full relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleAllRowsSelected(!getIsAllRowsSelected());
        }}
        tw="absolute inset-0"
      />
      <CheckboxStateless
        onChange={getToggleAllRowsSelectedHandler()}
        checked={getIsAllRowsSelected()}
        isIndeterminate={getIsSomeRowsSelected()}
      />
    </div>
  );
}
