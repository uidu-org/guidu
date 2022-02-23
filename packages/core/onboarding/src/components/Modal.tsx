import Button from '@uidu/button';
import Modal, {
  FooterComponentProps,
  HeaderComponentProps,
} from '@uidu/modal-dialog';
import React, { ElementType, ReactNode } from 'react';
import {
  ActionItem,
  Actions as ModalActions,
  Body,
  Heading,
  Image,
} from '../styled/Modal';
import { Actions } from '../types';

type Props = {
  /** Buttons to render in the footer */
  actions?: Actions;
  /** The elements rendered in the modal */
  children: ReactNode;
  /** Path to the the your image */
  image?: string;
  /** Optional element rendered above the body */
  header?: ElementType<HeaderComponentProps>;
  /** Optional element rendered below the body */
  footer?: ElementType<FooterComponentProps>;
  /** Heading text rendered above the body */
  heading?: string;
};

function noop() {}

export default function OnboardingModal(props: Props) {
  const { actions, children, heading, ...rest } = props;

  const headerComponent = () => {
    const { header: HeaderElement, image: src } = props;

    const ImageElement = () => <Image alt="" src={src} />;

    return HeaderElement || ImageElement;
  };

  const footerComponent = () => {
    const { footer: FooterElement, actions: actionList } = props;

    const ActionsElement = () =>
      actionList ? (
        <ModalActions>
          {actionList.map(({ text, key, ...rest }, idx) => {
            const variant = idx ? 'subtle-link' : 'primary';
            return (
              <ActionItem
                key={key || (typeof text === 'string' ? text : `${idx}`)}
              >
                <Button appearance={variant} autoFocus={!idx} {...rest}>
                  {text}
                </Button>
              </ActionItem>
            );
          })}
        </ModalActions>
      ) : null;

    return FooterElement || ActionsElement;
  };

  return (
    <Modal
      autoFocus
      components={{
        Header: headerComponent(props),
        Footer: footerComponent(props),
      }}
      onClose={noop}
      scrollBehavior="outside"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEscapePress={false}
      {...rest}
    >
      <Body>
        {heading && <Heading>{heading}</Heading>}
        {children}
      </Body>
    </Modal>
  );
}
