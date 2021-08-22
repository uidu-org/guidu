import React from 'react';
import Loader from '../../Loader';
import XYStateless from './XYStateless';

export default function XY({ resultSet, config, data }) {
  if (data) {
    return <XYStateless data={data.values} config={config} />;
  }

  if (!resultSet) {
    return <Loader />;
  }

  const dataRs = resultSet.chartPivot();
  const series = resultSet.series();

  return <XYStateless data={dataRs} config={config} series={series} />;
}
