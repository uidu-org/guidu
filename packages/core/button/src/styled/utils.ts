import { css } from 'styled-components';

export type IsLoadingProps = {
  isLoading?: boolean;
};

const isLoadingStyle = css<IsLoadingProps>`
  transition: opacity 0.3s;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

const getLoadingStyle = ({ isLoading }: IsLoadingProps) => ({
  transition: 'opacity 0.3s',
  opacity: isLoading ? 0 : 1,
});

export { isLoadingStyle, getLoadingStyle };
