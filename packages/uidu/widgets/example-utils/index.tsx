import Modal, { ModalTransition } from '@uidu/modal-dialog';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

export function WidgetsExampleScaffold({ component: Component, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IntlProvider locale="en">
        <Component {...rest} stripe={stripe} />

        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Modal view
        </button>
        <ModalTransition>
          {isOpen && (
            <Modal
              onClose={() => setIsOpen(false)}
              body="div"
              scrollBehavior="outside"
            >
              <Component {...rest} stripe={stripe} embedded />
            </Modal>
          )}
        </ModalTransition>
      </IntlProvider>
    </>
  );
}
