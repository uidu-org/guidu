import styled from 'styled-components';
import tw from 'twin.macro';

export const BaseItemContent = styled.div`
  ${tw`flex items-center w-full min-height[fit-content]`}
`;

export const BaseItemWrapper = styled.div<{
  isDisabled?: boolean;
  isSelected?: boolean;
}>`
  ${tw`cursor-pointer flex user-select[none] text-base px-5 py-2 color[rgb(var(--body-primary-color))]`}
  ${tw`w-full m-0 border-0 outline-none`}
  ${({ isSelected }) =>
    isSelected
      ? tw`background[rgb(var(--brand-primary), .1)]`
      : tw`background[rgb(var(--body-primary-bg))]`}
  ${tw`hover:(background[rgb(var(--brand-primary), .1)] color[rgb(var(--body-primary-color))])`}
  ${tw`focus:outline-none`}
  ${tw`visited:(bg-opacity-20)`}
  ${tw`active:(bg-primary bg-opacity-20)`}
`;
