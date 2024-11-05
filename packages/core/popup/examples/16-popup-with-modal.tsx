import { PlusIcon } from '@heroicons/react/24/solid';
import Button from '@uidu/button';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import Modal, { ModalBody } from '@uidu/modal-dialog';
import { ShellBody, ShellMain } from '@uidu/shell';
import React, { useCallback, useState } from 'react';
import Popup, { ContentProps } from '../src';

function Content({ onClose }: ContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuGroup>
        <ButtonItem
          onClick={() => {
            // onClose();
            setIsOpen((prev) => !prev);
            // setTimeout(() => {
            //   onClose();
            // }, 100);
          }}
        >
          Item 1
        </ButtonItem>
      </MenuGroup>
      {isOpen && (
        <Modal autoFocus>
          <ModalBody>
            If i select text here I should not close the popup
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default function PopupWithModal() {
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useCallback(
    (triggerProps) => (
      <Button
        {...triggerProps}
        onClick={() => setIsOpen((prev) => !prev)}
        value="Add"
        iconBefore={<PlusIcon tw="h-5 w-5" />}
      />
    ),
    [],
  );

  return (
    <ShellMain>
      <ShellBody>
        <div>
          <Popup
            trigger={Trigger}
            content={Content}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement="bottom"
            autoFocus={false}
          />
        </div>
      </ShellBody>
    </ShellMain>
  );
}
