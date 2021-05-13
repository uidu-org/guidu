import React from 'react';
import CountUp from 'react-countup';
import tw from 'twin.macro';
import { format } from '../../../utils';
import Loader from '../../Loader';
import { CounterProps } from './types';

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
    <div tw="relative bg-white py-5 px-4 sm:px-6 overflow-hidden flex flex-col h-full justify-center">
      <dt>
        {itemBefore ? (
          <div tw="absolute bg-indigo-500 rounded-md p-3">{itemBefore}</div>
        ) : null}
        <p
          css={[
            itemBefore && tw`ml-16`,
            tw`text-sm font-medium text-gray-500 truncate`,
          ]}
        >
          {label}
        </p>
      </dt>
      <dd css={[itemBefore && tw`ml-16`, tw`flex items-baseline`]}>
        <p tw="text-2xl font-semibold text-gray-900">
          <CountUp
            start={0}
            end={resultSet
              .seriesNames()
              .map((s) => resultSet.totalRow()[s.key])}
            decimals={0}
            formattingFn={(value) => format(value, formatter)}
          />
        </p>
      </dd>
    </div>
  );

  return (
    <div className="card-body h-100 d-flex align-items-center justify-content-center">
      <h2 className="my-0 d-flex align-items-center">
        {itemBefore && (
          <div className="d-flex flex-shrink-0 mr-3">{itemBefore}</div>
        )}
      </h2>
    </div>
  );
}
