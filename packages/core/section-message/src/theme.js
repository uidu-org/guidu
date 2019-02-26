// @flow
import type { ComponentType } from 'react';
import { colors } from '@uidu/theme';

import {
  Info,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  AlertTriangle,
} from 'react-feather';

type Appearance = {
  backgroundColor: string,
  primaryIconColor: string,
  Icon: ComponentType<*>,
};

export const baseAppearanceObj: { [string]: Appearance } = {
  info: {
    backgroundColor: colors.B50,
    Icon: Info,
    primaryIconColor: colors.B500,
  },
  warning: {
    backgroundColor: colors.Y50,
    Icon: AlertTriangle,
    primaryIconColor: colors.Y500,
  },
  error: {
    backgroundColor: colors.R50,
    Icon: AlertCircle,
    primaryIconColor: colors.R500,
  },
  confirmation: {
    backgroundColor: colors.G50,
    Icon: CheckCircle,
    primaryIconColor: colors.G500,
  },
  change: {
    backgroundColor: colors.P50,
    Icon: HelpCircle,
    primaryIconColor: colors.P500,
  },
};
