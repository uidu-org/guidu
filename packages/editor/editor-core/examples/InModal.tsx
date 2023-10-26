import Button from '@uidu/button';
import Modal, { ModalBody, ModalTransition } from '@uidu/modal-dialog';
import { ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import FullEditor from '../examples-utils/FullEditor';

export default function InModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IntlProvider locale="en">
      <ShellMain>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <ModalTransition>
          {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
              <ModalBody>
                <FullEditor />
              </ModalBody>
            </Modal>
          )}
        </ModalTransition>
      </ShellMain>
    </IntlProvider>
  );
}
