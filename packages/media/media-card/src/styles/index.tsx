/* tslint:disable:variable-name */

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { fontFamily } from '@uidu/theme';
import { fadeIn } from '@uidu/media-ui';

export * from './config';
export * from './mixins';
export * from './easing';
export * from './animations';

export const Root: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  font-family: ${fontFamily()};

  * {
    box-sizing: border-box;
  }
`;

export const cardShadow = `
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
`;

export const FadeinImage: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${fadeIn};
`;

export default Root;
