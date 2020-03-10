import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function FormHeader({ name, children }) {
  return (
    <Wrapper>
      <h5 className="my-0 mr-2">{name}</h5>
      {children}
    </Wrapper>
  );
}
