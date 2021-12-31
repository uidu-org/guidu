import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Tf = styled.div<{ height: number }>`
  ${tw`flex items-center relative px-6 whitespace-nowrap border-t background[rgb(var(--body-on-primary-bg))]`}
  height: ${({ height }) => `${height - 16}px`};
  font-size: 0.9375rem;
  font-weight: 500;
`;

export default function Footer({ footerGroups, rowHeight }) {
  return (
    <div tw="sticky bottom-0 -mt-px background[rgb(var(--body-on-primary-bg))] width[max-content] z-10 min-w-full">
      {footerGroups.map((group) => (
        <div {...group.getFooterGroupProps()}>
          {group.headers
            .filter((column) => !column.isPrivate)
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
