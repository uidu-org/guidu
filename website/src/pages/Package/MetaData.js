// @flow

import React, { Component, type Node } from 'react';
import styled from 'styled-components';
import { colors, gridSize, math } from '@atlaskit/theme';

import LatestChangelog from './LatestChangelog';

type MetaItemProps = {
  href?: string,
  label: Node,
  summary: Node,
};

const MetaItem = (props: MetaItemProps) => (
  <DI>
    <DT>{props.label}</DT>
    <DD>
      {props.href ? (
        <a href={props.href} target="_new">
          {props.summary}
        </a>
      ) : (
        props.summary
      )}
    </DD>
  </DI>
);

export type MetaDataProps = {
  packageSrc: string,
  packageName: string,
};

export default class MetaData extends Component<MetaDataProps> {
  render() {
    const { packageSrc, packageName } = this.props;

    return (
      <Meta>
        <MetaItem
          label="Install"
          summary={<code>yarn add {packageName}</code>}
        />
        <MetaItem
          href={`https://www.npmjs.com/package/${packageName}`}
          label="npm"
          summary={packageName}
        />
        <MetaItem href={packageSrc} label="Source" summary="Github" />
      </Meta>
    );
  }
}

const Meta = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const DI = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 0.4em 0;

  @media (min-width: 780px) {
    flex-direction: row;
  }
`;

const DT = styled.div`
  color: ${colors.subtleText};
  flex-basis: 25%;
`;

const DD = styled.div`
  flex: 1 0 auto;
`;
