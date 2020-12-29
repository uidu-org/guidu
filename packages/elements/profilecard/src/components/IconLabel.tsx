import IconEmail from '@atlaskit/icon/glyph/email';
import IconLocation from '@atlaskit/icon/glyph/location';
import OfficeBuildingIcon from '@atlaskit/icon/glyph/office-building';
import IconRecent from '@atlaskit/icon/glyph/recent';
import React from 'react';
import {
  DetailsLabel,
  DetailsLabelIcon,
  DetailsLabelText,
} from '../styled/Card';

const icons = {
  location: IconLocation,
  time: IconRecent,
  email: IconEmail,
  companyName: OfficeBuildingIcon,
};

export default class IconLabel extends React.PureComponent {
  render() {
    if (!this.props.children) {
      return null;
    }
    // @ts-ignore
    const IconElement = this.props.icon && icons[this.props.icon];
    const displayIcon = IconElement
      ? React.createElement(IconElement, {
          label: `icon ${this.props.icon}`,
          size: 'small',
        })
      : null;
    return React.createElement(
      DetailsLabel,
      null,
      React.createElement(DetailsLabelIcon, null, displayIcon),
      React.createElement(DetailsLabelText, null, this.props.children),
    );
  }
}
IconLabel.defaultProps = {
  icon: '',
};
//# sourceMappingURL=IconLabel.js.map
