import Modal, { ModalTransition } from '@uidu/modal-dialog';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Donate from '../';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

export default function Basic() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({});

  const createDonation = async model => {
    setDonation(model);
    return {
      donation: {
        id: 'newly-created',
        ...model,
      },
      client_secret: 'foo',
    };
  };
  const updateDonation = async model => setDonation({ ...donation, ...model });

  const defaultProps = {
    stripe,
    donation,
    currentMember,
    currentOrganization: { name: 'Charity Water' },
    donationCampaign: { name: 'The Spring' },
    onCreate: (_donation, token) => console.log(token),
    providers: [{ id: 'card', name: 'Credit Card' }],
    createDonation,
    updateDonation,
    updateCurrentMember: async model => setCurrentMember(model),
    currency: '€',
    pledges: [
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
    ],
  };

  return (
    <IntlProvider defaultLocale="en">
      <Donate {...defaultProps} />
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Modal view
      </button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)} heading="Modal Title">
            <Donate {...defaultProps} />
          </Modal>
        )}
      </ModalTransition>
    </IntlProvider>
  );
}
