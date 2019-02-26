// @flow

import styled from 'styled-components';

export default styled.span`
  ${props => `
    background-color: ${props.backgroundColor};
    color: ${props.textColor};
  `};
  max-width: 100%;
  vertical-align: baseline;
  line-height: 20px;
  display: inline-block;
  padding: 1px 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  border-radius: 40px;
  text-transform: uppercase;
  margin: 0 3px 3px 0;
`;
