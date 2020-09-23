import { More, Shuffle } from '@uidu/dashboard-controls';
import { colors } from '@uidu/dashlets';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { UserCheck } from 'react-feather';
import { IntlProvider } from 'react-intl';
import DashboardManager from '../src';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { isEditing } = this.state;

    return (
      <IntlProvider locale="en">
        <DashboardManager
          gridProps={{
            isDraggable: isEditing,
            isResizable: isEditing,
            onLayoutChange: console.log,
          }}
        >
          {({ renderControls, renderDashlets }) => (
            <>
              <ShellMain>
                <ShellHeader className="border-bottom px-xl-4 px-3 d-flex align-items-center">
                  {/* {renderControls({})} */}
                  <h5 className="my-0 mr-2">Dashboard</h5>
                  <Shuffle
                    active={isEditing}
                    onClick={(e) => {
                      this.setState({
                        isEditing: !isEditing,
                      });
                    }}
                  />
                  <More />
                </ShellHeader>
                <ShellBody>
                  <ScrollableContainer>
                    <div className="container px-0">
                      <h5 className="my-5">Dashboard</h5>
                      <div className="row">
                        <div className="col-12">
                          {renderDashlets({
                            dashlets: [
                              {
                                kind: 'XY',
                                label: 'Raccolta',
                                description: 'Donations amount by time',
                                query: {
                                  measures: ['Donations.amount'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                      granularity: 'month',
                                      dateRange: 'This year',
                                    },
                                  ],
                                  filters: [],
                                },
                                layout: {
                                  x: 0,
                                  y: 0,
                                  w: 12,
                                  h: 10,
                                },
                                config: {
                                  series: [
                                    {
                                      type: 'ColumnSeries',
                                      dataFields: {
                                        valueY: 'Donations.amount',
                                        dateX: 'category',
                                      },
                                      name: 'Total donations received',
                                    },
                                    {
                                      type: 'ColumnSeries',
                                      dataFields: {
                                        valueY: 'Donations.amount',
                                        dateX: 'category',
                                      },
                                      name: 'Total donations received',
                                    },
                                  ],
                                  // colors: {
                                  //   list: colors,
                                  // },
                                },
                                // isCard: false,
                              },
                              {
                                kind: 'XY',
                                label: 'Raccolta',
                                query: {
                                  measures: ['Donations.count'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                      granularity: 'month',
                                    },
                                  ],
                                  filters: [],
                                },
                                color: colors[1],
                                layout: {
                                  x: 0,
                                  y: 4,
                                  w: 12,
                                  h: 10,
                                },
                                // isCard: false,
                              },
                              {
                                kind: 'HorizontalRule',
                                layout: {
                                  x: 0,
                                  w: 12,
                                  h: 1,
                                  y: 4,
                                },
                              },
                              {
                                kind: 'Counter',
                                label: 'counter',
                                layout: {
                                  x: 0,
                                  y: 2,
                                  w: 4,
                                  h: 4,
                                },
                                query: {
                                  measures: ['DonationCampaigns.count'],
                                  timeDimensions: [
                                    {
                                      dimension: 'DonationCampaigns.createdAt',
                                    },
                                  ],
                                  filters: [],
                                },
                              },
                              {
                                kind: 'Counter',
                                itemBefore: <UserCheck />,
                                label: 'counter',
                                layout: { x: 4, y: 2, w: 4, h: 4 },
                                query: {
                                  measures: ['Donations.count'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                    },
                                  ],
                                  filters: [],
                                },
                              },
                              {
                                kind: 'Counter',
                                label: 'counter',
                                layout: { x: 8, y: 2, w: 4, h: 4 },
                                query: {
                                  measures: ['DonationCampaigns.count'],
                                  timeDimensions: [
                                    {
                                      dimension: 'DonationCampaigns.createdAt',
                                    },
                                  ],
                                  filters: [],
                                },
                              },
                              {
                                kind: 'Pie',
                                label: 'Metodo di pagamento',
                                query: {
                                  dimensions: ['Donations.paymentMethod'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                    },
                                  ],
                                  measures: ['Donations.count'],
                                  filters: [],
                                },
                                layout: { x: 0, y: 4, w: 8, h: 8 },
                              },
                              {
                                kind: 'DashletGroup',
                                layout: { x: 8, y: 4, w: 4, h: 8 },
                                dashlets: [
                                  {
                                    kind: 'Counter',
                                    label: 'counter',
                                    layout: { x: 0, y: 2, w: 4, h: 4 },
                                    rollup: ['sum', 'amount'],
                                    formatter: 'currency',
                                  },
                                  {
                                    kind: 'Counter',
                                    itemBefore: <UserCheck />,
                                    label: 'counter',
                                    layout: { x: 4, y: 2, w: 4, h: 4 },
                                    rollup: ['count', 'id'],
                                    formatter: 'integer',
                                  },
                                  {
                                    kind: 'Counter',
                                    namespace: 'donations',
                                    label: 'counter',
                                    layout: { x: 8, y: 2, w: 4, h: 4 },
                                    rollup: ['count', 'contact.id'],
                                    formatter: 'integer',
                                  },
                                ],
                              },
                              {
                                label: 'Top donations',
                                kind: 'List',
                                layout: { x: 0, y: 4, w: 6, h: 4 },
                                query: {
                                  dimensions: ['Contacts.email'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                    },
                                  ],
                                  measures: ['Donations.max'],
                                  filters: [],
                                  limit: 10,
                                },
                              },
                              {
                                label: 'Average donations',
                                kind: 'List',
                                layout: { x: 0, y: 4, w: 6, h: 4 },
                                query: {
                                  dimensions: ['DonationCampaigns.name'],
                                  measures: ['Donations.average'],
                                  filters: [],
                                  limit: 10,
                                },
                              },
                              {
                                label: 'Top donors',
                                kind: 'List',
                                layout: { x: 2, y: 4, w: 6, h: 4 },
                                groupBy: 'contact.id',
                                rollup: ['sum', 'amount'],
                                formatter: 'currency',
                              },
                              {
                                label: 'Top donations',
                                namespace: 'donations',
                                kind: 'List',
                                layout: { x: 0, y: 7, w: 6, h: 3 },
                                rollup: ['max', 'amount'],
                                formatter: 'currency',
                              },
                              {
                                kind: 'Bar',
                                namespace: 'donations',
                                layout: { x: 0, y: 11, w: 12, h: 3 },
                                groupBy: 'donationCampaignId',
                                bars: [
                                  {
                                    label: 'Raccolta',
                                    name: 'donationsAmount',
                                    rollup: ['sum', 'amount'],
                                    formatter: 'currency',
                                    xAxisId: 'right',
                                  },
                                  {
                                    label: 'Donazioni',
                                    name: 'donationsCount',
                                    rollup: ['count', 'id'],
                                    formatter: 'integer',
                                  },
                                  {
                                    label: 'Donatori',
                                    name: 'donorsCount',
                                    rollup: ['count', 'contact.id'],
                                    formatter: 'integer',
                                  },
                                  {
                                    label: 'Media donazione',
                                    name: 'donationsAverage',
                                    rollup: ['mean', 'amount'],
                                    formatter: 'currency',
                                    xAxisId: 'right',
                                  },
                                ],
                              },
                              {
                                kind: 'Radar',
                                query: {
                                  dimensions: ['Donations.paymentMethod'],
                                  timeDimensions: [
                                    {
                                      dimension: 'Donations.createdAt',
                                    },
                                  ],
                                  measures: ['Donations.count'],
                                  filters: [],
                                },
                                layout: { x: 0, y: 5, w: 12, h: 3 },
                              },
                              {
                                kind: 'Funnel',
                                namespace: 'donations',
                                layout: { x: 0, y: 5, w: 12, h: 3 },
                              },
                              {
                                kind: 'Geo',
                                namespace: 'donations',
                                layout: { x: 0, y: 5, w: 12, h: 3 },
                                rollup: ['count', 'id'],
                              },
                              {
                                kind: 'Treemap',
                                namespace: 'donations',
                                layout: { x: 0, y: 5, w: 12, h: 3 },
                                label: 'Payment methods',
                                groupBy: 'paymentMethod',
                                rollup: ['count', 'id'],
                              },
                            ],
                          })}
                        </div>
                      </div>
                    </div>
                  </ScrollableContainer>
                </ShellBody>
              </ShellMain>
            </>
          )}
        </DashboardManager>
      </IntlProvider>
    );
  }
}
