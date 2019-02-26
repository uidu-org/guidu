// @flow
import React from 'react';
import styled from 'styled-components';
import Lozenge from '../src';

const Hr = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 2em 0;
`;
const Row = styled.div`
  display: flex;
`;
const Col = styled.div`
  flex: 1 1 auto;
`;

const APPEARANCES = [
  { label: 'Default', value: 'default' },
  { label: 'Success', value: 'success' },
  { label: 'Removed', value: 'removed' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'New', value: 'new' },
  { label: 'Moved', value: 'moved' },
];

export default () => (
  <div>
    <Row>
      <Col>
        <p>Subtle</p>
        {APPEARANCES.map(a => (
          <p key={a.value}>
            <Lozenge appearance={a.value}>{a.label}</Lozenge>
          </p>
        ))}
      </Col>
      <Col>
        <p>Bold</p>
        {APPEARANCES.map(a => (
          <p key={a.value}>
            <Lozenge appearance={a.value} isBold>
              {a.label}
            </Lozenge>
          </p>
        ))}
      </Col>
    </Row>

    <Hr />

    <p>Overflowed Lozenge</p>
    <p>
      <Lozenge>Long text will be truncated after a point.</Lozenge>
    </p>
  </div>
);
