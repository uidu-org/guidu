import { ButtonProps } from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import Button from './styles';

export type Props = {
  className?: string;
  disabled?: boolean;
  hideTooltip?: boolean;
  href?: string;
  iconAfter?: React.ReactElement<any>;
  iconBefore?: React.ReactElement<any>;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  target?: string;
  title?: string;
  titlePosition?: string;
} & Pick<ButtonProps, 'theme' | 'aria-label'>;

export default class ToolbarButton extends React.PureComponent<Props, {}> {
  static defaultProps = {
    className: '',
  };

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { disabled, onClick } = this.props;

    if (!disabled && onClick) {
      onClick(event);
    }
  };

  render() {
    const button = (
      <Button
        appearance="subtle"
        aria-haspopup
        className={this.props.className}
        href={this.props.href}
        aria-label={this.props['aria-label']}
        iconAfter={this.props.iconAfter}
        iconBefore={this.props.iconBefore}
        isDisabled={this.props.disabled}
        isSelected={this.props.selected}
        onClick={this.handleClick}
        spacing={this.props.spacing || 'default'}
        target={this.props.target}
        theme={this.props.theme}
        shouldFitContainer
      >
        {this.props.children}
      </Button>
    );

    const position = this.props.titlePosition || 'top';
    const tooltipContent = !this.props.hideTooltip ? this.props.title : null;

    return this.props.title ? (
      <Tooltip
        content={tooltipContent}
        hideTooltipOnClick={true}
        position={position}
      >
        {button}
      </Tooltip>
    ) : (
      button
    );
  }
}
