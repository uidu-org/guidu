import React, { PureComponent } from 'react';

export default class FormWrapper extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="container-fluid py-4 px-0">
        <div className="row no-gutters justify-content-md-center">
          <div className="col-sm-12 col-md-10 col-lg-9 col-xl-8">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
