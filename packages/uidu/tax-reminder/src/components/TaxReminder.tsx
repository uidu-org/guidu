import Contact from '@uidu/contact';
import { Shell, ShellSlide } from '@uidu/widgets';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Swiper from 'swiper';
import Confirmation from './steps/Confirmation';
import Reminder from './steps/Reminder';

export default function TaxReminder({
  reminder,
  currentContact,
  updateCurrentContact,
  baseUrl,
  embedded,
  ...rest
}: any) {
  const slider: React.RefObject<Swiper> = useRef(null);

  const slides: ShellSlide[] = [
    {
      key: 'reminder',
      'data-history': 'reminder',
      header: {
        to: baseUrl,
        name: (
          <FormattedMessage
            defaultMessage="Set your reminder"
            id="guidu.tax-reminder.reminder"
          />
        ),
      },
      component: (
        <Reminder
          {...rest}
          onSave={async (newDonation) => {
            setTimeout(() => slider.current.slideNext(), 500);
          }}
        />
      ),
    },
    {
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
          scope="tax-returns"
          contact={currentContact}
          handleSubmit={async (model) => {
            return updateCurrentContact(model).then(() =>
              slider.current.slideNext(),
            );
          }}
        />
      ),
    },
    {
      key: 'preferences',
      'data-history': 'contact',
      header: {
        to: 'back',
        name: (
          <>
            <span>Personalizza</span>
          </>
        ),
      },
      component: <Confirmation />,
    },
  ];

  return (
    <Shell
      slides={slides}
      ref={slider}
      baseUrl={baseUrl}
      scope="tax-returns"
      embedded={embedded}
    />
  );
}
