import { MediaQueries } from 'react-media';

export type ResponsivrProps = {
  sm?: React.ReactNode;
  md?: React.ReactNode;
  lg?: React.ReactNode;
  xl?: React.ReactNode;
  breakpoints?: MediaQueries;
  targetWindow?: Window;
};
