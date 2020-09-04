import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';
import Loader from '../../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default function XY({ resultSet, config }) {
  const chart = useRef(null);
  const id = useRef(uuid());

  useLayoutEffect(() => {
    if (resultSet) {
      let x = am4core.createFromConfig(
        {
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 32,
          cursor: {
            lineY: {
              disabled: true,
            },
            lineX: {
              disabled: true,
            },
          },
          xAxes: [
            {
              type: 'DateAxis',
              dataFields: [
                {
                  date: 'category',
                },
              ],
              renderer: {
                grid: {
                  strokeOpacity: 0.04,
                },
              },
              fontSize: 14,
              fillOpacity: 0.3,
              cursorTooltipEnabled: false,
            },
          ],
          yAxes: [
            {
              type: 'ValueAxis',
              fontSize: 14,
              fillOpacity: 0.3,
              cursorTooltipEnabled: false,
              min: 0,
              renderer: {
                grid: {
                  strokeOpacity: 0.04,
                },
              },
            },
          ],
          // series: resultSet.series().map((line) => ({
          //   type: 'LineSeries',
          //   dataFields: {
          //     valueY: line.key,
          //     dateX: 'category',
          //   },
          //   strokeWidth: 1,
          //   fillOpacity: 0.6,
          //   tensionX: 0.8,
          //   name: line.title,
          //   tooltipText: `{dateX}\n[bold]{valueY}[/]`,
          // })),
          numberFormat: '#a',
          data: resultSet.chartPivot(),
          ...config,
        },
        id.current,
        am4charts.XYChart,
      );

      chart.current = x;
    }

    return () => {
      chart.current?.dispose();
    };
  }, [resultSet]);

  useLayoutEffect(() => {
    if (chart.current) {
      chart.current.config = config;
    }
    return () => null;
  }, [config]);

  if (!resultSet) {
    return <Loader />;
  }

  return <div style={{ width: '100%', height: '100%' }} id={id.current} />;
}
