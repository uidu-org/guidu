import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledMenuGroup = styled.div<{
  maxWidth: number | string;
  minWidth: number | string;
  maxHeight: number | string;
  minHeight: number | string;
}>`
  ${tw`flex flex-col overflow-auto`}
  ${({ maxWidth }) => `max-width: ${maxWidth}`}
  ${({ minWidth }) => `min-width: ${minWidth}`}
  ${({ maxHeight }) => `max-height: ${maxHeight}`}
  ${({ minHeight }) => `min-height: ${minHeight}`}
`;

export const StyledSection = styled.div<{
  isScrollable?: boolean;
  hasSeparator?: boolean;
}>`
  &:before,
  &:after {
    content: '';
    display: block;
    height: 0.75rem;
  }
  /**
  NOTE: Firefox allows elements that have "overflow: auto" to gain focus (as if it had tab-index="0")
  We have made a deliberate choice to leave this behaviour as is.
  This makes the outline go inside by 1px so it can actually be displayed
  else it gets cut off from the overflow: scroll from the parent menu group
  */
  &:focus {
    outlineoffset: -1px;
  }
  & [data-ds--menu--heading-item] {
    &:first-of-type {
      ${tw`mt-3`}
    }
    ${tw`my-3`}
  }
  & [data-ds--menu--skeleton-heading-item] {
    &:first-of-type {
      ${tw`mt-3`}
    }
    ${tw`my-3`}
  }
  ${({ isScrollable }) => {
    if (isScrollable) {
      return tw`flex-shrink[1] overflow-auto`;
    }
    return tw`flex-shrink`;
  }}
  ${({ hasSeparator }) => {
    if (hasSeparator) {
      return tw`border-t`;
    }
    return tw`[[data-section] + &]:mt-0`;
  }}
`;
