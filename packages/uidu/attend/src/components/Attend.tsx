import Contact from '@uidu/contact';
import { Shell, ShellStep } from '@uidu/widgets';
import React, { useRef } from 'react';
import Countdown from 'react-countdown';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import Swiper from 'swiper';
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
  const slider: React.RefObject<Swiper> = useRef(null);

  const countdown = (
    <div className="text-center small text-muted">
      <Countdown date={Date.now() + 100000} />
    </div>
  );

  const slides: ShellStep[] = [
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

  slides.push({
    relativePath: 'contact',
    name: (
      <>
        <FormattedMessage
          defaultMessage="Contact information"
          id="guidu.donate.donation.contact"
        />
        {countdown}
      </>
    ),
    component: () => (
      <Contact
        {...rest}
        scope="events"
        contact={currentContact}
        handleSubmit={async (model) => {
          return updateCurrentContact(model).then(() =>
            setTimeout(() => slider.current.slideNext(), 500),
          );
        }}
      />
    ),
  });

  slides.push({
    relativePath: 'attendance',
    name: (
      <>
        <FormattedMessage
          id="guidu.attend.attendance.name"
          defaultMessage="Tickets"
        />
        {countdown}
      </>
    ),
    component: () => (
      <Attendances
        {...rest}
        order={order}
        currentContact={currentContact}
        createAttendance={createAttendance}
        onSave={() => setTimeout(() => slider.current.slideNext(), 500)}
      />
    ),
  });

  if (order && order.stripeAmount > 0) {
    slides.push({
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

  slides.push({
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
    <Shell name={event.name} steps={slides} baseUrl={baseUrl} scope="events" />
  );
}
