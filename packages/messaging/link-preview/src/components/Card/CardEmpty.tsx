import React from 'react';
import styled from 'styled-components';
import { media } from '../../utils';
import { emptyStateAnimation, emptyStateImageAnimation } from './CardAnimation';
import { Content } from './CardContent';
import CardImage from './CardMedia/Image';

const MediaEmpty = styled(CardImage)<any>`
  ${emptyStateImageAnimation};
`;

const HeaderEmpty = styled.header<any>`
  height: 16px;
  width: 60%;
  display: block;
  background: #e1e8ed;
  margin: 2px 0 8px;
  opacity: 0.8;
  ${emptyStateAnimation};
`;

const DescriptionEmpty = styled.span<any>`
  width: 95%;
  display: block;
  background: #e1e8ed;
  margin-bottom: 12px;
  opacity: 0.8;
  position: relative;
  ${emptyStateAnimation} animation-delay: .125s;

  height: 33px;

  &::before {
    content: '';
    position: absolute;
    left: -1px;
    right: -1px;
    height: 6px;
    background: #fff;
  }

  &::before {
    top: 14px;
  }

  &::after {
    bottom: 14px;
  }

  ${({ cardSize }) =>
    cardSize !== 'large' &&
    media.mobile`
    height: 14px;
  `};
`;

const FooterEmpty = styled.footer<any>`
  height: 10px;
  width: 30%;
  display: block;
  background: #e1e8ed;
  opacity: 0.8;
  ${emptyStateAnimation} animation-delay: .25s;
`;

function CardEmptyState({ cardSize }: { cardSize: string }) {
  return (
    <>
      <MediaEmpty cardSize={cardSize} />
      <Content cardSize={cardSize}>
        <HeaderEmpty />
        <DescriptionEmpty cardSize={cardSize} />
        <FooterEmpty />
      </Content>
    </>
  );
}

export default CardEmptyState;
