import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';
import Loader from '../../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default function Pie({ resultSet, config }) {
  const chart = useRef(null);
  const id = useRef(uuid());

  console.log(resultSet);
  console.log(resultSet?.series());
  console.log(resultSet?.chartPivot());

  useLayoutEffect(() => {
    if (resultSet) {
      let x = am4core.createFromConfig(
        {
          innerRadius: '40%',
          ...config,
          series: resultSet.series().map((line) => ({
            type: 'PieSeries',
            dataFields: {
              value: line.key,
              category: 'category',
            },
            propertyFields: {
              fill: 'color',
            },
            labels: {
              disabled: true,
            },
            ticks: {
              disabled: true,
            },
            name: line.title,
          })),
          numberFormat: '#a',
          data: resultSet.chartPivot(),
        },
        id.current,
        am4charts.PieChart,
      );

      chart.current = x;
    }

    return () => {
      chart.current?.dispose();
    };
  }, [resultSet, config]);

  useLayoutEffect(() => {
    if (chart.current) {
      chart.current.config = config;
    }
    return () => null;
  }, [config]);

  if (!resultSet) {
    return <Loader />;
  }

  return (
    <div className="card-body">
      <div style={{ width: '100%', height: '100%' }} id={id.current} />
    </div>
  );
}
