import React from 'react';
import CountUp from 'react-countup';
import tw, { styled } from 'twin.macro';
import { format } from '../../../utils';
import Loader from '../../Loader';
import { CounterProps } from './types';

const CounterWrapper = tw.div`relative bg-white py-5 px-4 sm:px-6 overflow-hidden flex flex-col h-full justify-center`;
const CounterIcon = tw.div`absolute bg-indigo-500 rounded-md p-3`;
const CounterLabel = styled.p(({ itemBefore }) => [
  itemBefore && tw`ml-16`,
  tw`text-sm font-medium text-gray-500 truncate`,
]);
const CounterStatWrapper = styled.p(({ itemBefore }) => [
  itemBefore && tw`ml-16`,
  tw`flex items-baseline`,
]);
const CounterStat = tw.p`text-2xl font-semibold text-gray-900`;

export default function Counter({
  formatter,
  itemBefore,
  resultSet,
  label,
}: CounterProps) {
  if (!resultSet) {
    return <Loader />;
  }

  return (
    <CounterWrapper>
      <dt>
        {itemBefore ? <CounterIcon>{itemBefore}</CounterIcon> : null}
        <CounterLabel>{label}</CounterLabel>
      </dt>
      <CounterStatWrapper>
        <CounterStat>
          <CountUp
            start={0}
            end={resultSet
              .seriesNames()
              .map((s) => resultSet.totalRow()[s.key])}
            decimals={0}
            formattingFn={(value) => format(value, formatter)}
          />
        </CounterStat>
      </CounterStatWrapper>
    </CounterWrapper>
  );
}
