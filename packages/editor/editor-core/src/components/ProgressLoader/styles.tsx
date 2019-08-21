import { borderRadius, colors } from '@uidu/theme';
import styled, { css } from 'styled-components';

export const BackgroundWrapper = styled.div<{ maxWidth: number }>`
  height: 2px;
  background-color: ${colors.N20};
  border: transparent;
  border-radius: ${borderRadius()}px;
  ${({ maxWidth }: { maxWidth: number }) =>
    css`
      max-width: ${maxWidth}px;
    `};
`;

export const ProgressLoaderWrapper = styled.div`
  flex-grow: 1;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export type LoaderProps = {
  width?: number;
  progress: number;
  maxWidth?: number;
  showCancel?: boolean;
};

export const LoaderStyle = styled.div<LoaderProps>`
  background-color: ${colors.B400};
  height: 2px;
  border: transparent;
  border-radius: ${borderRadius()}px;

  /**
   * This value was found to be ideal
   * http://cubic-bezier.com/#.52,.27,0,1.03
   **/
  transition: 1s all cubic-bezier(0.52, 0.27, 0, 1.03);

  ${({ progress, maxWidth }: LoaderProps) =>
    css`
      width: ${progress * (maxWidth || 1)}px;
    `};
`;
