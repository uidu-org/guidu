import hoverintent from 'hoverintent';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import styled from 'styled-components';
import { ShellHeader } from './ShellHeader';

export const Resizer = styled.div<{ isHover: boolean; isCollapsed: boolean }>`
  width: 24px;
  height: 100%;
  position: absolute;
  right: -24px;

  &:hover {
    cursor: ew-resize;
  }

  box-shadow: ${({ isCollapsed, isHover }) =>
    isCollapsed || isHover
      ? ' -3px 0.125rem 0.25rem -3px rgba(0, 0, 0, 0.075)'
      : 'none'};
`;

export const ResizerButton = styled.button<{
  isHover: boolean;
  isCollapsed: boolean;
}>`
  left: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  display: ${({ isHover, isCollapsed }) =>
    isHover ? 'flex' : isCollapsed ? 'flex' : 'none'};
`;

export default function ShellResizer({ onClick, isCollapsed, className }) {
  const wrapper = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    hoverintent(
      wrapper.current,
      () => {
        setIsHover(true);
      },
      () => {
        setIsHover(false);
      },
    );
    return () => null;
  }, []);

  return (
    <Resizer
      onClick={onClick}
      ref={wrapper}
      isHover={isHover}
      isCollapsed={isCollapsed}
    >
      <ShellHeader tw="relative" style={{ left: -24 }}>
        <ResizerButton
          isHover={isHover}
          isCollapsed={isCollapsed}
          tw="rounded-full items-center border justify-center absolute background[rgb(var(--body-secondary-bg))]"
          className={className}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isCollapsed ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
        </ResizerButton>
      </ShellHeader>
    </Resizer>
  );
}
