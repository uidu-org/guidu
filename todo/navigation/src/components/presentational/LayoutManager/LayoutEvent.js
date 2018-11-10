// @flow

import React, { Component, type Node } from 'react';

const noop = () => {};

type Emitters = {
  emitItemDragStart: () => void,
  emitItemDragEnd: () => void,
};

type Props = {
  children: Node,
  onItemDragStart: () => void,
  onItemDragEnd: () => void,
};

const { Provider, Consumer } = React.createContext({
  emitItemDragStart: noop,
  emitItemDragEnd: noop,
});

export { Consumer as LayoutEventEmitter };

export class LayoutEventListener extends Component<Props> {
  emitters: Emitters;

  static defaultProps = {
    onItemDragStart: noop,
    onItemDragEnd: noop,
  };

  constructor(props: Props) {
    super(props);
    this.emitters = {
      emitItemDragStart: this.emitItemDragStart,
      emitItemDragEnd: this.emitItemDragEnd,
    };
  }

  emitItemDragStart = () => {
    this.props.onItemDragStart();
  };

  emitItemDragEnd = () => {
    this.props.onItemDragEnd();
  };

  render() {
    return <Provider value={this.emitters}>{this.props.children}</Provider>;
  }
}
