import DropList from '@uidu/droplist';
import { akEditorFloatingPanelZIndex, Popup } from '@uidu/editor-common';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import Tooltip from '@uidu/tooltip';
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import withOuterListeners from '../with-outer-listeners';
import { MenuItem, Props, State } from './types';

const Wrapper = styled.div`
  line-height: 0;
`;

const DropListWithOutsideListeners: any = withOuterListeners(DropList);

/**
 * Wrapper around @uidu/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class DropdownMenuWrapper extends PureComponent<Props, State> {
  state: State = {
    popupPlacement: ['bottom', 'left'],
  };

  private handleRef = (target: HTMLElement | null) => {
    this.setState({ target: target || undefined });
  };

  private updatePopupPlacement = (placement: [string, string]) => {
    this.setState({ popupPlacement: placement });
  };

  private handleClose = () => {
    if (this.props.onOpenChange) {
      this.props.onOpenChange({ isOpen: false });
    }
  };

  private renderItem(item: MenuItem) {
    const { onItemActivated } = this.props;

    // onClick and value.name are the action indicators in the handlers
    // If neither are present, don't wrap in an Item.
    if (!item.onClick && !item.value && !item.value.name) {
      return <span key={String(item.content)}>{item.content}</span>;
    }

    const dropListItem = (
      <Fragment key={item.key}>
        <ButtonItem
          iconBefore={item.iconBefore}
          iconAfter={item.iconAfter}
          isDisabled={item.isDisabled}
          isSelected={item.isSelected}
          onClick={() => onItemActivated && onItemActivated({ item })}
        >
          {item.content}
        </ButtonItem>
      </Fragment>
    );

    if (item.tooltipDescription) {
      return (
        <Tooltip
          key={item.key}
          content={item.tooltipDescription}
          position={item.tooltipPosition}
        >
          {dropListItem}
        </Tooltip>
      );
    }

    return dropListItem;
  }

  private renderDropdownMenu() {
    const { target, popupPlacement } = this.state;
    const {
      items,
      mountTo,
      boundariesElement,
      scrollableElement,
      offset,
      fitHeight,
      fitWidth,
      isOpen,
      zIndex,
    } = this.props;

    return (
      <Popup
        target={isOpen ? target : undefined}
        mountTo={mountTo}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        onPlacementChanged={this.updatePopupPlacement}
        fitHeight={fitHeight}
        fitWidth={fitWidth}
        zIndex={zIndex || akEditorFloatingPanelZIndex}
        offset={offset}
      >
        <DropListWithOutsideListeners
          isOpen={true}
          appearance="tall"
          position={popupPlacement.join(' ')}
          shouldFlip={false}
          shouldFitContainer={true}
          isTriggerNotTabbable={true}
          handleClickOutside={this.handleClose}
          handleEscapeKeydown={this.handleClose}
        >
          {items.map((group, index) => (
            <MenuGroup key={index}>
              {group.items.map((item) => this.renderItem(item))}
            </MenuGroup>
          ))}
        </DropListWithOutsideListeners>
      </Popup>
    );
  }

  render() {
    const { children, isOpen } = this.props;

    return (
      <Wrapper>
        <div ref={this.handleRef}>{children}</div>
        {isOpen ? this.renderDropdownMenu() : null}
      </Wrapper>
    );
  }
}
