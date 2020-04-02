import { ButtonProps } from '@uidu/button';
import React from 'react';

export type KeyboardOrMouseEvent =
  | React.MouseEvent<any>
  | React.KeyboardEvent<any>;
export type AppearanceType = 'danger' | 'warning';

export type ActionProps = ButtonProps & { text: string };
