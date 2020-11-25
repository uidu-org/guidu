import { FC, ReactNode } from 'react';

export type ShellStep = {
  component: FC<any>;
  relativePath: string;
  name: ReactNode;
  isDisabled?: boolean;
  isCompleted?: boolean;
  nextStepRelativePath?: string;
  unwrapped?: boolean;
};

export type ShellProps = {
  baseUrl: string;
  steps: Array<ShellStep>;
  scope: string;
  embedded?: boolean;
};
