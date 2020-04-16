import React from 'react';
import styled from 'styled-components';
import { MediaCardGroupProps } from '../types';
import MediaCard from './MediaCard';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
`;

const Item = styled.div<any>`
  background: red;
  border-radius: 0.35rem;
  grid-column-end: span
    ${(props) => {
      return props.layout[props.index] ? props.layout[props.index][0] : 1;
    }};
  grid-row-end: span
    ${(props) => {
      return props.layout[props.index] ? props.layout[props.index][1] : 1;
    }};
`;

export default function MediaCardGroup(props: MediaCardGroupProps) {
  const { files } = props;
  return (
    <Wrapper>
      {files.map((file, index) => (
        <Item key={file.id} index={index} {...props.gridOptions}>
          <MediaCard file={file} />
        </Item>
      ))}
    </Wrapper>
  );
}
