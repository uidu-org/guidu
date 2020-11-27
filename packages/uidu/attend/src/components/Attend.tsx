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
  updateOrder,
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
      name: <FormattedMessage defaultMessage="Tickets" />,
      component: () => (
        <Order
          {...rest}
          event={event}
          handleSubmit={async (model) =>
            updateOrder(model).then(() => {
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
        <FormattedMessage defaultMessage="Contact information" />
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
        <FormattedMessage defaultMessage="Tickets" />
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
    name: <FormattedMessage defaultMessage="Done!" />,
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
