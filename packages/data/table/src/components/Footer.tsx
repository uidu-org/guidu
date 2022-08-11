import { flexRender, HeaderGroup } from '@tanstack/react-table';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Tf = styled.div<{ height: number }>`
  ${tw`flex items-center relative px-6 whitespace-nowrap border-t background[rgb(var(--body-on-primary-bg))]`}
  height: ${({ height }) => `${height - 16}px`};
  font-size: 0.9375rem;
  font-weight: 500;
`;

export default function Footer<T>({
  footerGroups,
  rowHeight,
}: {
  footerGroups: HeaderGroup<T>[];
  rowHeight: number;
}) {
  return (
    <div tw="sticky bottom-0 -mt-px background[rgb(var(--body-on-primary-bg))] width[max-content] z-10 min-w-full">
      {footerGroups.map((group) => (
        <div tw="flex">
          {group.headers
            .filter((header) => !header.column.columnDef.meta?.isPrivate)
            .map((header) => (
              <Tf
                height={rowHeight}
                style={{
                  width: header.getSize(),
                  flex: '1 0 auto',
                }}
              >
                {flexRender(
                  header.column.columnDef.footer,
                  header.getContext(),
                )}
              </Tf>
            ))}
        </div>
      ))}
    </div>
  );
}
