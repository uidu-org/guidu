import styled from 'styled-components';

export const BlockTypeMenuItem = styled.div<{
  tagName: string;
  selected?: boolean;
}>`
  ${props => (props.selected ? `${props.tagName} { color: white }` : '')};
`;
