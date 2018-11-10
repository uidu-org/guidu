// @flow

import { Component, type Node } from 'react';
import type { DropResult } from 'react-beautiful-dnd';

import updateSortableItems from './update-sortable-items';
import type { ItemsByGroup } from './types';

type Props = {
  children: State => Node,
};

type State = {
  sortableItems: ItemsByGroup,
  onDragEnd: DropResult => void,
  setItems: ItemsByGroup => void,
};

export default class SortableItemState extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortableItems: {},
      onDragEnd: this.onDragEnd,
      setItems: this.setItems,
    };
  }

  onDragEnd = (dropResult: DropResult) => {
    const updatedItems = updateSortableItems(
      this.state.sortableItems,
      dropResult,
    );
    if (updatedItems) {
      this.setState({
        sortableItems: updatedItems,
      });
    }
  };

  setItems = (items: ItemsByGroup) => {
    this.setState({
      sortableItems: items,
    });
  };

  render() {
    return this.props.children(this.state);
  }
}
