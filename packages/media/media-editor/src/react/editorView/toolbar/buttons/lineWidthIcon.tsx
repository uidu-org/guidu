import * as React from 'react';
import { Component } from 'react';
import { FrontArea, MainArea } from './lineWidthButtonStyles';

export interface LineWidthButtonProps {
  readonly isActive: boolean;
  readonly lineWidth: number;
  readonly onLineWidthClick: (lineWidth: number) => void;
}

export class LineWidthIcon extends Component<LineWidthButtonProps> {
  render() {
    const { lineWidth, isActive, onLineWidthClick } = this.props;
    const onClick = () => onLineWidthClick(lineWidth);

    const map: { [key: number]: number } = {
      4: 4,
      8: 6,
      12: 10,
      16: 12,
      20: 16,
    };

    const style = {
      width: `${map[lineWidth]}px`,
      height: `${map[lineWidth]}px`,
      borderRadius: `${map[lineWidth] * 2}px`,
    };

    const mainAreaStyle = {
      padding: `${(18 - map[lineWidth]) / 2}px`,
    };

    return (
      <MainArea onClick={onClick} isActive={isActive} style={mainAreaStyle}>
        <FrontArea style={style} isActive={isActive} />
      </MainArea>
    );
  }
}
