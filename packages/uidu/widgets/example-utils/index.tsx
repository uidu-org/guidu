import Modal, { ModalTransition } from '@uidu/modal-dialog';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

export function WidgetsExampleScaffold({
  component: Component,
  loadLocaleData,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (loadLocaleData) loadLocaleData(locale).then(setMessages);
  }, [locale, loadLocaleData]);

  // if (!messages) {
  //   return null;
  // }

  return (
    <>
      <IntlProvider
        key={locale}
        locale={locale}
        defaultLocale="en"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(messages ? { messages: messages.default } : {})}
      >
        <Component {...rest} stripe={stripe} />

        <div style={{ position: 'fixed', right: 32, bottom: 32 }}>
          <button
            className="btn btn-light mr-2"
            onClick={(e) => {
              e.preventDefault();
              setLocale('it');
            }}
          >
            IT
          </button>
          <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            Modal view
          </button>
        </div>
        <ModalTransition>
          {isOpen && (
            <Modal
              onClose={() => setIsOpen(false)}
              body="div"
              scrollBehavior="outside"
              width="large"
            >
              <Component {...rest} stripe={stripe} embedded />
            </Modal>
          )}
        </ModalTransition>
      </IntlProvider>
    </>
  );
}
