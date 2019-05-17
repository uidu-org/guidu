// @flow

import styled from 'styled-components';

export default styled.div`
  ${({ shouldFitContainer }) =>
    shouldFitContainer ? '' : 'max-width: max-content;'};
`;
