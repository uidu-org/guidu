import * as React from 'react';
import { Component } from 'react';
import MediaServicesButtonOptionIcon from '@atlaskit/icon/glyph/media-services/button-option';
import { OptionsIconWrapper } from './styles';

export interface OptionsIconProps {
  readonly isActive: boolean;
}

// Small triangle in the right bottom corner of the buttons for color and line width
export class OptionsIcon extends Component<OptionsIconProps> {
  render() {
    const { isActive } = this.props;

    return (
      <OptionsIconWrapper isActive={isActive}>
        <MediaServicesButtonOptionIcon label="options" />
      </OptionsIconWrapper>
    );
  }
}
