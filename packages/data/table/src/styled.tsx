import { SortDirection } from '@tanstack/react-table';
import styled from 'styled-components';
import tw, { theme } from 'twin.macro';
import { getPinnedStyled } from './utils';

export const Body = styled.div.attrs<{
  $height: number;
  $verticalPadding: number;
}>((props) => ({
  style: {
    height: `${props.$height}px`,
    minHeight: `calc(100% - ${props.$verticalPadding}px)`,
    minWidth: 'fit-content',
  },
}))`
  background: rgb(var(--body-on-primary-bg));
  ${tw`relative w-full`}
`;

export const Td = styled.div.attrs<{
  $height: number;
  $pinned?: string;
  $index: number;
  $width: number;
  $minWidth?: number;
  $maxWidth?: number;
  $isSorted: false | SortDirection;
}>((props) => ({
  style: {
    height: `${props.$height}px`,
    width: `${props.$width}px`,
    ...(props.$minWidth && { minWidth: `${props.$minWidth}px` }),
    ...(props.$maxWidth && { maxWidth: `${props.$maxWidth}px` }),
    ...(props.$isSorted ? { backgroundColor: theme`colors.yellow.50` } : {}),
  },
}))`
  font-size: 0.95rem;
  background: rgb(var(--body-on-primary-bg));
  flex: 1 0 auto;

  ${({ $pinned, $index }) =>
    $pinned ? getPinnedStyled({ pinned: $pinned, index: $index }) : null};
  ${tw`flex items-center px-4 border-b border-r border-opacity-50 whitespace-nowrap`}
`;

type ThProps = {
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
    width: `${props.$width}px`,
    ...(props.$minWidth && { minWidth: `${props.$minWidth}px` }),
    ...(props.$maxWidth && { maxWidth: `${props.$maxWidth}px` }),
    flex: '1 0 auto',
    ...(props.$isSorted ? { backgroundColor: theme`colors.yellow.50` } : {}),
  },
}))`
  background: rgb(var(--body-on-primary-bg));

  ${({ $pinned, $index }) =>
    $pinned ? getPinnedStyled({ pinned: $pinned, index: $index }) : null};
  ${tw`relative flex items-center px-4 text-left text-xs font-medium color[rgb(var(--body-secondary-color))] uppercase tracking-wider border-b border-r border-opacity-50 whitespace-nowrap`}
`;

export const StyledRow = styled.div.attrs<{ $size: number; $start: number }>(
  (props) => ({
    style: {
      height: `${props.$size}px`,
      transform: `translateY(${props.$start}px)`,
    },
  }),
)`
  ${tw`absolute top-0 left-0 cursor-pointer`}

  ${tw`flex flex-row items-center min-w-full`}

  &:hover {
    ${Th}, ${Td} {
      background: rgb(var(--body-on-primary-hover-bg));
    }
  }
`;
