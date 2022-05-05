import { theme } from 'twin.macro';
import type { Appearance } from '../types';

export type WidthNames = 'small' | 'medium' | 'large' | 'x-large';

interface Width {
  values: string[];
  widths: { [index in WidthNames]: number };
  defaultValue: string;
}

export const width: Width = {
  values: ['small', 'medium', 'large', 'x-large'],
  widths: {
    small: 400,
    medium: 600,
    large: 800,
    'x-large': 968,
  },
  defaultValue: 'medium',
};

export const gutter = 60;

export const keylineHeight = 2;
export const keylineColor = 'rgba(var(--border), .5)';

export const iconColor: { [key in Appearance]: string } = {
  danger: theme`colors.red.600`,
  warning: theme`colors.yellow.600`,
} as const;
