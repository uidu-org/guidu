import React from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import tw from 'twin.macro';
import { format } from '../../../utils';
import { CounterStatelessProps } from './types';

const CounterWrapper = styled.div`
  ${tw`relative bg-white py-5 px-4 sm:px-6 overflow-hidden flex flex-col h-full justify-center`}
`;
const CounterIcon = styled.div`
  ${tw`absolute bg-indigo-500 rounded-md p-3`}
`;
const CounterLabel = styled.p<{ itemBefore: any }>`
  ${({ itemBefore }) => !!itemBefore && tw`ml-16`}
  ${tw`text-sm font-medium text-gray-500 truncate`}
`;
const CounterStatWrapper = styled.p<{ itemBefore: any }>`
  ${({ itemBefore }) => !!itemBefore && tw`ml-16`}
  ${tw`flex items-baseline`}
`;
const CounterStat = styled.p`
  ${tw`text-2xl font-semibold text-gray-900`}
`;

export default function CounterStateless({
  formatter,
  itemBefore,
  value,
  label,
}: CounterStatelessProps) {
  return (
    <CounterWrapper>
      <dt>
        {itemBefore ? <CounterIcon>{itemBefore}</CounterIcon> : null}
        <CounterLabel itemBefore={itemBefore}>{label}</CounterLabel>
      </dt>
      <CounterStatWrapper itemBefore={itemBefore}>
        <CounterStat>
          <CountUp
            start={0}
            end={value}
            decimals={0}
            formattingFn={(value) => format(value, formatter)}
          />
        </CounterStat>
      </CounterStatWrapper>
    </CounterWrapper>
  );
}
