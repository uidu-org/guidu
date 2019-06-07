import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Component, Fragment } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import DashboardManager from '../';
import { fetchDonations } from '../examples-utils';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetchDonations().then(response =>
      this.setState({ rowData: response, loaded: true }),
    );
  }

  render() {
    const { rowData, loaded } = this.state;
    return (
      <DashboardManager rowData={rowData} defaultTimeFrame="1Y">
        {({ renderControls, renderBlocks }) => (
          <Fragment>
            <ShellHeader className="border-bottom">
              {renderControls({
                availableViews: ['table', 'gallery', 'calendar', 'list'],
              })}
            </ShellHeader>
            <ShellBody scrollable>
              <div className="container px-0">
                <div className="row">
                  <div className="col-12">
                    {renderBlocks({
                      loaded,
                      blocks: [
                        {
                          kind: 'area',
                          x: 0,
                        },
                        {
                          kind: 'counter',
                          x: 0,
                        },
                        {
                          kind: 'counter',
                          x: 1,
                        },
                        {
                          kind: 'counter',
                          x: 2,
                        },
                        {
                          kind: 'counter',
                          x: 3,
                        },
                        {
                          kind: 'pie',
                          x: 0,
                        },
                        {
                          kind: 'list',
                          x: 2,
                        },
                        {
                          kind: 'list',
                          x: 0,
                        },
                        {
                          kind: 'bar',
                          x: 2,
                        },
                        {
                          kind: 'radial',
                          x: 0,
                        },
                        {
                          kind: 'funnel',
                          x: 0,
                        },
                        {
                          kind: 'geo',
                          x: 0,
                        },
                      ],
                    })}
                  </div>
                </div>
              </div>
            </ShellBody>
          </Fragment>
        )}
      </DashboardManager>
    );
  }
}
