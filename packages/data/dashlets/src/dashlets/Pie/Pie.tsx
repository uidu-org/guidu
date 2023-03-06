import { ResultSet } from '@cubejs-client/core';
import React from 'react';
import DashletLoader from '../../components/DashletLoader';
import PieStateless from './PieStateless';

export default function Pie<T>({
  data,
  resultSet,
  config,
  dataFormatter = (d) => d,
}: {
  data?: {
    values: T[];
  };
  resultSet?: ResultSet;
  config?: any;
  dataFormatter?: (data: T[]) => T[];
}) {
  if (data) {
    return (
      <PieStateless<T>
        data={data.values}
        config={config}
        dataFormatter={dataFormatter}
      />
    );
  }

  if (!resultSet) {
    return <DashletLoader />;
  }

  const dataRs = resultSet.chartPivot();
  const series = resultSet.series();

  return (
    <PieStateless
      data={dataRs}
      config={config}
      series={series}
      dataFormatter={dataFormatter}
    />
  );
}
