import { ShellBody } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { DeviseWrapperProps } from '../types';

export default class DeviseWrapper extends PureComponent<DeviseWrapperProps> {
  render() {
    const { children, header, footer } = this.props;

    return (
      <>
        <ShellBody scrollable className="d-flex flex-column">
          <div
            className="container-fluid d-flex flex-column justify-content-center"
            style={{ flex: '1 1 auto' }}
          >
            <div className="row align-items-center justify-content-center my-4 my-sm-5">
              <div className="col-sm-8 col-md-6 col-xl-4">
                {header}
                <div className="card card-body py-5">{children}</div>
                {footer}
              </div>
            </div>
          </div>
        </ShellBody>
      </>
    );
  }
}
