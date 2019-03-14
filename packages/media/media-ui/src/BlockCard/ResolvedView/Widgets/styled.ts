import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import { ellipsis } from '../../../mixins';

const widgetHeight = 24;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-top: 3px;

  max-height: ${widgetHeight * 2}px;
  overflow: hidden;

  & > * {
    margin-right: 12px;
  }
  & > *:last-child {
    margin-right: auto;
  }
`;

export const WidgetWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: ${widgetHeight}px;
  max-width: calc(100% - (2 * 12px));
`;

export const WidgetDetails: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;

  /* space the widget items */
  & > * + * {
    margin-left: 4px;
  }
`;

export const Title: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N300};
  font-size: 12px;
  line-height: ${16 / 12};
`;

export const Text: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${ellipsis('none')};
  color: ${colors.N800};
  font-size: 12px;
  line-height: ${16 / 12};
`;
