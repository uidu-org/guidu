import * as colors from '@uidu/theme/colors';
import { difference } from 'chromatism';
import React, { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import Color from './Color';
import { PaletteColor } from './Palettes/type';
import { ColorPaletteWrapper } from './styles';

export interface Props {
  palette: PaletteColor[];
  selectedColor: string | null;
  onClick: (value: string) => void;
  cols?: number;
  className?: string;
}

/**
 * For a given color pick the color from a list of colors with
 * the highest contrast
 *
 * @param color color string, suppports HEX, RGB, RGBA etc.
 * @return Highest contrast color in pool
 */
export function getContrastColor(color: string, pool: string[]): string {
  return pool.sort((a, b) => difference(b, color) - difference(a, color))[0];
}

class ColorPalette extends PureComponent<Props & WrappedComponentProps, any> {
  render() {
    const {
      palette,
      cols = 7,
      onClick,
      selectedColor,
      className,
      intl: { formatMessage },
    } = this.props;

    return (
      <ColorPaletteWrapper
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {palette.map(({ value, label, border, message }) => (
          <Color
            key={value}
            value={value}
            borderColor={border}
            label={message ? formatMessage(message) : label}
            onClick={onClick}
            isSelected={value === selectedColor}
            checkMarkColor={getContrastColor(value, [colors.N0, colors.N500])}
          />
        ))}
      </ColorPaletteWrapper>
    );
  }
}

export default injectIntl(ColorPalette);
