import NanoClamp from 'nanoclamp';
import React from 'react';
import styled from 'styled-components';

function Clamp({
  children,
  className,
  lines,
}: {
  children: string;
  className?: string;
  lines: number;
}) {
  return (
    <NanoClamp className={className} lines={lines} text={children} is="p" />
  );
}

const CardText = styled(Clamp)<any>`
  &&& {
    text-align: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;
    margin: 0;
  }
`;

export default CardText;
