import * as React from 'react';
import { Component } from 'react';

import MoreIcon from '@atlaskit/icon/glyph/more';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@uidu/dropdown-menu';

import { CardAction } from '../../actions';
import { CardActionButton } from './styled';

export type CardActionsDropdownMenuProps = {
  readonly actions: CardAction[];

  readonly triggerColor?: string;
  readonly onOpenChange?: (attrs: { isOpen: boolean }) => void;
};

export class CardActionsDropdownMenu extends Component<
  CardActionsDropdownMenuProps
> {
  render(): JSX.Element | null {
    const { actions, triggerColor, onOpenChange } = this.props;

    if (actions.length > 0) {
      return (
        <DropdownMenu
          onOpenChange={onOpenChange}
          trigger={
            <CardActionButton style={{ color: triggerColor }}>
              <MoreIcon label="more" />
            </CardActionButton>
          }
        >
          <DropdownItemGroup>
            {actions.map(({ label, handler }, index) => (
              <DropdownItem key={index} onClick={handler}>
                {label}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      );
    } else {
      return null;
    }
  }
}
