import * as React from 'react';
import { Component } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import { Color } from '../../../../common';

import { ColorButton } from './colorButton';
import { ColorPopupContentWrapper } from './popupStyles';

const colors = [
  { red: 0x17, green: 0x2b, blue: 0x4d },
  { red: 0x00, green: 0x49, blue: 0xb0 },
  { red: 0x00, green: 0x66, blue: 0x44 },
  { red: 0xff, green: 0x8b, blue: 0x00 },
  { red: 0xbf, green: 0x26, blue: 0x00 },
  { red: 0x40, green: 0x32, blue: 0x94 },
  { red: 0x97, green: 0xa0, blue: 0xaf },
  { red: 0x26, green: 0x84, blue: 0xff },
  { red: 0x57, green: 0xd9, blue: 0xa3 },
  { red: 0xff, green: 0xe3, blue: 0x80 },
  { red: 0xff, green: 0x8f, blue: 0x73 },
  { red: 0x87, green: 0x77, blue: 0xd9 },
];

export interface ColorPopupProps {
  readonly isOpen: boolean;
  readonly color: Color;
  readonly onPickColor: (color: Color) => void;
}

export class ColorPopup extends Component<ColorPopupProps> {
  render() {
    const { isOpen, children } = this.props;
    const content = (
      <ColorPopupContentWrapper>
        {this.renderButtons()}
      </ColorPopupContentWrapper>
    );
    return (
      <InlineDialog isOpen={isOpen} placement="top-start" content={content}>
        {children}
      </InlineDialog>
    );
  }

  private renderButtons(): JSX.Element[] {
    const { onPickColor, color: currentColor } = this.props;

    return colors.map((color, index) => (
      <ColorButton
        key={`${index}`}
        color={color}
        currentColor={currentColor}
        onClick={onPickColor}
      />
    ));
  }
}
