import { SortDirection } from '@tanstack/react-table';
import styled, { css } from 'styled-components';
import tw, { theme } from 'twin.macro';
import { getPinnedStyled } from './utils';

export const Body = styled.div.attrs<{
  $height: number;
  $verticalPadding: number;
}>((props) => ({
  style: {
    minWidth: 'fit-content',
  },
}))`
  background: rgb(var(--body-on-primary-bg));
  ${tw`relative w-full flex-grow`}
`;

export type StyledTdProps = {
  $height: number;
  $pinned?: string;
  $index: number;
  $width: number;
  $minWidth?: number;
  $maxWidth?: number;
  $isSorted: false | SortDirection;
  $isSelected: boolean;
  $isSelectable: boolean;
};

export const Td = styled.div.attrs<StyledTdProps>((props) => ({
  style: {
    height: `${props.$height}px`,
    width: props.$width,
    ...(props.$minWidth && { minWidth: `${props.$minWidth}px` }),
    ...(props.$maxWidth && { maxWidth: `${props.$maxWidth}px` }),
    ...(props.$isSorted ? { backgroundColor: theme`colors.yellow.50` } : {}),
  },
}))`
  font-size: 0.95rem;
  background: rgb(var(--body-on-primary-bg));
  flex: 1 0 auto;
  position: relative;

  ${({ $isSelected }) => {
    if ($isSelected) {
      return tw`border border-primary`;
    }
    return tw``;
  }}

  ${tw`outline-none`}

  ${({ $pinned, $index }) =>
    $pinned ? getPinnedStyled({ pinned: $pinned, index: $index }) : null};
  ${tw`flex items-center px-4 border-b border-r border-opacity-50 whitespace-nowrap`}
`;

export type ThProps = {
  $height: number;
  $width: number;
  $minWidth?: number;
  $maxWidth?: number;
  $pinned?: string;
  $index: number;
  $isSorted?: boolean;
};

export const Th = styled.div.attrs<ThProps>((props: ThProps) => ({
  style: {
    height: `${props.$height}px`,
    width: props.$width,
    ...(props.$minWidth && { minWidth: `${props.$minWidth}px` }),
    ...(props.$maxWidth && { maxWidth: `${props.$maxWidth}px` }),
    flex: '1 0 auto',
    // ...(props.$isSorted ? { backgroundColor: theme`colors.yellow.50` } : {}),
  },
}))`
  font-size: 0.95rem;
  background: rgb(var(--body-on-primary-bg));

  ${({ $pinned, $index }) =>
    $pinned ? getPinnedStyled({ pinned: $pinned, index: $index }) : null};
  ${tw`relative flex items-center px-4 text-left [color:rgb(var(--body-secondary-color))] border-b border-r border-opacity-50 whitespace-nowrap`}
`;

export const StyledRow = styled.div.attrs<{
  $size: number;
  $onItemClick?: boolean;
}>((props) => ({
  style: {
    height: `${props.$size}px`,
  },
}))`
  ${tw`cursor-pointer [width:fit-content]`}

  ${tw`flex flex-row items-center min-w-full`}
  ${({ $onItemClick }) => {
    if ($onItemClick) {
      return css`
        &:hover {
          ${Th}, ${Td} {
            background: rgb(var(--body-on-primary-hover-bg));
          }
        }
      `;
    }
    return css``;
  }}
`;
