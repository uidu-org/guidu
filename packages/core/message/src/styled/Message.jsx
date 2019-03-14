import styled from 'styled-components';

export default styled.div`
  &:hover {
    &::after {
      background: #f8f9fa;
      bottom: -5px;
      content: '';
      left: -5px;
      position: absolute;
      right: -5px;
      top: -5px;
      z-index: -1;
    }
  }
`;
