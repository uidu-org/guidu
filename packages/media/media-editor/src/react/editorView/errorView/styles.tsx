import styled from 'styled-components';
import { colors } from '@uidu/theme';
import Button from '@uidu/button';

export const ErrorPopup = styled.div`
  width: 290px;
  padding: 16px;
  background-color: ${colors.N0};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorIconWrapper = styled.div`
  width: 92px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.N900};
  margin-top: 16px;
  margin-bottom: 4px;
  width: 256px;
  text-align: center;
  font-weight: bold;
`;

export const ErrorHint = styled.div`
  color: ${colors.N70};
  margin-top: 4px;
  margin-bottom: 20px;
  width: 256px;
  text-align: center;
`;

export const ErrorButton = styled(Button)`
  display: inline-flex;
  width: 84px;
  margin: 2px;
  justify-content: center;
`;
