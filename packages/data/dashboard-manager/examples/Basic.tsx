import { More, Shuffle } from '@uidu/dashboard-controls';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { IntlProvider } from 'react-intl';
import { dashlets } from '../examples-utils';
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
                            dashlets,
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
