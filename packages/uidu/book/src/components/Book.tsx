import Contact from '@uidu/contact';
import { Shell, ShellStep } from '@uidu/widgets';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import { BookProps } from '../types';
import Confirmation from './steps/Confirmation';
import Reminder from './steps/Reminder';

export default function Book({
  appointment,
  bookable,
  currentContact,
  updateCurrentContact,
  baseUrl,
  embedded,
  ...rest
}: BookProps) {
  const history = useHistory();
  const match = useRouteMatch();

  const steps: ShellStep[] = [
    {
      relativePath: 'reminder',
      name: <FormattedMessage defaultMessage="Set your reminder" />,
      component: () => (
        <Reminder
          handleSubmit={async (newDonation) => {
            history.push(`${match.url}/contact`);
          }}
        />
      ),
    },
    {
      relativePath: 'contact',
      name: <FormattedMessage defaultMessage="Contact information" />,
      component: () => (
        <Contact
          contact={currentContact}
          handleSubmit={async (model) => {
            return updateCurrentContact(model).then(() =>
              history.push(`${match.url}/preferences`),
            );
          }}
        />
      ),
    },
    {
      relativePath: 'preferences',
      name: (
        <>
          <span>Personalizza</span>
        </>
      ),
      component: () => <Confirmation />,
    },
  ];

  return (
    <Shell
      name={bookable.name}
      steps={steps}
      baseUrl={baseUrl}
      scope="tax-returns"
      embedded={embedded}
    />
  );
}
