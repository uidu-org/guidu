import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default function PieStateless({ data, series = [], config }) {
  const chart = useRef(null);
  const id = useRef(uuid());

  console.log(data);
  console.log(config);
  console.log(series);

  const mergeConfig = useCallback(() => {
    return {
      innerRadius: '40%',
      ...config,
      series:
        config?.series ||
        series.map((line) => ({
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
      data,
    };
  }, [config]);

  useLayoutEffect(() => {
    if (data) {
      let x = am4core.createFromConfig(
        mergeConfig(),
        id.current,
        am4charts.PieChart,
      );

      chart.current = x;
    }

    return () => {
      chart.current?.dispose();
    };
  }, [data, config]);

  useLayoutEffect(() => {
    if (chart.current) {
      chart.current.config = mergeConfig();
    }
    return () => null;
  }, [config]);

  return (
    <div
      className="p-3"
      style={{ width: '100%', height: '100%' }}
      id={id.current}
    />
  );
}
