import Select from '@uidu/select';
import React from 'react';

// series: [
//   {
//     dataFields: {
//       valueY: measure.id,
//       dateX: 'x',
//     },
//     strokeWidth: 1,
//     fillOpacity: 0.6,
//     tensionX: 0.8,
//     name: measure.name,
//     tooltipText: `{dateX}\n[bold]{valueY}[/]`,
//   },
// ],

export default function Series({ measures, config, setConfig }) {
  return (
    <div className="form-group">
      <label htmlFor="">Series</label>
      <div>
        {measures.map((measure) => (
          <>
            {measure.title}
            <Select
              name="foo"
              options={[
                { id: 'ColumnSeries', name: 'ColumnSeries' },
                { id: 'LineSeries', name: 'LineSeries' },
              ]}
              onChange={(name, value) => {
                setConfig({
                  ...config,
                  series: (config.series || []).map((serie) => {
                    if (serie.name === measure.title) {
                      return {
                        ...serie,
                        type: value,
                        dataFields: {
                          valueY: measure.name,
                          dateX: 'x',
                        },
                        columns: {
                          tooltipText: `{dateX}\n[bold]{valueY}[/]`,
                        },
                        strokeWidth: 1,
                        fillOpacity: 0.6,
                        tensionX: 0.8,
                        name: measure.title,
                      };
                    }
                    return {
                      ...serie,
                      dataFields: {
                        valueY: measure.name,
                        dateX: 'x',
                      },
                      strokeWidth: 1,
                      fillOpacity: 0.6,
                      tensionX: 0.8,
                      name: measure.title,
                      tooltipText: `{dateX}\n[bold]{valueY}[/]`,
                    };
                  }),
                });
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
}
