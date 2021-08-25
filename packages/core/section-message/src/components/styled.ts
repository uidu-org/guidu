import styled from 'styled-components';
import tw from 'twin.macro';
import { Appearance } from '../types';

const containerAppearances = {
  info: tw`bg-blue-50 text-blue-800`,
  warning: tw`bg-yellow-50 text-yellow-800`,
  error: tw`bg-red-50 text-red-800`,
  confirmation: tw`bg-green-50 text-green-800`,
  change: tw`bg-purple-50 text-purple-800`,
};

export const Container = styled.section<{ appearance: Appearance }>`
  ${tw`flex rounded p-3.5`}
  ${({ appearance }) => containerAppearances[appearance]}
`;

export const ContentContainer = styled.div`
  ${tw`flex-grow`}
`;

export const Title = styled.h1`
  ${tw`text-lg font-semibold leading-normal`}
`;

export const Description = styled.div`
  * + & {
    ${tw`mt-1.5`}
  }
`;

export const Actions = styled.ul`
  ${tw`flex`}
  * + & {
    ${tw`mt-1.5`}
  }
`;

export const Action = styled.li`
  ${tw`m-0 flex items-center`}
  & + &::before {
    ${tw`w-4 inline-block text-center align-middle content[.] text-gray-300`}
  }
`;

export const IconWrapper = styled.div`
  ${tw`flex[0 0 auto] mr-2.5`}
`;
