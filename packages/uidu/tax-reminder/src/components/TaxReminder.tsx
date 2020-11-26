import Contact from '@uidu/contact';
import { Shell, ShellStep } from '@uidu/widgets';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import Confirmation from './steps/Confirmation';
import Reminder from './steps/Reminder';

export default function TaxReminder({
  reminder,
  taxReturnCampaign,
  currentContact,
  updateCurrentContact,
  baseUrl,
  embedded,
  ...rest
}: any) {
  const history = useHistory();
  const match = useRouteMatch();

  const steps: ShellStep[] = [
    {
      relativePath: 'reminder',
      name: (
        <FormattedMessage
          defaultMessage="Set your reminder"
          id="guidu.tax-reminder.reminder"
        />
      ),
      component: () => (
        <Reminder
          {...rest}
          onSave={async (newDonation) => {
            history.push(`${match.url}/contact`);
          }}
        />
      ),
    },
    {
      relativePath: 'contact',
      name: (
        <FormattedMessage
          defaultMessage="Contact information"
          id="guidu.donate.donation.contact"
        />
      ),
      component: () => (
        <Contact
          {...rest}
          scope="tax-returns"
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
      name={taxReturnCampaign.name}
      steps={steps}
      baseUrl={baseUrl}
      scope="tax-returns"
      embedded={embedded}
    />
  );
}
