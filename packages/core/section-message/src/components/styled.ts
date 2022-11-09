import styled from 'styled-components';
import tw from 'twin.macro';
import { Appearance } from '../types';

const containerAppearances = {
  info: tw`text-blue-800 bg-blue-50`,
  warning: tw`text-yellow-800 bg-yellow-50`,
  error: tw`text-red-800 bg-red-50`,
  confirmation: tw`text-green-800 bg-green-50`,
  change: tw`text-purple-800 bg-purple-50`,
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
  ${tw`flex items-center m-0`}
  & + &::before {
    ${tw`w-4 inline-block text-center align-middle [content:.] text-gray-300`}
  }
`;

export const IconWrapper = styled.div`
  ${tw`[flex:0_0_auto] mr-2.5`}
`;
