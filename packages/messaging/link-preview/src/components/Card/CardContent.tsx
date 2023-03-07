/* global URL */

import React from 'react';
import styled, { css } from 'styled-components';
import CardText from './CardText';

import { imageProxy, media } from '../../utils';

const REGEX_STRIP_WWW = /^www\./;

const getHostname = (href: string) => {
  // eslint-disable-next-line compat/compat
  const { hostname } = new URL(href);
  return hostname.replace(REGEX_STRIP_WWW, '');
};

const isLarge = (cardSize: string) => cardSize === 'large';

const largeContentStyle = css`
  flex: 0 0 125px;
`;

const mobileDescriptionStyle = css`
  ${media.mobile`
    > p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `};
`;

export const Content = styled.div<{ cardSize: string }>`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
  padding: 10px 15px;
  min-width: 0;
  box-sizing: border-box;
  ${({ cardSize }) => isLarge(cardSize) && largeContentStyle};
`;

const Header = styled.header`
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  flex-grow: 1.2;
`;

const Description = styled.div<{ cardSize: string }>`
  text-align: left;
  font-size: 14px;
  flex-grow: 2;
  margin: auto 0;
  ${'' /* line-height: 18px; */}
  ${({ cardSize }) => !isLarge(cardSize) && mobileDescriptionStyle};
`;

const Footer = styled.footer`
  align-items: center;
  display: flex;
  text-align: left;
  font-size: 12px;
  margin: 0;
  flex-grow: 0;
`;

const Logo = styled.div<{ logo: string }>`
  background-image: ${({ logo }) => `url('${imageProxy(logo)}')`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 14px;
  width: 14px;
  margin-right: 0.25rem;
`;

export default function CardContent({
  title,
  description,
  url,
  cardSize,
  className,
  logo,
}: {
  title: string;
  description: string;
  url: string;
  cardSize: string;
  className?: string;
  logo?: string;
}) {
  return (
    <Content className={className} cardSize={cardSize}>
      <Header>
        <CardText lines={1}>{title}</CardText>
      </Header>
      <Description cardSize={cardSize}>
        <CardText lines={2}>{description}</CardText>
      </Description>
      <Footer>
        {logo && <Logo className="rounded" logo={logo} />}
        <CardText lines={1}>{url && getHostname(url)}</CardText>
      </Footer>
    </Content>
  );
}
