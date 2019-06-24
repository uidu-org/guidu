import Button from '@uidu/button';
import React, { PureComponent } from 'react';
import { ArrowLeft } from 'react-feather';

export default class NavigationPrev extends PureComponent<any> {
  render() {
    const { getStyles, innerProps } = this.props;
    return (
      <Button style={getStyles('navigationPrev', this.props)} {...innerProps}>
        <ArrowLeft />
      </Button>
    );
  }
}
