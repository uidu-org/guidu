import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import UiDropdown from '../../../components/Dropdown';
import withOuterListeners from '../../../components/with-outer-listeners';
import Button from './Button';
import DropdownMenu, { itemSpacing, menuItemDimensions } from './DropdownMenu';

const DropdownWithOutsideListeners = withOuterListeners(UiDropdown);

export interface RenderOptionsPropsT<T> {
  hide: () => void;
  dispatchCommand: (command: T) => void;
}

export interface DropdownOptionT<T> {
  title: string;
  onClick: T;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export type DropdownOptions<T> =
  | Array<DropdownOptionT<T>>
  | {
      render: (props: RenderOptionsPropsT<T>) => React.ReactElement<any> | null;
      height: number;
      width: number;
    };

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

export default class Dropdown extends Component<Props, State> {
  state: State = { isOpen: false };

  render() {
    const { isOpen } = this.state;
    const {
      title,
      icon,
      options,
      dispatchCommand,
      mountPoint,
      boundariesElement,
      scrollableElement,
      hideExpandIcon,
    } = this.props;

    let trigger;
    if (icon) {
      const TriggerIcon = hideExpandIcon ? icon : <CompositeIcon icon={icon} />;
      trigger = (
        <Button
          title={title}
          icon={TriggerIcon}
          onClick={this.toggleOpen}
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
          onClick={this.toggleOpen}
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
      <DropdownWithOutsideListeners
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        isOpen={isOpen}
        handleClickOutside={this.hide}
        handleEscapeKeydown={this.hide}
        fitWidth={fitWidth + fitTolerance}
        fitHeight={fitHeight + fitTolerance}
        trigger={trigger}
      >
        {Array.isArray(options)
          ? this.renderArrayOptions(options)
          : options.render({ hide: this.hide, dispatchCommand })}
      </DropdownWithOutsideListeners>
    );
  }

  private renderArrayOptions = (options: Array<DropdownOptionT<Function>>) => (
    <DropdownMenu
      hide={this.hide}
      dispatchCommand={this.props.dispatchCommand}
      items={options}
    />
  );

  private toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private hide = () => {
    this.setState({ isOpen: false });
  };
}
