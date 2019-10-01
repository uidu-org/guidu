import { borderColorPalette, colorPalette } from '@uidu/adf-schema';
import { defineMessages } from 'react-intl';
import getColorMessage from './getColorMessage';
import { PaletteColor } from './type';

const messages = defineMessages({
  'light-gray': {
    id: 'fabric.theme.light-gray',
    defaultMessage: 'Light gray',
    description: 'Name of a color.',
  },
  purple: {
    id: 'fabric.theme.purple',
    defaultMessage: 'Purple',
    description: 'Name of a color.',
  },
  teal: {
    id: 'fabric.theme.teal',
    defaultMessage: 'Teal',
    description: 'Name of a color.',
  },
  green: {
    id: 'fabric.theme.green',
    defaultMessage: 'Green',
    description: 'Name of a color.',
  },
  red: {
    id: 'fabric.theme.red',
    defaultMessage: 'Red',
    description: 'Name of a color.',
  },
  orange: {
    id: 'fabric.theme.orange',
    defaultMessage: 'Orange',
    description: 'Name of a color.',
  },
});

const textColorPalette: Array<PaletteColor> = [];

colorPalette.forEach((label, color) => {
  const border =
    borderColorPalette[color.toUpperCase() as keyof typeof borderColorPalette];

  const key = label.toLowerCase().replace(' ', '-');
  const message = getColorMessage(messages, key);

  if (!border) {
    // eslint-disable-next-line no-console
    console.warn(`Text color palette doest not have a border for ${color} color.
You must add the respective border color in 'borderColorPalette' in 'adf-schema'.
This could be happen when someone change the colorPalette from 'adf-schema', without updating 'borderColorPalette'.
`);
  }

  textColorPalette.push({
    value: color,
    label,
    border,
    message,
  });
});

export default textColorPalette;
