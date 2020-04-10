import Contact from '@uidu/contact';
import { Shell, ShellSlide } from '@uidu/widgets';
import React, { useRef } from 'react';
import Countdown from 'react-countdown';
import { FormattedMessage } from 'react-intl';
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
  updateCurrentMember,
  currentMember,
  currentOrganization,
  event,
  baseUrl,
  stripe,
  paymentIntent,
  ...rest
}) {
  const slider: React.RefObject<Swiper> = useRef(null);

  const countdown = (
    <div className="text-center small text-muted">
      <Countdown date={Date.now() + 100000} />
    </div>
  );

  const slides: ShellSlide[] = [
    {
      key: 'order',
      'data-history': 'order',
      header: {
        to: baseUrl,
        name: (
          <FormattedMessage
            id="guidu.attend.order.name"
            defaultMessage="Tickets"
          />
        ),
      },
      component: (
        <Order
          {...rest}
          event={event}
          handleSubmit={async (model) =>
            createOrder(model).then(() => {
              slider.current.slideNext();
            })
          }
        />
      ),
    },
  ];

  slides.push({
    key: 'contact',
    'data-history': 'contact',
    header: {
      to: 'back',
      name: (
        <>
          <FormattedMessage
            defaultMessage="Contact information"
            id="guidu.donate.donation.contact"
          />
          {countdown}
        </>
      ),
    },
    component: (
      <Contact
        {...rest}
        scope="events"
        contact={currentMember}
        handleSubmit={async (model) => {
          return updateCurrentMember(model).then(() =>
            setTimeout(() => slider.current.slideNext(), 500),
          );
        }}
      />
    ),
  });

  slides.push({
    key: 'attendance',
    'data-history': 'attendances',
    header: {
      to: `back`,
      name: (
        <>
          <FormattedMessage
            id="guidu.attend.attendance.name"
            defaultMessage="Tickets"
          />
          {countdown}
        </>
      ),
    },
    component: (
      <Attendances
        {...rest}
        order={order}
        currentMember={currentMember}
        createAttendance={createAttendance}
        onSave={() => setTimeout(() => slider.current.slideNext(), 500)}
      />
    ),
  });

  if (order && order.stripeAmount > 0) {
    slides.push({
      key: 'pay',
      'data-history': 'payments',
      header: {
        to: 'back',
        name: 'pay',
      },
      component: (
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
    key: 'confirmation',
    'data-history': 'confirmation',
    header: {
      to: baseUrl,
      name: (
        <FormattedMessage
          defaultMessage="Done!"
          id="guidu.donate.donation.done"
        />
      ),
    },
    component: <Confirmation {...rest} order={order} />,
  });

  return (
    <Shell slides={slides} ref={slider} baseUrl={baseUrl} scope="events" />
  );
}
