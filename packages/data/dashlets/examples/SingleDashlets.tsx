import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Counter, Pie } from '../src';

function Basic({}) {
  const intl = useIntl();
  return (
    <>
      <div className="p-3">
        <h6>List</h6>
        {/* <List data={[{ key: 'foo', value: 'test' }]} loaded label="List" /> */}
      </div>
      <div tw="p-3 bg-gray-50">
        <h6>Pie</h6>
        <Pie.Chart
          data={{
            values: [
              { name: 'foo', value: 123 },
              { name: 'bar', value: 456 },
            ],
          }}
          config={{
            series: [
              {
                type: 'PieSeries',
                dataFields: {
                  value: 'value',
                  category: 'name',
                },
              },
            ],
          }}
        />
      </div>
      <div tw="p-3 bg-red-100 rounded">
        <h6>Counter</h6>
        <Counter.chart
          label="This is mandatory"
          data={{ value: 134 }}
          formattingFn={(value) =>
            intl.formatNumber(value, { style: 'currency', currency: 'EUR' })
          }
        />
      </div>
    </>
  );
}

export default () => {
  return (
    <IntlProvider locale="en">
      <Basic />
    </IntlProvider>
  );
};
