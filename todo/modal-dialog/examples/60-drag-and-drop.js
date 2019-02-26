// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component, PureComponent, type Node } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Modal, { ModalTransition } from '../src';

const noop = () => {};

const gridUnit = 4;

const Card = styled.div`
  background: ${colors.Y75};
  border-radius: 3px;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'pointer')};
  display: flex;
  position: relative;
  height: ${gridUnit * 5}px;
  padding: ${gridUnit * 2}px ${gridUnit}px;
  border-bottom: 1px solid ${colors.R200};
  ${({ isDraggable }) => !isDraggable} ${({ isHovering }) =>
  isHovering &&
  `
        background: ${colors.R75};
        text-decoration: none;
    `} ${({ isActive }) =>
  isActive &&
  `
        background: ${colors.G300};
    `} &:focus {
    border-bottom-color: transparent;
    z-index: 1;
  }
`;

const isMiddleClick = event => event.button === 1;

type Item = {
  id: string,
  message: string,
};

type ItemLineCardProps = {
  item: Item,
  index: number,
  isReorderEnabled: boolean,
  children: (
    isHovering: boolean,
    isActive: boolean,
    isFocused: boolean,
    item: Item,
  ) => Node,
  onClick: (item: Item, e?: any) => void,
};

type ItemLineCardState = {
  isHovering: boolean,
  isActive: boolean,
  isFocused: boolean,
};

class ItemLineCard extends Component<ItemLineCardProps, ItemLineCardState> {
  static defaultProps = {
    isReorderEnabled: true,
    onClick: noop,
  };

  state = {
    isHovering: false,
    isActive: false,
    isFocused: false,
  };

  eventHandlers = {
    onBlur: () => this.setState({ isFocused: false }),
    onClick: event => {
      // Middle clicks are handled in onMouseDown
      // for cross browser support.
      if (!isMiddleClick(event)) {
        this.propagateClick(event);
      }
    },
    onDragEnd: () => this.setState({ isActive: false }),
    onFocus: () => this.setState({ isFocused: true }),
    onMouseEnter: () => this.setState({ isHovering: true }),
    onMouseLeave: () => this.setState({ isHovering: false, isActive: false }),
    onMouseDown: event => {
      if (isMiddleClick(event)) {
        this.propagateClick(event);
      }
      this.setState({ isActive: true });
    },
    onMouseUp: () => this.setState({ isActive: false }),
  };

  propagateClick = event => {
    event.persist();
    this.props.onClick(this.props.item, event);
  };

  patchedHandlers = dragHandleProps => {
    // The 'isActive' state is determined by the
    // draggable state, i.e. if isDragging then
    // the state is considered active. The below
    // ensures the events are still propagated
    // correctly to the drag-and-drop library.
    const onMouseDown = (() => event => {
      if (isMiddleClick(event)) {
        this.propagateClick(event);
      }
      if (dragHandleProps && dragHandleProps.onMouseDown) {
        dragHandleProps.onMouseDown(event);
      }
    })();
    return {
      ...dragHandleProps,
      ...this.eventHandlers,
      onMouseDown,
    };
  };

  renderCard = cardProps => {
    const { isHovering, isFocused } = this.state;
    const isActive = !!cardProps.isDragging || this.state.isActive;
    return (
      <Card {...cardProps} {...this.state} isActive={isActive}>
        {this.props.children(isHovering, isActive, isFocused, this.props.item)}
      </Card>
    );
  };

  renderDraggableCard() {
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div>
            {this.renderCard({
              innerRef: ref => provided.innerRef(ref),
              isDraggable: true,
              isDragging: snapshot.isDragging,
              ...provided.draggableProps,
              ...this.patchedHandlers(provided.dragHandleProps),
            })}
          </div>
        )}
      </Draggable>
    );
  }

  render() {
    return this.renderDraggableCard();
  }
}

type ItemLineCardGroupProps = {
  groupId: string,
  items: Item[],
  children: (
    isHovering: boolean,
    isActive: boolean,
    isFocused: boolean,
    item: Item,
  ) => Node,
  onOrderChange: (
    items: Item[],
    target: Item,
    sourceIndex: number,
    destIndex: number,
  ) => void,
  onClick: () => void,
};

class ItemLineCardGroup extends Component<ItemLineCardGroupProps> {
  static defaultProps = {
    onOrderChange: noop,
    onClick: noop,
  };

  onDragEnd = result => {
    const source = result.source;
    const destination = result.destination;

    if (!destination || source.droppableId !== destination.droppableId) {
      return;
    }

    const items = [...this.props.items];
    const target = items.find(item => item.id === result.draggableId);

    if (!target) {
      return;
    }

    // Move the dropped item into the correct spot
    items.splice(source.index, 1);
    items.splice(destination.index, 0, target);

    this.props.onOrderChange(items, target, source.index, destination.index);
  };

  renderCards(cardsProps = {}) {
    return (
      <div {...cardsProps}>
        {this.props.items.map((item, index) => (
          <ItemLineCard
            key={item.id}
            item={item}
            index={index}
            onClick={this.props.onClick}
          >
            {this.props.children}
          </ItemLineCard>
        ))}
      </div>
    );
  }

  renderDraggableCards() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={this.props.groupId}>
          {(provided, snapshot) =>
            this.renderCards({
              ref: provided.innerRef,
              isDraggingOver: snapshot.isDraggingOver,
              ...provided.droppableProps,
            })
          }
        </Droppable>
      </DragDropContext>
    );
  }

  render() {
    return this.renderDraggableCards();
  }
}

const items = [...new Array(5).keys()].map(item => ({
  id: `id-${item}`,
  message: `Line item card ${item}: `,
}));

type WrapperState = {
  items: Item[],
};

class Wrapper extends Component<*, WrapperState> {
  state = {
    items: [...items],
  };

  render() {
    return (
      <ItemLineCardGroup
        groupId="test-group"
        items={this.state.items}
        onOrderChange={updated => {
          this.setState({ items: [...updated] });
        }}
        isReorderEnabled
        onClick={() => console.log('on click')}
      >
        {(isHovering, isActive, isFocused, item) => (
          <div>
            <span>{item.message}</span>
            <span>
              isHovering=
              {isHovering.toString()}
            </span>
            <span>
              , isActive=
              {isActive.toString()}
            </span>
            <span>
              , isFocused=
              {isFocused.toString()}
            </span>
          </div>
        )}
      </ItemLineCardGroup>
    );
  }
}

type State = {
  isOpen: boolean,
};
export default class extends PureComponent<{}, State> {
  state: State = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  secondaryAction = ({ target }: Object) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>
        <p>
          We remove the transform css rule used for animating transitions after
          the enter animation occurs to work around an issue in
          react-beautiful-dnd where ancestor elements with a transform property
          cause dragging position issues. See AK-4328.
        </p>
        <ModalTransition>
          {isOpen && (
            <Modal onClose={this.close}>
              <Wrapper />
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}
