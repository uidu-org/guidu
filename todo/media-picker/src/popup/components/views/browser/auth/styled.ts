import styled from 'styled-components';
import { colors } from '@uidu/theme';

export const IconWrapper = styled.div`
  color: ${colors.N30};
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    width: 120px;
    height: 120px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
`;

export const TextDescription = styled.div`
  margin-top: 18px;
  color: ${colors.N500};
  opacity: 0.7;
  font-size: 12px;
  text-align: center;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${colors.N100};
`;

export const ConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
