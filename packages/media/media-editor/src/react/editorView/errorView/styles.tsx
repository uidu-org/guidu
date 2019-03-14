// tslint:disable:variable-name

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import Button from '@atlaskit/button';

export const ErrorPopup: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 290px;
  padding: 16px;
  background-color: ${colors.N0};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorIconWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 92px;
`;

export const ErrorMessage: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N900};
  margin-top: 16px;
  margin-bottom: 4px;
  width: 256px;
  text-align: center;
  font-weight: bold;
`;

export const ErrorHint: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N70};
  margin-top: 4px;
  margin-bottom: 20px;
  width: 256px;
  text-align: center;
`;

export const ErrorButton: ComponentClass<any> = styled(Button)`
  display: inline-flex;
  width: 84px;
  margin: 2px;
  justify-content: center;
`;
