import React from 'react';
import Loader from '../../Loader';
import PieStateless from './PieStateless';

export default function Pie({
  data,
  resultSet,
  config,
  dataFormatter = (data) => data,
}) {
  if (data) {
    return (
      <PieStateless
        data={data.values}
        config={config}
        dataFormatter={dataFormatter}
      />
    );
  }

  if (!resultSet) {
    return <Loader />;
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
