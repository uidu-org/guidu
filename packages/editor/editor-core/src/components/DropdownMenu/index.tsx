import DropList from '@uidu/droplist';
import { akEditorFloatingPanelZIndex, Popup } from '@uidu/editor-common';
import Item, { ItemGroup } from '@uidu/item';
import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import styled from 'styled-components';
import withOuterListeners from '../with-outer-listeners';

const Wrapper = styled.div`
  line-height: 0;
`;

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isOpen?: boolean;
  onOpenChange?: (attrs: any) => void;
  onItemActivated?: (attrs: any) => void;
  onMouseEnter?: (attrs: any) => void;
  onMouseLeave?: (attrs: any) => void;
  fitWidth?: number;
  fitHeight?: number;
  offset?: Array<number>;
  zIndex?: number;
  items: Array<{
    items: MenuItem[];
  }>;
}

export interface MenuItem {
  key?: string;
  content: string | ReactElement<any>;
  elemBefore?: React.ReactNode;
  elemAfter?: React.ReactNode;
  tooltipDescription?: string;
  tooltipPosition?: string;
  isActive: boolean;
  isDisabled?: boolean;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}

const DropListWithOutsideListeners: any = withOuterListeners(DropList);

/**
 * Hack for item to imitate old dropdown-menu selected styles
 */
const ItemWrapper: any = styled.div`
  ${(props: any) =>
    props.isSelected
      ? '&& > span, && > span:hover { background: #6c798f; color: #fff; }'
      : ''};
`;

const ItemContentWrapper: any = styled.span`
  ${(props: any) => (props.hasElemBefore ? 'margin-left: 8px;' : '')};
`;

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

  private renderItem(item: typeof Item) {
    const { onItemActivated, onMouseEnter, onMouseLeave } = this.props;

    // onClick and value.name are the action indicators in the handlers
    // If neither are present, don't wrap in an Item.
    if (!item.onClick && !item.value && !item.value.name) {
      return <span key={String(item.content)}>{item.content}</span>;
    }

    const dropListItem = (
      <ItemWrapper key={item.key || item.content} isSelected={item.isActive}>
        <Item
          elemBefore={item.elemBefore}
          elemAfter={item.elemAfter}
          isDisabled={item.isDisabled}
          onClick={() => onItemActivated && onItemActivated({ item })}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ item })}
          onMouseLeave={() => onMouseLeave && onMouseLeave({ item })}
          className={item.className}
        >
          <ItemContentWrapper hasElemBefore={!!item.elemBefore}>
            {item.content}
          </ItemContentWrapper>
        </Item>
      </ItemWrapper>
    );

    if (item.tooltipDescription) {
      return (
        <Tooltip
          key={item.content}
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
          <div>
            <div style={{ height: 0, minWidth: fitWidth || 0 }} />
            {items.map((group, index) => (
              <ItemGroup key={index}>
                {group.items.map(item => this.renderItem(item))}
              </ItemGroup>
            ))}
          </div>
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
