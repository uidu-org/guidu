import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import { NoAccessWarning } from '../utils/i18n';

type Props = {
  name: string;
  children: React.ReactNode;
};

export const NoAccessTooltip = ({ name, children }: Props) => (
  <NoAccessWarning name={name}>
    {text => (
      <Tooltip content={text} position="right">
        {children}
      </Tooltip>
    )}
  </NoAccessWarning>
);
