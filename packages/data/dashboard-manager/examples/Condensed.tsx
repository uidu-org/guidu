import { Shuffle } from '@uidu/dashboard-controls';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import React, { Component } from 'react';
import 'react-day-picker/dist/style.css';
import { IntlProvider } from 'react-intl';
import DashboardManager from '../';
import { dashlets } from '../examples-utils';

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

  render() {
    const { rowData, loaded, isEditing } = this.state;
    return (
      <IntlProvider locale="en">
        <DashboardManager
          rowData={rowData}
          defaultTimeFrame="5Y"
          gridProps={{
            isDraggable: isEditing,
            isResizable: isEditing,
            margin: [16, 16],
            // rowHeight: 8,
            onLayoutChange: console.log,
          }}
        >
          {({ renderControls, renderDashlets }) => (
            <ShellMain>
              <ShellHeader className="px-3 border-bottom px-xl-4 d-flex align-items-center">
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
                            dashlets,
                          })}
                        </div>
                      </div>
                    </div>
                  </ScrollableContainer>
                </ShellMain>
              </ShellBody>
            </ShellMain>
          )}
        </DashboardManager>
      </IntlProvider>
    );
  }
}
