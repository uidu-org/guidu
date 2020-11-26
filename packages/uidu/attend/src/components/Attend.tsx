import Contact from '@uidu/contact';
import { Shell, ShellStep } from '@uidu/widgets';
import React from 'react';
import Countdown from 'react-countdown';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import Attendances from './steps/Attendances';
import Confirmation from './steps/Confirmation';
import Order from './steps/Order';
import Pay from './steps/Pay';

export default function Attend({
  order,
  attendance,
  createOrder,
  createAttendance,
  updateCurrentContact,
  currentContact,
  currentOrganization,
  event,
  baseUrl,
  stripe,
  paymentIntent,
  ...rest
}) {
  const history = useHistory();
  const match = useRouteMatch();

  const steps: ShellStep[] = [
    {
      relativePath: 'order',
      name: (
        <FormattedMessage
          id="guidu.attend.order.name"
          defaultMessage="Tickets"
        />
      ),
      component: () => (
        <Order
          {...rest}
          event={event}
          handleSubmit={async (model) =>
            createOrder(model).then(() => {
              history.push(`${match.url}/contact`);
            })
          }
        />
      ),
    },
  ];

  steps.push({
    relativePath: 'contact',
    name: (
      <>
        <FormattedMessage
          defaultMessage="Contact information"
          id="guidu.donate.donation.contact"
        />
      </>
    ),
    component: () => (
      <Contact
        {...rest}
        scope="events"
        contact={currentContact}
        handleSubmit={async (model) => {
          return updateCurrentContact(model).then(() =>
            history.push(`${match.url}/attendance`),
          );
        }}
      />
    ),
  });

  steps.push({
    relativePath: 'attendance',
    name: (
      <>
        <FormattedMessage
          id="guidu.attend.attendance.name"
          defaultMessage="Tickets"
        />
      </>
    ),
    component: () => (
      <Attendances
        {...rest}
        order={order}
        currentContact={currentContact}
        createAttendance={createAttendance}
        onSave={() =>
          history.push(
            `${match.url}/${
              order && order.stripeAmount > 0 ? 'pay' : 'confirmation'
            }`,
          )
        }
      />
    ),
  });

  if (order && order.stripeAmount > 0) {
    steps.push({
      relativePath: 'pay',
      name: 'pay',
      component: () => (
        <Pay
          {...rest}
          stripe={stripe}
          paymentIntent={paymentIntent}
          order={order}
          event={event}
          currentOrganization={currentOrganization}
        />
      ),
    });
  }

  steps.push({
    relativePath: 'confirmation',
    name: (
      <FormattedMessage
        defaultMessage="Done!"
        id="guidu.donate.donation.done"
      />
    ),
    component: () => <Confirmation {...rest} order={order} />,
  });

  return (
    <Shell
      name={event.name}
      steps={steps}
      baseUrl={baseUrl}
      scope="events"
      sidebarFooterAdditionalItems={[
        {
          type: 'InlineComponent',
          component: () => (
            <div className="p-3 alert alert-warning mx-4">
              <div className="text-center small">
                <Countdown date={Date.now() + 100000} />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
