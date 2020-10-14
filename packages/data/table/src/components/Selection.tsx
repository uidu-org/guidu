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

function useHover() {
  const [value, setValue] = useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef();

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseover', handleMouseOver);
        ref.current.removeEventListener('mouseout', handleMouseOut);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener('mouseover', handleMouseOver);
        ref.current.addEventListener('mouseout', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut],
  );

  return [callbackRef, value];
}

export function RowSelection({ row }) {
  const [hoverRef, isHovered] = useHover();

  const { isSelected } = row;
  const { onChange, ...rest } = row.getToggleRowSelectedProps();

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center h-100 w-100"
        onClick={onChange}
        ref={hoverRef}
      >
        {isHovered || isSelected ? (
          <CheckboxStateless {...rest} id={row.id} />
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
