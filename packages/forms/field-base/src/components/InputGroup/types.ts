import { ReactElement, ReactNode } from 'react';

export interface InputGroupProps {
  addonsAfter?: [ReactElement];
  addonsBefore?: [ReactElement];
}

export type InputGroupPosition = 'before' | 'after';

export type InputGroupPropsWithChildren = InputGroupProps & {
  children: ReactNode;
};
