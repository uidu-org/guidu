// import Modal, { ModalTransition } from '@uidu/modal-dialog';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Donate from '../';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

export default function Basic() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IntlProvider defaultLocale="en">
      <Donate
        stripe={stripe}
        donation={{}}
        currentOrganization={{ name: 'Charity Water' }}
        donationCampaign={{ name: 'The Spring' }}
        onCreate={(_donation, token) => console.log(token)}
        providers={[{ id: 'card', name: 'Credit Card' }]}
        currency="€"
        pledges={[
          {
            id: 1,
            amount: 40,
            // name: 'A small help',
            // description: 'help buildind a school',
          },
          {
            id: 2,
            amount: 80,
            // name: 'A small help',
            // description: 'help buildind a school',
          },
          {
            id: 3,
            amount: 140,
            // name: 'A small help',
            // description: 'help buildind a school',
          },
        ]}
      />
      {/* <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Modal view
      </button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)} heading="Modal Title">
            <Donate
              donation={{}}
              currentOrganization={{ name: 'Charity Water' }}
              donationCampaign={{ name: 'The Spring' }}
              onCreate={(_donation, token) => console.log(token)}
            />
          </Modal>
        )}
      </ModalTransition> */}
    </IntlProvider>
  );
}
