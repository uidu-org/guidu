import React, { PureComponent } from 'react';
import { StyledImage } from './styled';

export default class Image extends PureComponent<any> {
  render() {
    const { src } = this.props;
    return <StyledImage style={{ backgroundImage: "url('" + src + "')" }} />;
  }
}
