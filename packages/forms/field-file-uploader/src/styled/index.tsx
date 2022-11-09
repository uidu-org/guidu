import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledRoot = styled.div<{
  $isDragActive: boolean;
  $isDragAccept: boolean;
  $isFocused: boolean;
  $isFileDialogActive: boolean;
  $isDragReject: boolean;
  $hasError: boolean;
}>`
  ${tw`flex items-center justify-center h-40 text-gray-600 border rounded shadow-sm bg-gray-50`}
  ${({ $isDragActive }) => $isDragActive && tw`border-green-500`}
  ${({ $isDragAccept }) => $isDragAccept && tw`border-green-500`}
  ${({ $isDragReject }) => $isDragReject && tw`border-red-500`}
  ${({ $isFocused }) =>
    $isFocused && tw`[border-color:rgba(var(--brand-primary), 1)]`}
  ${tw`focus:[--tw-ring-color:rgba(var(--brand-primary), .1)] focus:ring-2 focus:[border-color:rgb(var(--brand-primary))]`}
  ${tw`focus-visible:outline-none`}
  ${({ $isFileDialogActive }) => $isFileDialogActive && tw`cursor-pointer`}
  ${({ $hasError }) =>
    $hasError &&
    tw`text-red-900 placeholder-red-400 border-red-300 focus:outline-none focus:ring-red-50 focus:border-red-400`}
`;

export const StyledPrompt = styled.div<{}>``;
