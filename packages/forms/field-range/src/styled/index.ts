import * as SliderPrimitive from '@radix-ui/react-slider';
import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledSlider = styled(SliderPrimitive.Root)<{
  disabled?: boolean;
}>`
  ${tw`relative flex items-center w-full h-auto select-none`}
  ${({ disabled }) =>
    disabled && tw`cursor-not-allowed pointer-events-none opacity-40`}
  &[data-orientation="horizontal"] {
    ${tw`h-8`}
  }

  &[data-orientation='vertical'] {
    ${tw`flex-col w-8 h-80`}
  }
`;
export const StyledTrack = styled(SliderPrimitive.Track)<{
  $hasError?: boolean;
}>`
  ${tw`relative flex-grow bg-gray-200 rounded-full`}
  ${({ $hasError }) =>
    $hasError &&
    tw`bg-red-400 border-red-500 focus:outline-none focus:ring-red-50 focus:border-red-400`}
  &[data-orientation='horizontal'] {
    ${tw`h-1.5`}
  }
  &[data-orientation='vertical'] {
    ${tw`w-1.5`}
  }
`;
export const StyledRange = styled(SliderPrimitive.Range)`
  ${tw`absolute h-full rounded-full bg-primary`}
`;
export const StyledThumb = styled(SliderPrimitive.Thumb)`
  ${tw`block w-4 h-4 rounded-full shadow-md bg-primary`}
`;
