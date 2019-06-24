import Button from '@uidu/button';
import React, { PureComponent } from 'react';
import { ArrowRight } from 'react-feather';

export default class NavigationNext extends PureComponent<any> {
  render() {
    const { getStyles, innerProps } = this.props;
    return (
      <Button style={getStyles('navigationNext', this.props)} {...innerProps}>
        <ArrowRight />
      </Button>
    );
  }
}
