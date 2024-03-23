import { flexRender, HeaderGroup } from '@tanstack/react-table';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getPinnedStyled } from '../utils';

const Tf = styled.div.attrs<{
  $height: number;
  $width: number;
  $maxWidth?: number;
  $minWidth: number;
  $pinned?: 'left' | 'right';
  $index: number;
}>((props) => ({
  style: {
    height: `${props.$height}px`,
    width: props.$width,
    ...(props.$minWidth && { minWidth: `${props.$minWidth}px` }),
    ...(props.$maxWidth && { maxWidth: `${props.$maxWidth}px` }),
  },
}))`
  ${tw`flex items-center relative px-4 whitespace-nowrap [background:rgb(var(--body-on-primary-bg))] border-r`}
  /* height: ${({ height }) => `${height}px`}; */
  font-size: 0.9375rem;
  flex: 1 0 auto;
  ${({ $pinned, $index }) =>
    $pinned ? getPinnedStyled({ pinned: $pinned, index: $index }) : null};
`;

export default function Footer<T>({
  footerGroups,
  rowHeight,
}: {
  footerGroups: HeaderGroup<T>[];
  rowHeight: number;
}) {
  return (
    <div tw="sticky bottom-0 -mt-px [background:rgb(var(--body-on-primary-bg))] [width:max-content] z-10 min-w-full border-t">
      {footerGroups.map((group) => (
        <div tw="flex" key={group.id}>
          {group.headers
            .filter((header) => !header.column.columnDef.meta?.isPrivate)
            .map((header, index) => (
              <Tf
                key={`${header.id}-footer`}
                $height={rowHeight}
                $width={`calc(var(--col-${header?.id}-size) * 1px)`}
                $minWidth={header.column.columnDef.minSize}
                $maxWidth={header.column.columnDef.maxSize}
                $pinned={header.column.columnDef.meta?.pinned}
                $index={index}
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
