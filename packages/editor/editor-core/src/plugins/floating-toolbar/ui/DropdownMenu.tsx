import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { ButtonItem } from '@uidu/menu';
import { colors, gridSize } from '@uidu/theme';
import React, { Component } from 'react';
import styled from 'styled-components';
import { DropdownOptionT } from './types';

export const menuItemDimensions = {
  width: 175,
  height: 32,
};

const Spacer = styled.span`
  display: flex;
  flex: 1;
  padding: 8px;
`;

const MenuContainer = styled.div`
  min-width: ${menuItemDimensions.width}px;
`;

export const itemSpacing = gridSize() / 2;

export interface Props {
  hide: Function;
  dispatchCommand: Function;
  items: Array<DropdownOptionT<Function>>;
}

export default class Dropdown extends Component<Props> {
  render() {
    const { hide, dispatchCommand, items } = this.props;
    return (
      <MenuContainer>
        {items
          .filter((item) => !item.hidden)
          .map((item, idx) => (
            <ButtonItem
              key={idx}
              isCompact={true}
              iconBefore={this.renderSelected(item)}
              onClick={() => {
                hide();
                dispatchCommand(item.onClick);
              }}
              isDisabled={item.disabled}
            >
              {item.title}
            </ButtonItem>
          ))}
      </MenuContainer>
    );
  }

  private renderSelected(item: DropdownOptionT<any>) {
    const { selected } = item;
    if (selected !== undefined) {
      return selected ? (
        <EditorDoneIcon
          primaryColor={colors.B400}
          size="small"
          label="test question"
        />
      ) : (
        <Spacer />
      );
    }

    return undefined;
  }
}
