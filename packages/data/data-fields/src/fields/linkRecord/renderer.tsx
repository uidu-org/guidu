import React from 'react';
import styled from 'styled-components';

const StyledLinkRecord = styled.span`
  min-width: 18px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 4px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  display: inline-grid;
  line-height: normal;
  background-color: rgba(76, 86, 106, 0.1);
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

function LinkRecordRenderer({ history, value }) {
  return (
    <div>
      {value ? (
        <StyledLinkRecord>
          <div className="text-truncate">{value}</div>
        </StyledLinkRecord>
      ) : null}
    </div>
  );
}

export default LinkRecordRenderer;
