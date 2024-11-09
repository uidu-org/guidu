import Tooltip from '@uidu/tooltip';
import React, { Component, ReactNode } from 'react';
import { getProps, getStyledAvatar } from '../helpers';
import { mapProps, withPseudoState } from '../hoc';
import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import { ICON_SIZES } from '../styled/constants';
import { Theme } from '../theme';
import {
  AppearanceType,
  AvatarPropTypes,
  IndicatorSizeType,
  SizeType,
} from '../types';
import { omit } from '../utils';
import AvatarImage from './AvatarImage';
import { propsOmittedFromClickData } from './constants';
import Presence from './Presence';
import Status from './Status';

const validIconSizes = Object.keys(ICON_SIZES);

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production' && !process.env.CI) {
    console.warn(message); // eslint-disable-line no-console
  }
};

class Avatar extends Component<AvatarPropTypes> {
  ref?: HTMLElement;

  static defaultProps = {
    appearance: 'circle' as AppearanceType,
    enableTooltip: true,
    size: 'medium' as SizeType,
  };

  // expose blur/focus to consumers via ref
  blur = () => {
    if (this.ref) this.ref.blur();
  };

  focus = () => {
    if (this.ref) this.ref.focus();
  };

  // disallow click on disabled avatars
  // only return avatar data properties
  guardedClick = (event: React.MouseEvent) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled || typeof onClick !== 'function') return;

    const item = omit(this.props, ...propsOmittedFromClickData);

    onClick({ item, event });
  };

  // enforce status / presence rules
  /* eslint-disable no-console */
  renderIcon = (): ReactNode | undefined => {
    const { appearance, borderColor, presence, status } = this.props;
    const showPresence = Boolean(presence);
    const showStatus = Boolean(status);

    // no icon needed
    if (!showStatus && !showPresence) {
      return null;
    }

    if (showStatus && showPresence) {
      warn('Avatar supports `presence` OR `status` properties, not both.');
      return null;
    }

    // only support particular sizes
    if (validIconSizes.indexOf(this.props.size!) === -1) {
      warn(
        `Avatar size "${String(this.props.size)}" does NOT support ${
          showPresence ? 'presence' : 'status'
        }`,
      );
      return null;
    }

    // we can cast here because we already know that it is a valid icon size
    const size = this.props.size as IndicatorSizeType;

    const indicator: ReactNode = (() => {
      if (showPresence) {
        const customPresenceNode =
          typeof presence === 'object' ? presence : null;

        return (
          <PresenceWrapper appearance={appearance!} size={size}>
            <Presence
              borderColor={borderColor}
              presence={!customPresenceNode && presence}
              size={size}
            >
              {customPresenceNode}
            </Presence>
          </PresenceWrapper>
        );
      }

      // showStatus
      const customStatusNode = typeof status === 'object' ? status : null;

      return (
        <StatusWrapper appearance={appearance!} size={size}>
          <Status
            borderColor={borderColor}
            status={!customStatusNode && status}
            size={size}
          >
            {customStatusNode}
          </Status>
        </StatusWrapper>
      );
    })();

    return indicator;
  };

  setRef = (ref?: HTMLElement) => {
    this.ref = ref;
  };

  render() {
    const {
      appearance,
      enableTooltip,
      name,
      size,
      src,
      stackIndex,
      onClick,
      theme,
    } = this.props;

    // distill props from context, props, and state
    const enhancedProps: AvatarPropTypes = getProps(this);

    // provide element interface based on props
    const Inner: any = getStyledAvatar(this.props);

    Inner.displayName = 'Inner';

    const AvatarNode = (
      <Theme.Provider value={theme}>
        <Outer size={size!} stackIndex={stackIndex}>
          <Inner
            innerRef={this.setRef}
            {...enhancedProps}
            onClick={onClick != null ? this.guardedClick : undefined}
          >
            <AvatarImage
              alt={name}
              appearance={appearance!}
              size={size!}
              src={src}
            />
          </Inner>
          {this.renderIcon()}
        </Outer>
      </Theme.Provider>
    );

    return enableTooltip && name ? (
      <Tooltip content={name}>{AvatarNode}</Tooltip>
    ) : (
      AvatarNode
    );
  }
}

export const AvatarWithoutAnalytics = mapProps<AvatarPropTypes>({
  appearance: (props) => props.appearance || Avatar.defaultProps.appearance,
  isInteractive: (props) =>
    Boolean(
      (typeof props.enableTooltip !== 'undefined'
        ? props.enableTooltip
        : Avatar.defaultProps.enableTooltip) && props.name,
    ),
})(withPseudoState(Avatar));

export default AvatarWithoutAnalytics;
