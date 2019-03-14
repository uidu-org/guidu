import * as React from 'react';
import { Component } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { Color } from '../../../../common';

import Button from '@atlaskit/button';
import {
  ColorSample,
  DropdownRightIconWrapper,
  DropdownLeftIconWrapper,
} from './styles';

export interface ColorButtonProps {
  readonly color: Color;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

export class ColorButton extends Component<ColorButtonProps> {
  render() {
    const { color, isActive, onClick } = this.props;
    const { red, green, blue } = color;
    const style = { backgroundColor: `rgb(${red}, ${green}, ${blue})` };

    const iconBefore = (
      <DropdownLeftIconWrapper>
        <ColorSample style={style} />
      </DropdownLeftIconWrapper>
    );
    const iconAfter = (
      <DropdownRightIconWrapper>
        <ChevronDownIcon label="chevron-icon" />
      </DropdownRightIconWrapper>
    );
    return (
      <Button
        iconBefore={iconBefore}
        iconAfter={iconAfter}
        appearance="subtle"
        onClick={onClick}
        isSelected={isActive}
      />
    );
  }
}
