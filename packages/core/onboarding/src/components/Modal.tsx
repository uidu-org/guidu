import Button, { Theme as ButtonTheme } from '@uidu/button';
import Modal from '@uidu/modal-dialog';
import React, { Component, ReactNode } from 'react';
import { ActionItem, Actions, Body, Heading, Image } from '../styled/Modal';
import { ActionsType } from '../types';
import { modalButtonTheme } from './theme';

type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType;
  /** The elements rendered in the modal */
  children: ReactNode;
  /** Path to the the your image */
  image?: string;
  /** Optional element rendered above the body */
  header?: React.ElementType<any>;
  /** Optional element rendered below the body */
  footer?: React.ElementType<any>;
  /** Heading text rendered above the body */
  heading?: string;
};

function noop() {}

export default class OnboardingModal extends Component<Props> {
  headerComponent = (props: Props) => {
    const { header: HeaderElement, image: src } = props;

    const ImageElement = () => <Image alt="" src={src} />;

    return HeaderElement || ImageElement;
  };

  footerComponent = (props: Props) => {
    const { footer: FooterElement, actions: actionList } = props;

    const ActionsElement = () =>
      actionList ? (
        <ButtonTheme.Provider value={modalButtonTheme}>
          <Actions>
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
          </Actions>
        </ButtonTheme.Provider>
      ) : (
        undefined
      );

    return FooterElement || ActionsElement;
  };

  render() {
    const { actions, children, heading, ...props } = this.props;

    return (
      <Modal
        autoFocus
        components={{
          Header: this.headerComponent(this.props),
          Footer: this.footerComponent(this.props),
        }}
        onClose={noop}
        scrollBehavior="outside"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        {...props}
      >
        <Body>
          {heading && <Heading>{heading}</Heading>}
          {children}
        </Body>
      </Modal>
    );
  }
}
