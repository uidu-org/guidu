import { ButtonAppearances } from '@uidu/button';
import { ReactNode } from 'react';

interface Action {
  onClick?: (e: any) => any;
  key?: string;
  text?: ReactNode;
  appearance?: ButtonAppearances;
}

export type Actions = Action[];
