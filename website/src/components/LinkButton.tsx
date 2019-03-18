import * as React from 'react';
import { Link } from './WrappedLink';
import Button from '@uidu/button';

export type LinkButtonProps = {
  to: string;
  children: React.ReactChild;
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
