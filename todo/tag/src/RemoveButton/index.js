// @flow
import React, { PureComponent } from 'react';
import RemoveIcon from '@atlaskit/icon/glyph/cross';
import { Button } from './styled';

type Props = {
  removeText: string,
  isRounded?: boolean,
  onHoverChange?: (hovering: boolean) => mixed,
  onRemoveAction?: () => mixed,
};

export default class RemoveButton extends PureComponent<Props> {
  onKeyPress = (e: KeyboardEvent) => {
    const spacebarOrEnter = e.key === ' ' || e.key === 'Enter';

    if (spacebarOrEnter) {
      e.stopPropagation();

      if (this.props.onRemoveAction) {
        this.props.onRemoveAction();
      }
    }
  };

  onMouseOver = () => {
    if (this.props.onHoverChange) this.props.onHoverChange(true);
  };

  onMouseOut = () => {
    if (this.props.onHoverChange) this.props.onHoverChange(false);
  };

  render() {
    const { isRounded, onRemoveAction, removeText } = this.props;

    return (
      <Button
        aria-label={removeText}
        isRounded={isRounded}
        onClick={onRemoveAction}
        onKeyPress={this.onKeyPress}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        type="button"
      >
        <RemoveIcon label={removeText} size="small" />
      </Button>
    );
  }
}
