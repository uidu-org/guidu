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
import DashboardManager from '../';
import { fetchDonations } from '../examples-utils';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {
        donations: [],
      },
      loaded: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    fetchDonations().then((response) =>
      this.setState({
        rowData: {
          donations: response,
        },
        loaded: true,
      }),
    );
  }

  render() {
    const { rowData, loaded, isEditing } = this.state;
    console.log(isEditing);
    return (
      <DashboardManager
        rowData={rowData}
        defaultTimeFrame="5Y"
        gridProps={{
          isDraggable: isEditing,
          isResizable: isEditing,
          margin: [8, 8],
          rowHeight: 8,
          onLayoutChange: console.log,
        }}
      >
        {({ renderControls, renderDashlets }) => (
          <>
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
              <ShellMain>
                <ScrollableContainer>
                  <div className="container px-0">
                    <div className="row">
                      <div className="col-12">
                        {renderDashlets({
                          loaded,
                          dashlets: [
                            {
                              kind: 'XY',
                              namespace: 'donations',
                              label: 'Raccolta',
                              description: 'Donations amount by time',
                              name: 'donationsAmount',
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                              color: colors[0],
                              x: 0,
                              y: 0,
                              w: 12,
                              h: 10,
                            },
                            {
                              kind: 'XY',
                              namespace: 'donations',
                              label: 'Raccolta',
                              name: 'donationsCount',
                              rollup: ['count', 'id'],
                              formatter: 'integer',
                              color: colors[1],
                              x: 0,
                              y: 4,
                              w: 12,
                              h: 10,
                            },
                            {
                              kind: 'HorizontalRule',
                              x: 0,
                              w: 12,
                              h: 10,
                              y: 4,
                            },
                            {
                              kind: 'Counter',
                              namespace: 'donations',
                              label: 'counter',
                              x: 0,
                              y: 2,
                              w: 4,
                              h: 4,
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              kind: 'Counter',
                              namespace: 'donations',
                              itemBefore: <UserCheck />,
                              label: 'counter',
                              x: 4,
                              y: 2,
                              w: 4,
                              h: 4,
                              rollup: ['count', 'id'],
                              formatter: 'integer',
                            },
                            {
                              kind: 'Counter',
                              namespace: 'donations',
                              label: 'counter',
                              x: 8,
                              y: 2,
                              w: 4,
                              h: 4,
                              rollup: ['count', 'contact.id'],
                              formatter: 'integer',
                            },
                            {
                              kind: 'HorizontalRule',
                              x: 0,
                              w: 12,
                              h: 2,
                              y: 12,
                            },
                            {
                              kind: 'Pie',
                              namespace: 'donations',
                              label: 'Metodo di pagamento',
                              groupBy: 'paymentMethod',
                              rollup: ['count', 'id'],
                              x: 0,
                              y: 4,
                              w: 12,
                              h: 8,
                            },
                            {
                              label: 'Top campaigns',
                              namespace: 'donations',
                              kind: 'List',
                              x: 0,
                              y: 4,
                              w: 6,
                              h: 4,
                              groupBy: 'donationCampaignId',
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              label: 'Average donations',
                              namespace: 'donations',
                              kind: 'List',
                              x: 0,
                              y: 4,
                              w: 6,
                              h: 4,
                              groupBy: 'donationCampaignId',
                              rollup: ['mean', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              label: 'Top donors',
                              namespace: 'donations',
                              kind: 'List',
                              x: 2,
                              y: 4,
                              w: 6,
                              h: 4,
                              groupBy: 'contact.id',
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              label: 'Top donations',
                              namespace: 'donations',
                              kind: 'List',
                              x: 0,
                              y: 7,
                              w: 6,
                              h: 3,
                              rollup: ['max', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              kind: 'Bar',
                              namespace: 'donations',
                              x: 0,
                              y: 11,
                              w: 12,
                              h: 3,
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
                              namespace: 'donations',
                              rollup: ['count', 'id'],
                              bins: [
                                [0, 10000],
                                [10001, 20000],
                                [20001, 30000],
                                [30001],
                              ],
                              x: 0,
                              y: 5,
                              w: 12,
                              h: 3,
                            },
                            {
                              kind: 'Funnel',
                              namespace: 'donations',
                              x: 0,
                              y: 5,
                              w: 12,
                              h: 3,
                            },
                            {
                              kind: 'Geo',
                              namespace: 'donations',
                              x: 0,
                              y: 5,
                              w: 12,
                              h: 3,
                              rollup: ['count', 'id'],
                            },
                            {
                              kind: 'Treemap',
                              namespace: 'donations',
                              x: 0,
                              y: 5,
                              w: 12,
                              h: 3,
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
              </ShellMain>
            </ShellBody>
          </>
        )}
      </DashboardManager>
    );
  }
}
