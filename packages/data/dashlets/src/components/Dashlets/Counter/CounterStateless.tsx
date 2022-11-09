import React from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import tw from 'twin.macro';
import { format } from '../../../utils';
import { CounterStatelessProps } from './types';

const CounterWrapper = styled.div`
  ${tw`relative flex flex-col justify-center h-full px-4 py-5 overflow-hidden sm:px-6`}
`;
const CounterLabel = styled.div<{ itemBefore: any }>`
  ${({ itemBefore }) => !!itemBefore && tw`ml-16`}
  ${tw`text-sm font-medium truncate [color:rgb(var(--body-secondary-color))]`}
`;
const CounterStatWrapper = styled.div<{ itemBefore: any }>`
  ${({ itemBefore }) => !!itemBefore && tw`ml-16`}
  ${tw`flex items-baseline`}
`;
const CounterStat = styled.div`
  ${tw`text-2xl font-semibold [color:rgb(var(--body-primary-color))]`}
`;

export default function CounterStateless({
  formattingFn,
  formatter,
  itemBefore,
  value,
  label,
}: CounterStatelessProps) {
  return (
    <CounterWrapper>
      <dt>
        {itemBefore ? itemBefore : null}
        <CounterLabel itemBefore={itemBefore}>{label}</CounterLabel>
      </dt>
      <CounterStatWrapper itemBefore={itemBefore}>
        <CounterStat>
          <CountUp
            start={0}
            end={value}
            decimals={0}
            formattingFn={(value) =>
              formattingFn ? formattingFn(value) : format(value, formatter)
            }
          />
        </CounterStat>
      </CounterStatWrapper>
    </CounterWrapper>
  );
}
