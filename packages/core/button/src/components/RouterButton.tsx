import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../types';
import Button from './Button';

export default function RouterButton(props: ButtonProps) {
  return (
    <Button
      component={React.forwardRef<
        HTMLElement,
        React.AllHTMLAttributes<HTMLElement>
      >(({ to = '', children, ...rest }, ref: any) => (
        <Link {...rest} to={to} innerRef={ref}>
          {children}
        </Link>
      ))}
      {...props}
    />
  );
}
