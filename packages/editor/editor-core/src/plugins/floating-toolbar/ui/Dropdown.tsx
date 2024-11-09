import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import UiDropdown from '../../../ui/Dropdown';
import Button from './Button';
import DropdownMenu, { itemSpacing, menuItemDimensions } from './DropdownMenu';
import { DropdownOptions, DropdownOptionT } from './types';

const DropdownExpandContainer = styled.span`
  margin-left: -8px;
`;

const IconGroup = styled.div`
  display: flex;
`;

const CompositeIcon = ({ icon }: { icon: React.ReactChild }) => (
  <IconGroup>
    {icon}
    <DropdownExpandContainer>
      <ExpandIcon label="Expand dropdown menu" />
    </DropdownExpandContainer>
  </IconGroup>
);

export interface Props {
  title: string;
  icon?: ReactElement<any>;
  hideExpandIcon?: boolean;
  options: DropdownOptions<Function>;
  dispatchCommand: (command: Function) => void;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface State {
  isOpen: boolean;
}

export default function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const hide = () => {
    setTimeout(() => setIsOpen(false), 3000);
  };

  const renderArrayOptions = (options: Array<DropdownOptionT<Function>>) => (
    <div>
      <h3>Pippo</h3>
      <DropdownMenu
        hide={hide}
        dispatchCommand={props.dispatchCommand}
        items={options}
      />
    </div>
  );

  const {
    title,
    icon,
    options,
    dispatchCommand,
    mountPoint,
    boundariesElement,
    scrollableElement,
    hideExpandIcon,
  } = props;

  let trigger;
  if (icon) {
    const TriggerIcon = hideExpandIcon ? icon : <CompositeIcon icon={icon} />;
    trigger = (
      <Button
        title={title}
        icon={TriggerIcon}
        // onClick={toggleOpen}
        selected={isOpen}
      />
    );
  } else {
    trigger = (
      <Button
        iconAfter={
          <DropdownExpandContainer>
            <ExpandIcon label="Expand dropdown menu" />
          </DropdownExpandContainer>
        }
        onClick={toggleOpen}
        selected={isOpen}
      >
        {title}
      </Button>
    );
  }

  /**
   * We want to change direction of our dropdowns a bit early,
   * not exactly when it hits the boundary.
   */
  const fitTolerance = 10;
  const fitWidth = Array.isArray(options)
    ? menuItemDimensions.width
    : options.width;
  const fitHeight = Array.isArray(options)
    ? options.length * menuItemDimensions.height + itemSpacing * 2
    : options.height;

  return (
    <UiDropdown
      // mountTo={mountPoint}
      // boundariesElement={boundariesElement}
      // scrollableElement={scrollableElement}
      // handleClickOutside={hide}
      // handleEscapeKeydown={hide}
      // fitWidth={fitWidth + fitTolerance}
      // fitHeight={fitHeight + fitTolerance}
      trigger={trigger}
    >
      {Array.isArray(options)
        ? renderArrayOptions(options)
        : options.render({ hide: hide, dispatchCommand })}
    </UiDropdown>
  );
}
