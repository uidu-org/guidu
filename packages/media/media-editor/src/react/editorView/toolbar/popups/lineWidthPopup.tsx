import * as React from 'react';
import { Component } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import { LineWidthPopupContainer } from './popupStyles';
import { LineWidthIcon } from './lineWidthIcon';

export interface LineWidthPopupProps {
  readonly isOpen: boolean;
  readonly lineWidth: number;
  readonly onLineWidthClick: (lineWidth: number) => void;
}

export class LineWidthPopup extends Component<LineWidthPopupProps> {
  render() {
    const { isOpen, children } = this.props;
    const content = (
      <LineWidthPopupContainer>{this.buttons()}</LineWidthPopupContainer>
    );
    return (
      <InlineDialog isOpen={isOpen} placement="top-start" content={content}>
        {children}
      </InlineDialog>
    );
  }

  private buttons(): JSX.Element[] {
    const { onLineWidthClick, lineWidth: currentLineWidth } = this.props;
    const lineWidths = [4, 8, 12, 16, 20];

    return lineWidths.map(lineWidth => (
      <LineWidthIcon
        key={`${lineWidth}`}
        lineWidth={lineWidth}
        currentLineWidth={currentLineWidth}
        onLineWidthClick={onLineWidthClick}
      />
    ));
  }
}
