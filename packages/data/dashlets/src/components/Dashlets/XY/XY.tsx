import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';
import Loader from '../../Loader';

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color('#6366F1'),
      am4core.color('#3B82F6'),
      am4core.color('#10B981'),
      am4core.color('#F59E0B'),
      am4core.color('#EF4444'),
      am4core.color('#6B7280'),
    ];
  }
}

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_myTheme);
// am4core.options.queue = true;
am4core.options.commercialLicense = true;

export default function XY({ resultSet, config }) {
  const chart = useRef(null);
  const id = useRef(uuid());

  const mergeConfig = useCallback(() => {
    return {
      paddingBottom: 15,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
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
            baseGrid: {
              disabled: true,
            },
            line: {
              disabled: true,
            },
            grid: {
              strokeOpacity: 0.04,
            },
          },
          fontSize: 12,
          fillOpacity: 0.3,
          cursorTooltipEnabled: false,
        },
      ],
      yAxes: [
        {
          type: 'ValueAxis',
          fontSize: 12,
          fillOpacity: 0.3,
          cursorTooltipEnabled: false,
          min: 0,
          renderer: {
            baseGrid: {
              disabled: true,
            },
            // inside: true,
            maxLabelPosition: 0.99,
            labels: {
              // template: {
              //   dy: -20,
              //   dx: 15,
              // },
            },
            grid: {
              strokeOpacity: 0.04,
            },
          },
        },
      ],
      numberFormat: '#a',
      data: resultSet.chartPivot(),
      ...config,
      series:
        config?.series ||
        resultSet.series().map((line) => ({
          type: 'StepLineSeries',
          dataFields: {
            valueY: line.key,
            dateX: 'category',
          },
          strokeWidth: 1,
          fillOpacity: 1,
          tensionX: 0.6,
          name: line.title,
          tooltipText: `{dateX}\n[bold]{valueY}[/]`,
        })),
    };
  }, [config]);

  useLayoutEffect(() => {
    if (resultSet) {
      let x = am4core.createFromConfig(
        mergeConfig(),
        id.current,
        am4charts.XYChart,
      );

      chart.current = x;
    }

    return () => {
      chart.current?.dispose();
    };
  }, [resultSet, config]);

  useLayoutEffect(() => {
    if (chart.current) {
      console.log(mergeConfig());
      chart.current.config = mergeConfig();
    }
    return () => null;
  }, [config]);

  if (!resultSet) {
    return <Loader />;
  }

  return (
    <div
      className="px-3"
      style={{ width: '100%', height: '100%' }}
      id={id.current}
    />
  );
}
