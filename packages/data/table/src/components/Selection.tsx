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

export function RowSelection({ row }) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const { isSelected } = row;
  const { onChange, checked, ...rest } = row.getToggleRowSelectedProps();

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center h-100 w-100"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          row.toggleRowSelected(!isSelected);
        }}
        ref={hoverRef}
      >
        {isHovered || isSelected ? (
          <CheckboxStateless
            {...rest}
            checked={checked}
            onChange={() => {}}
            id={row.id}
          />
        ) : (
          <RowIndex>
            <span
              className="d-flex flex-column justify-content-center"
              style={{ lineHeight: 'initial', minWidth: 0 }}
            >
              <span className="text-muted">{row.index + 1}</span>
            </span>
          </RowIndex>
        )}
      </div>
    </>
  );
}

export function HeaderSelection({ getToggleAllRowsSelectedProps, ...rest }) {
  return (
    <>
      <CheckboxStateless {...getToggleAllRowsSelectedProps()} id="Foo" />
    </>
  );
}

export function AggregatedSelection({ getToggleAllRowsSelectedProps, row }) {
  const { onChange, ...rest } = row.getToggleRowSelectedProps();
  return (
    <div
      className="d-flex justify-content-center align-items-center h-100 w-100"
      onClick={onChange}
    >
      <CheckboxStateless {...getToggleAllRowsSelectedProps()} id="Foo" />
    </div>
  );
}
