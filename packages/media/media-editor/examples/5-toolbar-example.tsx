import * as React from 'react';

import { I18NWrapper } from '@uidu/media-test-helpers';
import Toolbar from '../src/react/editorView/toolbar/toolbar';
import { Color, Tool } from '../src/common';

interface State {
  readonly color: Color;
  readonly tool: Tool;
  readonly lineWidth: number;
}

class ToolbarExample extends React.Component<{}, State> {
  state: State = {
    color: { red: 0xbf, green: 0x26, blue: 0x00 },
    lineWidth: 8,
    tool: 'arrow',
  };

  onSave = () => {
    console.log('Save!');
  };

  onCancel = () => {
    console.log('Cancel!');
  };

  onToolChanged = (tool: Tool) => this.setState({ tool });
  onColorChanged = (color: Color) => this.setState({ color });
  onLineWidthChanged = (lineWidth: number) => this.setState({ lineWidth });

  render() {
    const { lineWidth, color, tool } = this.state;

    return (
      <I18NWrapper>
        <Toolbar
          color={color}
          tool={tool}
          lineWidth={lineWidth}
          onSave={this.onSave}
          onCancel={this.onCancel}
          onToolChanged={this.onToolChanged}
          onColorChanged={this.onColorChanged}
          onLineWidthChanged={this.onLineWidthChanged}
        />
      </I18NWrapper>
    );
  }
}
export default () => <ToolbarExample />;
