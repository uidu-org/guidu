// @flow
import React, { createElement, Component, type ElementType } from 'react';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import type { AppearanceType } from '../types';
import {
  Header,
  Title,
  TitleText,
  TitleIconWrapper as IconWrapper,
} from '../styled/Content';

const icon = { danger: ErrorIcon, warning: WarningIcon };
const TitleIcon = ({ appearance }: { appearance?: 'danger' | 'warning' }) => {
  if (!appearance) return null;

  const Icon = icon[appearance];

  return (
    <IconWrapper appearance={appearance}>
      <Icon label={`${appearance} icon`} />
    </IconWrapper>
  );
};

type Props = {
  /** Appearance of the primary button. Also adds an icon to the heading, if provided. */
  appearance?: AppearanceType,
  /**
    Boolean OR Function indicating which element to focus when the component mounts
    TRUE will automatically find the first "tabbable" element within the modal
    Providing a function should return the element you want to focus
  */
  /** Component to render the header of the modal. */
  component?: ElementType,
  /** The modal heading */
  heading?: string,
  /** Function to close the dialog */
  onClose: Function,
  /** Whether or not to display a line under the header */
  showKeyline?: boolean,
  /**
   * Makes heading multiline.
   * If false and heading is longer than one line overflow will be not displayed.
   */
  isHeadingMultiline?: boolean,
};

export default class ModalHeader extends Component<Props, {}> {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    isHeadingMultiline: true,
  };

  render() {
    const {
      appearance,
      component,
      heading,
      onClose,
      showKeyline,
      isHeadingMultiline,
    } = this.props;
    const warning = 'You can provide `component` OR `heading`, not both.';

    if (!component && !heading) return null;
    if (component && heading) return console.warn(warning); // eslint-disable-line no-console
    if (component) {
      return createElement(component, {
        appearance,
        onClose,
        showKeyline,
        isHeadingMultiline,
      });
    }

    return (
      <Header showKeyline={showKeyline}>
        <Title isHeadingMultiline={isHeadingMultiline}>
          <TitleIcon appearance={appearance} />
          <TitleText isHeadingMultiline={isHeadingMultiline}>
            {heading}
          </TitleText>
        </Title>
      </Header>
    );
  }
}
