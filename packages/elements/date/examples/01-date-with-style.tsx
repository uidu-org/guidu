import * as React from 'react';
import { Date, DateProps } from '../src';
import styled, { css } from 'styled-components';
import { colors, borderRadius } from '@uidu/theme';

type Props = {
  selected?: boolean;
} & DateProps;

const SelectableDate = styled(Date)`
  ${(props: Props) =>
    props.selected
      ? css`
          display: 'relative';
          &:before {
            content: '';
            border: 2px solid ${colors.B200};
            display: 'absolute';
            background: transparent;
            border-radius: ${borderRadius()}px;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
        `
      : null};
` as React.ComponentType<Props>;

export default () => (
  <div>
    <p>
      <SelectableDate value={586137600000} selected />
    </p>
    <p>
      <SelectableDate value={586137600000} />
    </p>
    <p>
      <SelectableDate value={586137600000} color="red" selected />
    </p>
  </div>
);
