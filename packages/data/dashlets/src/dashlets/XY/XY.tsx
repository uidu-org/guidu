import { ResultSet } from '@cubejs-client/core';
import React from 'react';
import DashletLoader from '../../components/DashletLoader';
import XYStateless from './XYStateless';

export default function XY<T>({
  resultSet,
  config,
  data,
  dataFormatter = (d) => d,
}: {
  resultSet?: ResultSet;
  config?: any;
  data?: {
    values: T[];
  };
  dataFormatter: (data: T[]) => T[];
}) {
  if (data) {
    return (
      <XYStateless
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
    <XYStateless
      data={dataRs}
      config={config}
      series={series}
      dataFormatter={dataFormatter}
    />
  );
}
