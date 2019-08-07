// @flow

import styled from 'styled-components';

export default styled.div`
  ${({ shouldFitContainer, shouldFitContent }) => {
    if (shouldFitContainer) {
      return '';
    }

    if (shouldFitContent) {
      return 'max-width: max-content';
    }

    return 'max-width: 300px';
  }}
`;
