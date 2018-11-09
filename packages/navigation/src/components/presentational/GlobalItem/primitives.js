// @flow

import React, { Fragment, Component } from 'react';
import { css } from 'emotion';
import Tooltip from '@atlaskit/tooltip';

import { styleReducerNoOp, withGlobalTheme } from '../../../theme';
import type { GlobalItemPresentationProps, GlobalItemStyles } from './types';

class GlobalNavigationItemPrimitive extends Component<*> {
  static defaultProps = {
    isActive: false,
    isHover: false,
    isSelected: false,
    size: 'large',
    styles: styleReducerNoOp,
  };

  renderIconAndBadge = (badgeWrapper: {}) => {
    const { icon: Icon, badge: Badge, label, tooltip } = this.props;
    const presentationProps = this.getPresentationProps();
    if (!Icon && !Badge) return null;
    return (
      <Fragment>
        {!!Icon && (
          <div css={{ pointerEvents: 'none' }}>
            <Icon label={label || tooltip} secondaryColor="inherit" />
          </div>
        )}
        {!!Badge && (
          <div css={badgeWrapper}>
            <Badge {...presentationProps} />
          </div>
        )}
      </Fragment>
    );
  };

  getGlobalItemExternalProps = () => {
    const {
      createAnalyticsEvent,
      isActive,
      isHover,
      isSelected,
      theme,
      ...externalProps
    } = this.props;

    return externalProps;
  };

  getPresentationProps = (): GlobalItemPresentationProps => {
    const { isActive, isHover, isSelected, size } = this.props;

    return { isActive, isHover, isSelected, size };
  };

  generateStyles = (): GlobalItemStyles => {
    const {
      isActive,
      isHover,
      isSelected,
      size,
      styles: styleReducer,
      theme,
    } = this.props;
    const { mode } = theme;
    const presentationProps = { isActive, isHover, isSelected, size };
    const defaultStyles = mode.globalItem(presentationProps);
    return styleReducer(defaultStyles, presentationProps);
  };

  renderChildren = (styles: GlobalItemStyles) => {
    const { href, onClick, target, component: CustomComponent } = this.props;

    let itemBase;

    if (CustomComponent) {
      itemBase = (
        <CustomComponent
          {...this.getGlobalItemExternalProps()}
          className={css({ '&&': styles.itemBase })}
        >
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </CustomComponent>
      );
    } else if (href) {
      itemBase = (
        <a
          href={href}
          onClick={onClick}
          target={target}
          className={css({ '&&': styles.itemBase })}
        >
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </a>
      );
    } else if (onClick) {
      itemBase = (
        <button onClick={onClick} className={css({ '&&': styles.itemBase })}>
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </button>
      );
    } else {
      itemBase = (
        <span className={css({ '&&': styles.itemBase })}>
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </span>
      );
    }

    return itemBase;
  };

  render() {
    const { isSelected, tooltip } = this.props;
    const styles = this.generateStyles();
    return (
      <Tooltip
        delay={0}
        content={isSelected ? undefined : tooltip}
        position="right"
        hideTooltipOnClick
        hideTooltipOnMouseDown
      >
        <div className={css({ display: 'inline-block' })}>
          {this.renderChildren(styles)}
        </div>
      </Tooltip>
    );
  }
}

export { GlobalNavigationItemPrimitive as BaseGlobalNavigationItemPrimitive };

export default withGlobalTheme(GlobalNavigationItemPrimitive);
