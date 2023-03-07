import { createElement } from 'react';
import styled, { css } from 'styled-components';

import { isLarge, media } from '../../utils';

const HEIGHT = '382px';

const contrastStyle = ({ backgroundColor, color }) => css`
  background-color: ${backgroundColor};
  border-color: ${color};
  transition-property: filter;

  &&& {
    color: ${color};
  }

  &:hover {
    filter: brightness(90%);
  }
`;

const largeStyle = css`
  flex-direction: column;
  height: ${HEIGHT};
  transition-property: background, border-color, height;

  ${media.mobile`
    height: calc(${HEIGHT} * 7/9);
  `};
`;

const hoverStyle = css`
  transition-property: background, border-color;
  &:hover {
    background: #f5f8fa;
    ${'' /* border-color: rgba(136, 153, 166, 0.5); */}
  }
`;

const rtlStyle = ({ cardSize }) => css`
  flex-direction: ${isLarge(cardSize) ? 'column-reverse' : 'row-reverse'};
`;

const baseStyle = css`
  background-color: #fff;
  overflow: hidden;
  color: #181919;
  display: flex;
  text-decoration: none;
  opacity: 1;
  position: relative;

  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  &:active,
  &:hover {
    color: #181919;
    text-decoration: none;
    outline: 0;
  }
`;

const createEl = ({ as }) =>
  styled(as)(
    () => baseStyle,
    ({ loading, contrast }) => !loading && !contrast && hoverStyle,
    ({ cardSize }) => isLarge(cardSize) && largeStyle,
    ({ direction }) => direction === 'rtl' && rtlStyle,
    ({ backgroundColor, color, contrast }) =>
      contrast && color && backgroundColor && contrastStyle,
    ({ backgroundColor, color, contrast }) =>
      contrast && (!color || !backgroundColor) && hoverStyle,
  );

const CACHE = {};

const CardWrap = ({ rel, href, target, ...props }) => {
  const key = JSON.stringify({ ...props, children: undefined });
  return createElement(
    CACHE[key] || (CACHE[key] = createEl({ as: props.as })),
    props.as === 'a' ? { href, rel, target, ...props } : props,
  );
};

CardWrap.defaultProps = {
  as: 'a',
  rel: 'noopener noreferrer',
  target: '_blank',
};

export default CardWrap;
