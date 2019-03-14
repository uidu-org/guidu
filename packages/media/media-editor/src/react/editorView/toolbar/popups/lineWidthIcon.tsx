import * as React from 'react';
import { Component } from 'react';
import {
  Container,
  HoverArea,
  MainArea,
  FrontArea,
} from './lineWidthButtonStyles';

export interface LineWidthButtonProps {
  readonly lineWidth: number;
  readonly currentLineWidth: number;
  readonly onLineWidthClick: (lineWidth: number) => void;
}

export class LineWidthIcon extends Component<LineWidthButtonProps> {
  render() {
    const { lineWidth, currentLineWidth, onLineWidthClick } = this.props;
    const onClick = () => onLineWidthClick(lineWidth);

    const isSelected = lineWidth === currentLineWidth;

    const style = {
      width: `${lineWidth}px`,
      height: `${lineWidth}px`,
      borderRadius: `${lineWidth}px`,
    };

    const mainAreaStyle = {
      padding: `${(24 - lineWidth) / 2}px`,
    };

    return (
      <Container onClick={onClick}>
        <HoverArea>
          <MainArea isSelected={isSelected} style={mainAreaStyle}>
            <FrontArea style={style} isSelected={isSelected} />
          </MainArea>
        </HoverArea>
      </Container>
    );
  }
}
