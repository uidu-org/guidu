import { ShellBody, ShellHeader } from '@uidu/shell';
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
    };
  }

  componentDidMount() {
    fetchDonations().then(response =>
      this.setState({
        rowData: {
          donations: response,
        },
        loaded: true,
      }),
    );
  }

  render() {
    const { rowData, loaded } = this.state;
    return (
      <DashboardManager
        rowData={rowData}
        defaultTimeFrame="5Y"
        gridProps={{ isDraggable: true, onLayoutChange: console.log }}
      >
        {({ renderControls, renderBlocks }) => (
          <>
            <ShellHeader className="border-bottom">
              {renderControls({})}
            </ShellHeader>
            <ShellBody scrollable>
              <div className="container px-0">
                <div className="row">
                  <div className="col-12">
                    {renderBlocks({
                      loaded,
                      blocks: [
                        {
                          kind: 'Area',
                          namespace: 'donations',
                          label: 'Raccolta',
                          name: 'donationsAmount',
                          rollup: ['sum', 'amount'],
                          formatter: 'currency',
                          x: 0,
                          y: 0,
                          w: 2,
                          h: 2,
                        },
                        {
                          kind: 'Area',
                          namespace: 'donations',
                          label: 'Raccolta',
                          name: 'donationsCount',
                          rollup: ['count', 'id'],
                          formatter: 'integer',
                          x: 2,
                          y: 0,
                          w: 2,
                          h: 2,
                        },
                        {
                          kind: 'Counter',
                          namespace: 'donations',
                          label: 'counter',
                          x: 0,
                          y: 0,
                          w: 1,
                          h: 1,
                          rollup: ['sum', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Counter',
                          namespace: 'donations',
                          itemBefore: <UserCheck />,
                          label: 'counter',
                          x: 1,
                          y: 0,
                          w: 1,
                          h: 1,
                          rollup: ['count', 'id'],
                          formatter: 'integer',
                        },
                        {
                          kind: 'Counter',
                          namespace: 'donations',
                          label: 'counter',
                          x: 2,
                          y: 0,
                          w: 1,
                          h: 1,
                          rollup: ['count', 'contact.id'],
                          formatter: 'integer',
                        },
                        {
                          kind: 'Counter',
                          namespace: 'donations',
                          label: 'counter',
                          x: 3,
                          y: 0,
                          w: 1,
                          h: 1,
                          rollup: ['mean', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Pie',
                          namespace: 'donations',
                          label: 'Metodo di pagamento',
                          groupBy: 'paymentMethod',
                          rollup: ['count', 'id'],
                          x: 0,
                          y: 1,
                          w: 2,
                          h: 3,
                        },
                        {
                          label: 'Top campaigns',
                          namespace: 'donations',
                          kind: 'List',
                          x: 2,
                          y: 1,
                          w: 2,
                          h: 3,
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
                          w: 2,
                          h: 3,
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
                          w: 2,
                          h: 3,
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
                          w: 2,
                          h: 3,
                          rollup: ['max', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Bar',
                          namespace: 'donations',
                          x: 0,
                          y: 11,
                          w: 4,
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
                          kind: 'Radial',
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
                          w: 2,
                          h: 3,
                        },
                        {
                          kind: 'Funnel',
                          namespace: 'donations',
                          x: 0,
                          y: 5,
                          w: 2,
                          h: 3,
                        },
                        {
                          kind: 'Geo',
                          namespace: 'donations',
                          x: 0,
                          y: 5,
                          w: 2,
                          h: 3,
                          rollup: ['count', 'id'],
                        },
                        {
                          kind: 'Treemap',
                          namespace: 'donations',
                          x: 0,
                          y: 5,
                          w: 2,
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
            </ShellBody>
          </>
        )}
      </DashboardManager>
    );
  }
}
