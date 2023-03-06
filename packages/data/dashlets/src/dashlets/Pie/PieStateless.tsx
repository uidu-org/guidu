import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Series } from '@cubejs-client/core';
import { useDashboardManager } from '@uidu/dashboard-manager';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export type PieStatelessProps<T> = {
  data: T[];
  series?: Series<T>[];
  config?: am4charts.PieChart;
  dataFormatter?: (data: T[]) => T[];
};

export default function PieStateless<T>({
  data,
  series = [],
  config,
  dataFormatter = (d) => d,
}: PieStatelessProps<T>) {
  const chart = useRef<am4core.Sprite>(null);
  const id = useRef(uuid());
  const { columnDefs } = useDashboardManager();

  const mergeConfig = useCallback(
    () => ({
      innerRadius: '40%',
      ...config,
      series:
        config?.series ||
        series.map((line) => ({
          type: 'PieSeries',
          dataFields: {
            value: line.key,
            category: 'x',
          },
          propertyFields: {
            fill: 'color',
          },
          labels: {
            disabled: true,
            text: columnDefs[line.key]?.label,
          },
          ticks: {
            disabled: true,
          },
          name: line.title,
        })),
      numberFormat: '#a',
      data: dataFormatter(data),
    }),
    [config, data, dataFormatter, series, columnDefs],
  );

  useLayoutEffect(() => {
    if (data) {
      const x = am4core.createFromConfig(
        mergeConfig(),
        id.current,
        am4charts.PieChart,
      );

      chart.current = x;
    }

    return () => {
      chart.current?.dispose();
    };
  }, [data, config, mergeConfig]);

  useLayoutEffect(() => {
    if (chart.current) {
      chart.current.config = mergeConfig();
    }
    return () => null;
  }, [config, mergeConfig]);

  return (
    <div
      className="p-3"
      style={{ width: '100%', height: '100%' }}
      id={id.current}
    />
  );
}
