import loadable from '@loadable/component';
import Contact from '@uidu/contact';
import { Shell, ShellSlide } from '@uidu/widgets';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import { DonateProps } from '../types';

const Confirmation = loadable(() => import('./steps/Confirmation'));
const Donation = loadable(() => import('./steps/Donation'));
const Pay = loadable(() => import('./steps/Pay'));
const Preferences = loadable(() => import('./steps/Preferences'));
const Subscribe = loadable(() => import('./steps/Subscribe'));

export default function Donate({
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
  const history = useHistory();
  const match = useRouteMatch();

  console.log(match);
  console.log(history);

  const slides: ShellSlide[] = [
    {
      key: 'donation',
      'data-history': match.url,
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
          providers={providers}
          handleSubmit={async (model) => {
            return createDonation(model).then(() => {
              history.push(`${match.url}preferences`);
            });
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
          updateDonation(model).then(() => {
            history.push(`${match.url}contact`);
          })
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
        scope="primary"
        contact={currentContact}
        handleSubmit={async (model) => {
          return updateCurrentContact(model).then(() =>
            history.push(`${match.url}payments`),
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
            onSuccess={() => history.push(`${match.url}done`)}
          />
        ) : (
          <Pay
            {...rest}
            provider={{ id: 'card' }}
            donation={donation}
            onSuccess={() => history.push(`${match.url}done`)}
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
      baseUrl={baseUrl}
      scope="primary"
      embedded={embedded}
    />
  );
}
