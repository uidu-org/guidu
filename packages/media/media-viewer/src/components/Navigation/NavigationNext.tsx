import Button from '@uidu/button';
import React from 'react';
import { ArrowRight } from 'react-feather';

export default function NavigationNext({
  getStyles = (s, p) => {},
  innerProps,
  ...rest
}) {
  return (
    <Button style={getStyles('navigationNext', rest)} {...innerProps}>
      <ArrowRight />
    </Button>
  );
}
