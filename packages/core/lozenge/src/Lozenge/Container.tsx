import styled from 'styled-components';

const BORDER_RADIUS = `40px`;

export default styled.span<{
  backgroundColor?: string;
  textColor?: string;
}>`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  max-width: 100%;
  vertical-align: baseline;
  line-height: 20px;
  display: inline-block;
  padding: 1px 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  border-radius: ${BORDER_RADIUS};
  text-transform: uppercase;
  margin: 0 3px 3px 0;
`;
