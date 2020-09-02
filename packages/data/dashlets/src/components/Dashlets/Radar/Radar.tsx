import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';
import Loader from '../../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default function Radar({ config, resultSet }) {
  const chart = useRef(null);
  const id = useRef(uuid());

  useLayoutEffect(() => {
    if (resultSet) {
      let x = am4core.createFromConfig(
        {
          xAxes: [
            {
              type: 'CategoryAxis',
              dataFields: {
                category: 'category',
              },
              renderer: {
                grid: {
                  strokeOpacity: 0.1,
                },
              },
              fontSize: 14,
              fillOpacity: 0.6,
            },
          ],
          yAxes: [
            {
              type: 'ValueAxis',
              fontSize: 14,
              fillOpacity: 0.6,
              cursorTooltipEnabled: false,
              min: 0,
              renderer: {
                grid: {
                  strokeOpacity: 0.1,
                },
              },
            },
          ],
          series: resultSet.series().map((line) => ({
            type: 'RadarSeries',
            dataFields: {
              valueY: line.key,
              categoryX: 'category',
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
          ...config,
        },
        id.current,
        am4charts.RadarChart,
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

  return (
    <div className="card-body">
      <div style={{ width: '100%', height: '100%' }} id={id.current} />
    </div>
  );
}
