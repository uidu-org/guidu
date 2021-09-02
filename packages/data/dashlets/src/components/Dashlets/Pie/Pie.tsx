import React from 'react';
import Loader from '../../Loader';
import PieStateless from './PieStateless';

export default function Pie({ data, resultSet, config }) {
  if (data) {
    return <PieStateless data={data.values} config={config} />;
  }

  if (!resultSet) {
    return <Loader />;
  }

  const dataRs = resultSet.chartPivot();
  const series = resultSet.series();

  return <PieStateless data={dataRs} config={config} series={series} />;
}
