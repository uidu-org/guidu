// import Modal, { ModalTransition } from '@uidu/modal-dialog';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Donate from '../';

export default function Basic() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IntlProvider defaultLocale="en">
      <Donate
        donation={{}}
        currentOrganization={{ name: 'Charity Water' }}
        donationCampaign={{ name: 'The Spring' }}
        onCreate={(_donation, token) => console.log(token)}
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
