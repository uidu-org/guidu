import Spinner from '@uidu/spinner';
import React from 'react';
import { SpinnerContainer } from '../styled/Card';

const LoadingState = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

export default LoadingState;
