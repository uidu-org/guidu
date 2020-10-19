import React from 'react';
import styled from 'styled-components';

const Tf = styled.div<{ height: number }>`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  white-space: nowrap;
  height: ${({ height }) => `${height - 16}px`};
  font-size: 0.9375rem;
  border-top: 1px solid #f2f2f3;
  /* border-right: 1px solid #f2f2f3; */
  display: flex;
  align-items: center;
  font-weight: 500;
  position: relative;
  background: #fff;
`;

export default function Footer({ footerGroups, rowHeight }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: 'red',
        width: 'fit-content',
      }}
    >
      {footerGroups.map((group) => (
        <div {...group.getFooterGroupProps()}>
          {group.headers
            .filter(
              (column) => column.kind !== 'cover' && column.kind !== 'avatar',
            )
            .map((column) => (
              <Tf height={rowHeight} {...column.getFooterProps()}>
                {column.render('Footer')}
              </Tf>
            ))}
        </div>
      ))}
    </div>
  );
}
