import React from 'react';
import Loader from '../../Loader';
import CounterStateless from './CounterStateless';
import { CounterProps } from './types';

export default function Counter({ data, resultSet, ...rest }: CounterProps) {
  if (data) {
    return <CounterStateless value={data.value} {...rest} />;
  }

  if (!resultSet) {
    return <Loader />;
  }

  const value = resultSet.seriesNames().map((s) => resultSet.totalRow()[s.key]);

  return <CounterStateless value={value[0]} {...rest} />;
}
