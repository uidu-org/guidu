import { useNode } from '@craftjs/core';
import React from 'react';

export function Divider() {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  return (
    <div tw="relative h-8" ref={(ref) => connect(drag(ref))}>
      <div tw="absolute inset-0 flex items-center" aria-hidden="true">
        <div tw="w-full border-t border-gray-300" />
      </div>
    </div>
  );
}

export function DividerSettings() {
  return <div>Divider Settings</div>;
}

export function DividerDefaultProps() {
  return {};
}

Divider.craft = {
  props: DividerDefaultProps,
  related: {
    settings: DividerSettings,
  },
};
