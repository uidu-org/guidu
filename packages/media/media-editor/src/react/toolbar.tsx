import * as React from 'react';
import { Color, Tool } from '../common';
import { ToolbarContainer } from './styled';
import { ColorButton, LineWidthButton, ToolButton } from './toolbarButtons';
import { colorSame } from '../util';

export type ColorChangedHandler = (color: Color) => void;
export type ToolChangedHandler = (tool: Tool) => void;
export type LineWidthChangedHandler = (lineWidth: number) => void;

export interface ToolbarProps {
  color: Color;
  tool: Tool;
  lineWidth: number;

  onColorChanged: ColorChangedHandler;
  onToolChanged: ToolChangedHandler;
  onLineWidthChanged: LineWidthChangedHandler;
}

const red = { red: 250, green: 61, blue: 17 };
const green = { red: 65, green: 224, blue: 138 };
const yellow = { red: 249, green: 182, blue: 0 };
const blue = { red: 34, green: 98, blue: 255 };

export class Toolbar extends React.Component<ToolbarProps, {}> {
  constructor(props: ToolbarProps) {
    super(props);
  }

  render() {
    return (
      <ToolbarContainer>
        {this.createColorButton(red)}
        {this.createColorButton(green)}
        {this.createColorButton(yellow)}
        {this.createColorButton(blue)}
        {this.createLineWidthButton(8)}
        {this.createLineWidthButton(10)}
        {this.createLineWidthButton(12)}
        {this.createToolButton('brush')}
        {this.createToolButton('arrow')}
        {this.createToolButton('line')}
        {this.createToolButton('text')}
      </ToolbarContainer>
    );
  }

  private createColorButton(color: Color): JSX.Element {
    return (
      <ColorButton
        color={color}
        selected={colorSame(this.props.color, color)}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => this.props.onColorChanged(color)}
      />
    );
  }

  private createLineWidthButton(lineWidth: number): JSX.Element {
    return (
      <LineWidthButton
        lineWidth={lineWidth}
        selected={this.props.lineWidth === lineWidth}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => this.props.onLineWidthChanged(lineWidth)}
      />
    );
  }

  private createToolButton(tool: Tool): JSX.Element {
    return (
      <ToolButton
        tool={tool}
        selected={this.props.tool === tool}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => this.props.onToolChanged(tool)}
      />
    );
  }
}
