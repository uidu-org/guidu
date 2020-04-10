import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { G400, N200, R400 } from '@uidu/theme/colors';
import { gridSize } from '@uidu/theme/constants';
import { multiply } from '@uidu/theme/math';
import { h200 } from '@uidu/theme/typography';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Message = styled.div<{ error?: boolean; valid?: boolean }>`
  ${h200} font-weight: normal;
  color: ${(props) => {
    if (props.error) {
      return R400;
    }
    if (props.valid) {
      return G400;
    }
    return N200;
  }};
  margin-top: ${multiply(gridSize, 0.5)}px;
  display: flex;
  justify-content: baseline;
`;

const IconWrapper = styled.span`
  display: flex;
  margin-right: 4px;
`;

interface Props {
  /** The content of the message */
  children: ReactNode;
}

export const HelperMessage = ({ children }: Props) => (
  <Message>{children}</Message>
);

export const ErrorMessage = ({ children }: Props) => (
  <Message error>
    <IconWrapper>
      <ErrorIcon size="small" label="error" aria-label="error" />
    </IconWrapper>
    {children}
  </Message>
);

export const ValidMessage = ({ children }: Props) => (
  <Message valid>
    <IconWrapper>
      <SuccessIcon size="small" label="success" />
    </IconWrapper>
    {children}
  </Message>
);
