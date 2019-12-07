import Tooltip from '@uidu/tooltip';
import React, { PureComponent } from 'react';
import StyledGlobalItem, { StyledGlobalItemButton } from './styled';

export default class GlobalItem extends PureComponent<any> {
  static defaultProps = {
    as: 'a',
    badge: undefined,
    tooltip: undefined,
  };

  render() {
    const { badge, tooltip } = this.props;
    const content = (
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
    );

    if (tooltip) {
      return (
        <Tooltip
          delay={0}
          content={tooltip}
          position="right"
          hideTooltipOnClick
          hideTooltipOnMouseDown
        >
          {content}
        </Tooltip>
      );
    }
    return content;
  }
}
