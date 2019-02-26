// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import SectionMessage from '../src';

const Padding = styled.div`
  padding: 8px;
`;

const Example = () => (
  <Fragment>
    <Padding>
      <SectionMessage apperance="authentication" title="More">
        <p className="mb-0">
          I count the steps from one end of my island to the other
        </p>
        <p>It{"'"}s a hundred steps from where I sleep to the sea</p>
      </SectionMessage>
    </Padding>
    <Padding>
      <SectionMessage appearance="warning" title="More">
        <p className="mb-0">
          And when I say I{"'"}ve learned all there is to know
        </p>
        <p className="mb-0">Well there{"'"}s another little island lesson</p>
        <p>Gramma Tala shows me</p>
      </SectionMessage>
    </Padding>
    <Padding>
      <SectionMessage appearance="error" title="More">
        <p className="mb-0">I know where I am from the scent of the breeze</p>
        <p className="mb-0">The ascent of the climb</p>
        <p>From the tangle of the trees</p>
      </SectionMessage>
    </Padding>
    <Padding>
      <SectionMessage appearance="confirmation" title="More">
        <p className="mb-0">From the angle of the mountain</p>
        <p className="mb-0">To the sand on our island shore</p>
        <p>I{"'"}ve been here before</p>
      </SectionMessage>
    </Padding>
    <Padding>
      <SectionMessage appearance="change" title="More">
        <p className="mb-0">From the angle of the mountain</p>
        <p className="mb-0">To the sand on our island shore</p>
        <p>I{"'"}ve been here before</p>
      </SectionMessage>
    </Padding>
  </Fragment>
);

export default Example;
