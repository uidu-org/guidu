import Contact from '@uidu/contact';
import {
  Shell,
  ShellHeaderCloseAndNavigate,
  ShellHeaderSlideBack,
} from '@uidu/widgets';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Swiper from 'swiper';
import Confirmation from './steps/Confirmation';
import Reminder from './steps/Reminder';

export default function TaxReminder({
  reminder,
  currentMember,
  updateCurrentMember,
  ...rest
}: any) {
  const slider: React.RefObject<Swiper> = useRef(null);

  const slides = [
    {
      key: 'reminder',
      header: {
        itemBefore: ShellHeaderCloseAndNavigate,
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
          onSave={async newDonation => {
            setTimeout(() => slider.current.slideNext(), 500);
          }}
        />
      ),
    },
    {
      key: 'contact',
      header: {
        itemBefore: ShellHeaderSlideBack,
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
          contact={currentMember}
          handleSubmit={async model => {
            return updateCurrentMember(model).then(() =>
              slider.current.slideNext(),
            );
          }}
        />
      ),
    },
    {
      key: 'preferences',
      header: {
        itemBefore: ShellHeaderSlideBack,
        name: (
          <>
            <span>Personalizza</span>
          </>
        ),
      },
      component: <Confirmation />,
    },
  ];

  return <Shell slides={slides} ref={slider} />;
}
