import Payments, { Pay } from '@uidu/payments';
import { ShellBodyWithSidebar } from '@uidu/shell';
import Loader from '@uidu/spinner';
import Stepper, { Step } from '@uidu/stepper';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Countdown from 'react-countdown';
// import { apiCall } from 'utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import Attendance from './steps/Attendance';
import Order from './steps/Order';

class Attend extends PureComponent<any, any> {
  private slider = React.createRef();
  private scrollElement: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      order: null,
      attendance: props.attendance,
      paymentFormError: null,
      paymentFormSubmitted: false,
    };
  }

  createOrder = async model => {
    console.log(model);
    this.updateOrderAndNext(model);
  };
  // apiCall('post', '/orders', model)
  //   .then(response => {
  //     this.updateOrderAndNext(response.data);
  //   })
  //   .catch(error => console.log(error.response));

  updateOrderAndNext = async newOrder =>
    this.setState(
      {
        order: newOrder,
      },
      () => setTimeout(() => (this.slider.current as any).next(), 500),
    );

  createAttendance = token => console.log(token);

  render() {
    const { currentMember, currentOrganization, event } = this.props;
    const { order, attendance } = this.state;

    if (!event) {
      return <Loader loaded={!!event} />;
    }

    return (
      <ShellBodyWithSidebar
        ref={this.scrollElement}
        sidebar={<div className="col-lg-4 bg-light">TEst carrello</div>}
      >
        <div className="px-5 py-3">
          <Stepper
            defaultStep="order"
            scope="events"
            scrollElement={this.scrollElement}
            {...this.props}
          >
            {({ getStepProps, jumpToStep }) => (
              <>
                <Step
                  {...getStepProps()}
                  name="order"
                  description={
                    <FormattedMessage
                      id="guidu.attend.order.name"
                      defaultMessage="Choose from available ticket types"
                    />
                  }
                  label={
                    <FormattedMessage
                      id="guidu.attend.order.name"
                      defaultMessage="Tickets"
                    />
                  }
                  number={1}
                >
                  <Order
                    {...this.props}
                    submitted
                    onSave={
                      currentMember ? this.createOrder : this.updateOrderAndNext
                    }
                  />
                </Step>
                <Step
                  {...getStepProps()}
                  name="attendance"
                  description={
                    <FormattedMessage
                      id="guidu.attend.attendance.name"
                      defaultMessage="Tickets"
                    />
                  }
                  label={
                    <FormattedMessage
                      id="guidu.attend.attendance.name"
                      defaultMessage="Tickets"
                    />
                  }
                  number={2}
                >
                  <Attendance
                    {...this.props}
                    attendance={attendance}
                    submitted
                    order={order}
                    onSave={newDonation => {
                      this.setState(
                        {
                          ...newDonation,
                        },
                        () =>
                          setTimeout(
                            () => (this.slider.current as any).next(),
                            500,
                          ),
                      );
                    }}
                  />
                </Step>
                <Step
                  {...getStepProps()}
                  name="payment"
                  description={
                    <FormattedMessage
                      id="guidu.attend.payment.name"
                      defaultMessage="Tickets"
                    />
                  }
                  label={
                    <FormattedMessage
                      id="guidu.attend.payment.name"
                      defaultMessage="Tickets"
                    />
                  }
                  number={3}
                >
                  <div className="p-3 p-xl-4">
                    {order && order.stripeAmount > 0 && (
                      <Payments
                        {...this.props}
                        apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5"
                        amount={order.stripeAmount}
                      >
                        {paymentProps => (
                          <Pay {...paymentProps}>
                            <div className="card card-body mb-3 p-3">
                              <dl className="mb-0">
                                <dt className="d-flex align-items-center justify-content-between">
                                  Donazione
                                </dt>
                                <dd className="mb-0 text-muted">
                                  Stai per donare {order.stripeAmount / 100} € a{' '}
                                  <span className="text-medium">
                                    {currentOrganization.name}
                                  </span>{' '}
                                  per il progetto{' '}
                                  <span className="text-medium">
                                    {event.name}
                                  </span>
                                </dd>
                              </dl>
                            </div>
                            {currentMember && (
                              <div className="card card-body mb-3 p-3">
                                <dl className="mb-0">
                                  <dt>Contatto</dt>
                                  <dd className="mb-0 text-muted">
                                    <address className="mb-0">
                                      <span className="text-medium">
                                        Stai donando come {currentMember.name}
                                      </span>
                                      <br />
                                      {currentMember.email}
                                    </address>
                                  </dd>
                                </dl>
                              </div>
                            )}
                          </Pay>
                        )}
                      </Payments>
                    )}
                  </div>
                </Step>
                <Step
                  {...getStepProps()}
                  name="preferences"
                  description={
                    <FormattedMessage
                      id="guidu.attend.preferences.name"
                      defaultMessage="Tickets"
                    />
                  }
                  label={
                    <FormattedMessage
                      id="guidu.attend.preferences.name"
                      defaultMessage="Tickets"
                    />
                  }
                  number={3}
                >
                  <div>
                    <div className="p-3 p-xl-4 bg-events">
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
                    <div className="p-3 p-xl-4">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <a className="card mb-3" href={attendance.ticketPath}>
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
                      <a className="card" href={attendance.receiptPath}>
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
                    </div>
                    <hr />

                    <div className="p-3 p-xl-4">
                      <p>Registrati</p>
                    </div>
                  </div>
                </Step>
              </>
            )}
          </Stepper>
        </div>
      </ShellBodyWithSidebar>
    );

    return (
      order &&
      order.createdAt && (
        <div className="p-3 p-xl-4 bg-events">
          <Countdown
            date={moment(order.createdAt)
              .utc()
              .add(10, 'minutes')
              .toDate()}
            // intervalDelay={0}
            // precision={3}
            // renderer={props => <div>{props.total}</div>}
          />
        </div>
      )
    );
  }
}

export default withRouter(Attend);
