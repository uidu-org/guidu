import Select from '@uidu/select';
import React from 'react';

export default function Series({ measures, config, setConfig }) {
  console.log(config.series);
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
                    console.log(serie);
                    if (serie.name === measure.title) {
                      return {
                        ...serie,
                        type: value,
                        dataFields: {
                          valueY: measure.name,
                          dateX: 'category',
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
                        dateX: 'category',
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
