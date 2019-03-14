import * as React from 'react';
import { Component } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Button from '@atlaskit/button';
import { Tool, Color } from '../../../common';

import { LineWidthButton } from './buttons/lineWidthButton';
import { ColorButton } from './buttons/colorButton';
import { ToolButton } from './buttons/toolButton';
import { LineWidthPopup } from './popups/lineWidthPopup';
import { ColorPopup } from './popups/colorPopup';
import { ToolbarContainer, CenterButtons, VerticalLine } from './styles';
import { ShapePopup, shapeTools } from './popups/shapePopup';
import { ShapeButton } from './buttons/shapeButton';
import { ButtonGroup } from './buttons/buttonGroup';
import { messages } from '@uidu/media-ui';

export type PopupState = 'none' | 'color' | 'lineWidth' | 'shape';

export const tools: Tool[] = [
  'arrow',
  'rectangle',
  'oval',
  'line',
  'text',
  'blur',
  'brush',
];

export interface ToolbarProps {
  readonly color: Color;
  readonly tool: Tool;
  readonly lineWidth: number;
  readonly onSave: () => void;
  readonly onCancel: () => void;
  readonly onToolChanged: (tool: Tool) => void;
  readonly onColorChanged: (color: Color) => void;
  readonly onLineWidthChanged: (lineWidth: number) => void;
}

export interface ToolbarState {
  readonly popup: PopupState;
}

export class Toolbar extends Component<
  ToolbarProps & InjectedIntlProps,
  ToolbarState
> {
  state: ToolbarState = { popup: 'none' };

  onColorButtonClick = () => this.showOrHidePopup('color');
  onLineWidthButtonClick = () => this.showOrHidePopup('lineWidth');
  onShapeButtonClick = () => this.showOrHidePopup('shape');

  render() {
    const {
      color,
      tool,
      lineWidth,
      onColorChanged,
      onLineWidthChanged,
      onSave,
      onCancel,
      intl: { formatMessage },
    } = this.props;
    const { popup } = this.state;

    const showColorPopup = popup === 'color';
    const showLineWidthPopup = popup === 'lineWidth';
    const showShapePopup = popup === 'shape';

    const onPickColor = (color: Color) => {
      onColorChanged(color);
      this.setState({ popup: 'none' });
    };

    const onLineWidthClick = (lineWidth: number) => {
      onLineWidthChanged(lineWidth);
      this.setState({ popup: 'none' });
    };

    const isShapeTool = shapeTools.indexOf(tool) > -1;

    return (
      <ToolbarContainer>
        <CenterButtons>
          <ButtonGroup>
            {this.renderSimpleTool('arrow')}
            {this.renderSimpleTool('text')}

            <ShapePopup
              isOpen={showShapePopup}
              shape={tool}
              onPickShape={this.onToolClick}
            >
              <div>
                <ShapeButton
                  onClick={this.onShapeButtonClick}
                  isActive={isShapeTool}
                  activeShape={tool}
                />
              </div>
            </ShapePopup>

            {this.renderSimpleTool('brush')}
            {this.renderSimpleTool('blur')}

            <VerticalLine />
            <LineWidthPopup
              onLineWidthClick={onLineWidthClick}
              lineWidth={lineWidth}
              isOpen={showLineWidthPopup}
            >
              <div>
                <LineWidthButton
                  lineWidth={lineWidth}
                  isActive={showLineWidthPopup}
                  onClick={this.onLineWidthButtonClick}
                />
              </div>
            </LineWidthPopup>

            <ColorPopup
              onPickColor={onPickColor}
              color={color}
              isOpen={showColorPopup}
            >
              <div>
                <ColorButton
                  color={color}
                  isActive={showColorPopup}
                  onClick={this.onColorButtonClick}
                />
              </div>
            </ColorPopup>

            <VerticalLine />

            <Button appearance="primary" theme="dark" onClick={onSave}>
              {formatMessage(messages.save)}
            </Button>
            <Button appearance="subtle" onClick={onCancel} theme="dark">
              {formatMessage(messages.cancel)}
            </Button>
          </ButtonGroup>
        </CenterButtons>
      </ToolbarContainer>
    );
  }

  private onToolClick = (tool: Tool) => {
    this.setState({ popup: 'none' });
    this.props.onToolChanged(tool);
  };

  private renderSimpleTool(tool: Tool) {
    const { tool: activeTool } = this.props;

    return (
      <ToolButton
        key={tool}
        tool={tool}
        activeTool={activeTool}
        onToolClick={this.onToolClick}
      />
    );
  }

  private showOrHidePopup(target: PopupState): void {
    if (this.state.popup === target) {
      this.setState({ popup: 'none' });
    } else {
      this.setState({ popup: target });
    }
  }
}

export default injectIntl(Toolbar);
