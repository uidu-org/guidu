import React from 'react';
import styled from 'styled-components';

const StyledCover = styled.div<{ height: number; cover?: string }>`
  height: ${({ height }) => `${height}px`};
  background-size: cover;
  background-position: 50% 50%;
  background-image: url(${({ cover }) => cover});
  background-color: rgba(76, 86, 106, 0.025);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Cover({ cover, children }: { cover: any; children?: any }) {
  if (!cover) {
    return (
      <StyledCover tw="rounded-t" height={207}>
        {children}
      </StyledCover>
    );
  }

  return (
    <StyledCover
      tw="rounded-t"
      height={cover && cover.column.width ? (cover.column.width * 3) / 2 : 200}
      cover={cover.value}
    >
      {children}
    </StyledCover>
  );
}

function Avatar({ avatar }) {
  return (
    <img src={avatar.value} style={{ borderRadius: '100%', width: '7rem' }} />
  );
}

export default function ItemCover({ cover, avatar }) {
  return <Cover cover={cover}>{avatar && <Avatar avatar={avatar} />}</Cover>;
}
