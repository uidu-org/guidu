import React, { PureComponent } from 'react';
// import { apiCall } from 'utils';

export default class DonationConfirmation extends PureComponent<any, any> {
  render() {
    const { donation } = this.props;
    return (
      <div className="w-100">
        <div className="p-3 p-xl-4 bg-donations">
          <div className="media align-items-center">
            {/* <AnimatedCheck
                    className="mr-3 text-white"
                    style={{ width: '28px' }}
                  /> */}
            <div className="media-body">
              <p className="mb-0 text-white text-medium">
                Donazione effettuata con successo
              </p>
            </div>
          </div>
        </div>
        <div className="container my-3 my-md-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a className="card mb-3" href={donation.receiptPath}>
                <div className="media align-items-stretch">
                  <div className="d-flex align-items-center py-2 px-3 bg-light">
                    <div
                      className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                      data-type="pdf"
                      style={{
                        width: '11px',
                        height: '16px',
                        verticalAlign: 'sub',
                      }}
                    />
                  </div>
                  <div className="media-body text-medium py-2 px-3">
                    Scarica la ricevuta
                  </div>
                </div>
              </a>
              <a className="card" href={donation.receiptPath}>
                <div className="media align-items-stretch">
                  <div className="d-flex align-items-center py-2 px-3 bg-light">
                    <div
                      className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                      data-type="pdf"
                      style={{
                        width: '11px',
                        height: '16px',
                        verticalAlign: 'sub',
                      }}
                    />
                  </div>
                  <div className="media-body text-medium py-2 px-3">
                    Condividi sui social
                  </div>
                </div>
              </a>
              <hr />
              Altro?
            </div>
          </div>
        </div>
      </div>
    );
  }
}
