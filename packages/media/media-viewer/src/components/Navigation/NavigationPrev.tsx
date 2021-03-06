import Button from '@uidu/button';
import React from 'react';
import { ArrowLeft } from 'react-feather';

export default function NavigationPrev({
  getStyles = (s, p) => {},
  innerProps,
  ...rest
}) {
  return (
    <Button style={getStyles('navigationPrev', rest)} {...innerProps}>
      <ArrowLeft />
    </Button>
  );
}
