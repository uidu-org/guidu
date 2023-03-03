import React from 'react';
import DashletLoader from '../../components/DashletLoader';
import CounterStateless from './CounterStateless';
import { CounterProps } from './types';

export default function Counter({ data, resultSet, ...rest }: CounterProps) {
  if (data) {
    return (
      <CounterStateless
        value={data.value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  }

  if (!resultSet) {
    return <DashletLoader />;
  }

  const value = resultSet.seriesNames().map((s) => resultSet.totalRow()[s.key]);

  return (
    <CounterStateless
      value={value[0]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}
