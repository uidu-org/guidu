import styled from 'styled-components';
import tw from 'twin.macro';
import { getPinnedStyled } from './utils';

export const Body = styled.div<{ height: number; verticalPadding: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ verticalPadding }) => `calc(100% - ${verticalPadding}px)`};
  background: rgb(var(--body-on-primary-bg));
  ${tw`w-full relative`}
`;

export const Td = styled.div<{
  height: number;
  pinned?: string;
  index: number;
}>`
  height: ${({ height }) => `${height}px`};
  font-size: 0.95rem;
  background: rgb(var(--body-on-primary-bg));

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
  ${tw`px-4 flex items-center border-b border-r border-opacity-50 whitespace-nowrap`}
`;

export const Th = styled.div<{
  height: number;
  pinned?: string;
  index: number;
}>`
  height: ${({ height }) => `${height}px`};
  background: rgb(var(--body-on-primary-bg));

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
  ${tw`relative flex items-center px-4 text-left text-xs font-medium color[rgb(var(--body-secondary-color))] uppercase tracking-wider border-b border-r border-opacity-50 whitespace-nowrap`}
`;

export const StyledRow = styled.div<{ size: number; start: number }>`
  height: ${({ size }) => `${size}px`};
  transform: ${({ start }) => `translateY(${start}px)`};
  ${tw`absolute top-0 left-0 cursor-pointer`}

  &:hover {
    ${Th}, ${Td} {
      background: rgb(var(--body-on-primary-hover-bg));
    }
  }
`;
