import hoverintent from 'hoverintent';
import React, { PureComponent } from 'react';
import { ArrowLeft, Menu } from 'react-feather';
import styled from 'styled-components';
import { ShellHeader } from './ShellHeader';

export const Resizer = styled.div<{ hovered: boolean; isCollapsed: boolean }>`
  width: 24px;
  height: 100%;
  position: relative;
  left: 24px;
  /* border-left: 1px solid #f2f2f3; */

  &:hover {
    cursor: ew-resize;
  }

  box-shadow: ${({ isCollapsed, hovered }) =>
    isCollapsed || hovered
      ? ' -3px 0.125rem 0.25rem -3px rgba(0, 0, 0, 0.075)'
      : 'none'};
`;

export const ResizerButton = styled.button<{
  hovered: boolean;
  isCollapsed: boolean;
}>`
  left: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  display: ${({ hovered, isCollapsed }) =>
    hovered ? 'flex' : isCollapsed ? 'flex' : 'none'};
`;

export default class ShellResizer extends PureComponent<any> {
  private wrapper: React.RefObject<any> = React.createRef();

  state = {
    hovered: false,
  };

  componentDidMount() {
    hoverintent(
      this.wrapper.current,
      () => {
        this.setState({ hovered: true });
      },
      () => {
        this.setState({ hovered: false });
      },
    );
  }

  render() {
    const { isCollapsed, onClick, ...rest } = this.props;
    const { hovered } = this.state;

    return (
      <Resizer
        onClick={onClick}
        ref={this.wrapper}
        hovered={hovered}
        isCollapsed={isCollapsed}
      >
        <ShellHeader className="position-relative" style={{ left: -24 }}>
          <ResizerButton
            hovered={hovered}
            isCollapsed={isCollapsed}
            className={`btn align-items-center justify-content-center position-absolute bg-white rounded-circle border`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            {...rest}
          >
            {isCollapsed ? <Menu size={14} /> : <ArrowLeft size={14} />}
          </ResizerButton>
        </ShellHeader>
      </Resizer>
    );
  }
}
