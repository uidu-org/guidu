import {
  Counter,
  DashletCard,
  DashletHeader,
  Pie,
  Table,
  XY,
} from '@uidu/dashlets';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import dayjs from 'dayjs';
import React from 'react';

export default function Custom() {
  return (
    <ShellMain>
      <ShellBody tw="bg-gray-50">
        <ScrollableContainer>
          <div tw="grid grid-cols-3 gap-7 p-7">
            <DashletCard>
              <Counter.ChartStateless label="This is mandatory" value={134} />
            </DashletCard>
            <DashletCard>
              <Counter.ChartStateless label="This is mandatory" value={134} />
            </DashletCard>
            <DashletCard>
              <Counter.ChartStateless label="This is mandatory" value={134} />
            </DashletCard>
            <DashletCard>
              <DashletHeader name="Foo"></DashletHeader>
              <div tw="p-7 h-96">
                <Pie.ChartStateless
                  data={[
                    { name: 'A', value: 10 },
                    { name: 'B', value: 20 },
                    { name: 'C', value: 30 },
                    { name: 'D', value: 40 },
                  ]}
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
            </DashletCard>
            <DashletCard tw="col-span-2">
              <DashletHeader name="Foo"></DashletHeader>
              <div tw="p-7 h-96">
                <XY.ChartStateless
                  data={[
                    { x: dayjs().subtract(3, 'day').format(), value: 10 },
                    { x: dayjs().subtract(2, 'days').format(), value: 20 },
                    { x: dayjs().subtract(1, 'days').format(), value: 30 },
                    { x: dayjs().subtract(0, 'days').format(), value: 40 },
                  ]}
                  config={{
                    series: [
                      {
                        type: 'LineSeries',
                        dataFields: {
                          valueY: 'value',
                          dateX: 'x',
                        },
                      },
                    ],
                  }}
                />
              </div>
            </DashletCard>
            <DashletCard tw="col-span-2">
              <DashletHeader name="Foo"></DashletHeader>
              <div tw="h-96">
                <Table.ChartStateless
                  values={[
                    {
                      x: dayjs().subtract(3, 'day').format(),
                      value: 10,
                      otherValue: 'giulia',
                    },
                    {
                      x: dayjs().subtract(2, 'days').format(),
                      value: 20,
                      otherValue: 'rita',
                    },
                    {
                      x: dayjs().subtract(1, 'days').format(),
                      value: 30,
                      otherValue: 'sara',
                    },
                    {
                      x: dayjs().subtract(0, 'days').format(),
                      value: 40,
                      otherValue: 'alice',
                    },
                  ]}
                  keys={[
                    { key: 'x', title: 'Test id' },
                    { key: 'value', title: 'Test value' },
                    { key: 'otherValue', title: 'Test value' },
                  ]}
                />
              </div>
            </DashletCard>
          </div>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
