// @flow

import React, { type Node } from 'react';
import { Link } from './WrappedLink';
import Button from '@uidu/button';

export type LinkButtonProps = {
  to: string,
  children: Node,
};

export default function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Button
      component={props => {
        return (
          <Link to={to} {...props}>
            {children}
          </Link>
        );
      }}
    />
  );
}
