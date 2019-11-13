import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkRecord = styled.span`
  min-width: 18px;
  font-size: 0.9rem;
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
  useEffect(() => {
    cell.current.addEventListener('click', onClick);
    return () => cell.current.removeEventListener('click', onClick);
  }, []);

  const cell = useRef(null);

  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    history.push(value.path);
  };

  return (
    <div ref={cell}>
      <StyledLinkRecord>
        <div className="text-truncate">{value.name}</div>
      </StyledLinkRecord>
    </div>
  );
}

export default withRouter(LinkRecordRenderer as any);
