import Contact from '@uidu/contact';
import { Shell, ShellSlide } from '@uidu/widgets';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Swiper from 'swiper';
import { DonateProps } from '../types';
import Confirmation from './steps/Confirmation';
import Donation from './steps/Donation';
import Pay from './steps/Pay';
import Preferences from './steps/Preferences';
import Subscribe from './steps/Subscribe';

export default function Donate({
  sliderOptions,
  donation,
  currentContact,
  providers,
  baseUrl = '/',
  createDonation,
  updateDonation,
  updateCurrentContact,
  embedded,
  ...rest
}: DonateProps) {
  const slider: React.RefObject<Swiper> = useRef(null);

  const slides: ShellSlide[] = [
    {
      key: 'donation',
      'data-history': 'donations',
      header: {
        to: baseUrl,
        name: (
          <FormattedMessage
            defaultMessage="Donate now"
            id="guidu.donate.donation.name"
          />
        ),
      },
      component: (
        <Donation
          {...rest}
          slider={slider}
          providers={providers}
          handleSubmit={async (model) => {
            return createDonation(model).then(() => slider.current.slideNext());
          }}
        />
      ),
    },
  ];

  slides.push({
    'data-history': 'preferences',
    key: 'preferences',
    header: {
      to: 'back',
      name: (
        <>
          <h5 className="m-0">
            {donation.amount ? donation.amount / 100 : null}
          </h5>
          <FormattedMessage
            defaultMessage="Customize"
            id="guidu.donate.preferences.title"
          />
        </>
      ),
    },
    component: (
      <Preferences
        {...rest}
        currentContact={currentContact}
        donation={donation}
        handleSubmit={async (model) =>
          updateDonation(model).then(() => slider.current.slideNext())
        }
      />
    ),
  });

  slides.push({
    key: 'contact',
    'data-history': 'contact',
    header: {
      to: 'back',
      name: (
        <FormattedMessage
          defaultMessage="Contact information"
          id="guidu.donate.donation.contact"
        />
      ),
    },
    component: (
      <Contact
        {...rest}
        scope="donations"
        contact={currentContact}
        handleSubmit={async (model) => {
          return updateCurrentContact(model).then(() =>
            slider.current.slideNext(),
          );
        }}
      />
    ),
  });

  slides.push({
    key: 'pay',
    'data-history': 'payments',
    header: {
      to: 'back',
      name: (
        <FormattedMessage
          defaultMessage="Donate now"
          id="guidu.donate.donation.payment"
        />
      ),
    },
    component: donation.amount ? (
      <>
        {donation.subscriptionItem ? (
          <Subscribe
            {...rest}
            donation={donation}
            onSuccess={() => slider.current.slideNext()}
          />
        ) : (
          <Pay
            {...rest}
            provider={{ id: 'card' }}
            donation={donation}
            onSuccess={() => slider.current.slideNext()}
          />
        )}
      </>
    ) : null,
  });

  slides.push({
    key: 'confirmation',
    'data-history': 'done',
    header: {
      to: baseUrl,
      name: (
        <FormattedMessage
          defaultMessage="Done!"
          id="guidu.donate.donation.done"
        />
      ),
    },
    component: <Confirmation {...rest} donation={donation} />,
  });

  return (
    <Shell
      slides={slides}
      sliderOptions={{ initialSlide: donation.id ? 1 : 0 }}
      ref={slider}
      baseUrl={baseUrl}
      scope="donations"
      embedded={embedded}
    />
  );
}
