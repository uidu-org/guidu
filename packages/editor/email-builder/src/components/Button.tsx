import { useNode } from '@craftjs/core';
import UiduButton from '@uidu/button';
import React from 'react';

export function Button({ size, variant, color, text, ...props }) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <UiduButton
      ref={(ref) => connect(drag(ref))}
      style={{ margin: '5px' }}
      shouldFitContainer
      {...props}
    >
      {text}
    </UiduButton>
  );
}

export function ButtonSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return <div></div>;
}

export const ButtonDefaultProps = {
  size: 'small',
  variant: 'contained',
  color: 'primary',
  text: 'Click me',
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
