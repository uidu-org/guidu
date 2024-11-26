import { ButtonItem, MenuGroup } from '@uidu/menu';
import Popup from '@uidu/popup';
import Tooltip from '@uidu/tooltip';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { MenuItem, Props } from './types';

const Wrapper = styled.div`
  line-height: 0;
`;

/**
 * Wrapper around @uidu/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default function DropdownMenuWrapper(props: Props) {
  const [popupPlacement, setPopupPlacement] = useState(['bottom', 'left']);
  const [target, setTarget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleRef = (target: HTMLElement | null) => {
    setTarget(target || undefined);
  };

  const updatePopupPlacement = (placement: [string, string]) => {
    setPopupPlacement(placement);
  };

  const handleClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange({ isOpen: false });
    }
  };

  const renderItem = (item: MenuItem) => {
    const { onItemActivated } = props;

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
  };

  const renderDropdownMenu = () => {
    const { items } = props;

    return (
      <>
        {items.map((group, index) => (
          <MenuGroup key={index}>
            {group.items.map((item) => renderItem(item))}
          </MenuGroup>
        ))}
      </>
    );
  };

  return (
    <Wrapper>
      <Popup
        trigger={(triggerProps) => (
          <div {...triggerProps} onClick={() => setIsOpen((prev) => !prev)}>
            {props.children}
          </div>
        )}
        content={() => renderDropdownMenu()}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
      />
    </Wrapper>
  );
}
