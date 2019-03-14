import * as React from 'react';
import {
  ColorSquare,
  LineWidthBackCircle,
  LineWidthFrontCircle,
  ToolbarButton,
  ToolIcon,
} from './styled';
import { Color, Tool } from '../common';

import Arrow from '@atlaskit/icon/glyph/media-services/arrow';
import Brush from '@atlaskit/icon/glyph/media-services/brush';
import Line from '@atlaskit/icon/glyph/media-services/line';
import Text from '@atlaskit/icon/glyph/media-services/text';

export type ClickHandler = () => void;

export interface ButtonProps {
  selected: boolean;
  onClick: ClickHandler;
}

export interface ColorButtonProps extends ButtonProps {
  color: Color;
}

export class ColorButton extends React.Component<ColorButtonProps, {}> {
  render() {
    const { red, green, blue } = this.props.color;
    const buttonColor = `rgb(${red}, ${green}, ${blue})`;

    return (
      <ToolbarButton
        selected={this.props.selected}
        onClick={this.props.onClick}
      >
        <ColorSquare color={buttonColor} />
      </ToolbarButton>
    );
  }
}

export interface LineWidthButtonProps extends ButtonProps {
  lineWidth: number;
}

export class LineWidthButton extends React.Component<LineWidthButtonProps, {}> {
  render() {
    return (
      <ToolbarButton
        selected={this.props.selected}
        onClick={this.props.onClick}
      >
        <LineWidthBackCircle>
          <LineWidthFrontCircle width={this.props.lineWidth} />
        </LineWidthBackCircle>
      </ToolbarButton>
    );
  }
}

export interface ToolButtonProps extends ButtonProps {
  tool: Tool;
}

export class ToolButton extends React.Component<ToolButtonProps, {}> {
  render() {
    return (
      <ToolbarButton
        selected={this.props.selected}
        onClick={this.props.onClick}
      >
        <ToolIcon>{this.createIcon()}</ToolIcon>
      </ToolbarButton>
    );
  }

  private createIcon(): JSX.Element | null {
    const { tool } = this.props;
    const size = 'medium';

    switch (tool) {
      case 'arrow':
        return <Arrow label={tool} size={size} />;

      case 'line':
        return <Line label={tool} size={size} />;

      case 'brush':
        return <Brush label={tool} size={size} />;

      case 'text':
        return <Text label={tool} size={size} />;

      default:
        return null;
    }
  }
}
