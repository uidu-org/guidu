import * as React from 'react';
import { PureComponent } from 'react';
import Color from './Color';

import { ColorPaletteWrapper } from './styles';

export interface Props {
  palette: Map<string, string>;
  selectedColor: string | null;
  borderColors: object;
  onClick: (value: string) => void;
  cols?: number;
  className?: string;
  checkMarkColor?: string;
}

export default class ColorPalette extends PureComponent<Props, any> {
  render() {
    const {
      palette,
      cols = 7,
      onClick,
      selectedColor,
      borderColors,
      className,
      checkMarkColor,
    } = this.props;

    const colors: [string, string][] = Array.from(palette.entries());

    return (
      <ColorPaletteWrapper
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {colors.map(([color, label]) => (
          <Color
            key={color}
            value={color}
            borderColor={
              (borderColors as any)[label.toLowerCase() || 'transparent']
            }
            label={label}
            onClick={onClick}
            isSelected={color === selectedColor}
            checkMarkColor={checkMarkColor}
          />
        ))}
      </ColorPaletteWrapper>
    );
  }
}
