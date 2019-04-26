import React, { PureComponent } from 'react';
import Tooltip from '@uidu/tooltip';
import StyledGlobalItem, { StyledGlobalItemButton } from './styled';

export default class GlobalItem extends PureComponent<any> {
  static defaultProps = {
    as: 'button',
    badge: undefined,
    tooltip: undefined,
  };

  render() {
    const { badge, tooltip } = this.props;
    return (
      <Tooltip
        delay={0}
        content={tooltip}
        position="right"
        hideTooltipOnClick
        hideTooltipOnMouseDown
      >
        <StyledGlobalItem>
          <StyledGlobalItemButton {...this.props} />
          {!!badge && (
            <div
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                userSelect: 'none',
                left: '20px',
                top: '-4px',
              }}
            >
              {badge}
            </div>
          )}
        </StyledGlobalItem>
      </Tooltip>
    );
  }
}
