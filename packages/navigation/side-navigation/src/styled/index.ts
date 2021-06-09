import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledNavigationItem = styled.li.attrs(({ className }) => ({
  className: `nav-item${className ? ` ${className}` : ''}`,
}))`
  width: 100%;
`;

export const StyledNavigationBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.75rem;
  ${tw`mr-3`}
`;

export const StyledNavigationText = styled.div<{
  $isActionOpen: boolean;
  $actionsCount: number;
}>`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: ${({ $isActionOpen, $actionsCount }) =>
    $isActionOpen ? `${$actionsCount * 2}rem` : 0};
`;

export const StyledNavigationAfter = styled.div``;
