import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { InputGroupPosition } from '../components/InputGroup/types';

// Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases
const overrideSafariDisabledStyles = css`
  -webkit-text-fill-color: unset;
  -webkit-opacity: 1;
  opacity: 1;
`;

export const StyledRow = styled.div<{ layout: string }>`
  ${tw`mb-4`}
  ${({ layout }) => layout === 'horizontal' && tw`flex`}
`;

export const StyledLabel = styled.label<{ layout: string }>`
  ${tw`block`}
  ${({ layout }) => (layout === 'horizontal' ? tw`w-3/12` : tw`mb-2`)}
`;

export const StyledAddonWrapper = styled.div<{ position: InputGroupPosition }>`
  ${tw`absolute top-px bottom-px rounded-r flex items-center [background:rgb(var(--body-on-primary-bg))]`}
  ${({ position }) => {
    if (position === 'before') {
      return tw`left-px`;
    }
    return tw`right-px`;
  }}
`;

export const StyledAddon = styled.span`
  ${tw`flex items-center h-full`}
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  /* background: transparent; */
  min-width: 0;

  [disabled] {
    ${overrideSafariDisabledStyles};
  }

  &::-ms-clear {
    display: none;
  }

  &:invalid {
    /* box-shadow: none; */
  }

  // &:-webkit-autofill::first-line {
  //   font-family: var(--font-family-sans-serif);
  //   font-size: 1rem;
  // }

  &::-webkit-inner-spin-button {
    opacity: 1;
  }

  ${tw`[background:rgb(var(--body-on-primary-bg))] shadow-sm focus:[--tw-ring-color:rgba(var(--brand-primary), .1)] focus:ring-2 focus:[border-color:rgb(var(--brand-primary))] block w-full border [border-color:rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:[background:rgba(var(--brand-subtle), .4)]`}
  ${({ $hasError }) =>
    $hasError &&
    tw`text-red-900 placeholder-red-400 border-red-300 focus:outline-none focus:ring-red-50 focus:border-red-400`}
`;
