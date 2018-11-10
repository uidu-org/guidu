// @flow
import React from 'react';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
`;

const Loading = (props: {}) => (
  <Container>
    <Spinner {...props} />
  </Container>
);
Loading.defaultProps = { size: 'large' };

export default Loading;
