// @flow

import React, { Component, type Node } from 'react';
import styled from 'styled-components';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';
import { Helmet } from 'react-helmet';
import { gridSize, colors, math } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import ExamplesIcon from '@atlaskit/icon/glyph/screen';
import { AtlassianIcon } from '@atlaskit/logo';

import Loading from '../../components/Loading';
import Page from '../../components/Page';
import FourOhFour from '../FourOhFour';

import MetaData from './MetaData';
import LatestChangelog from './LatestChangelog';

import { isModuleNotFoundError } from '../../utils/errors';
import * as fs from '../../utils/fs';
import type { RouterMatch } from '../../types';

import type { Logs } from '../../components/ChangeLog';
import fetchPackageData from './utils/fsOperations';

export const Title = styled.div`
  display: flex;

  h1 {
    flex-grow: 1;
  }
`;

export const Intro = styled.p`
  color: ${colors.heading};
  font-size: ${math.multiply(gridSize, 2)}px;
  font-weight: 300;
  line-height: 1.4em;
`;
export const ButtonGroup = styled.div`
  display: inline-flex;
  margin: 0 -2px;

  > * {
    flex: 1 0 auto;
    margin: 0 2px !important;
  }
`;

export const Sep = styled.hr`
  border: none;
  border-top: 2px solid #ebecf0;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
  margin-top: ${math.multiply(gridSize, 1.5)}px;

  @media (min-width: 780px) {
    margin-bottom: ${math.multiply(gridSize, 3)}px;
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;

export const NoDocs = props => {
  return <div>Component "{props.name}" doesn't have any documentation.</div>;
};

type PackageProps = {
  match: RouterMatch,
};

type PackageState = {
  changelog: Logs,
  doc: Node | null,
  examples: Array<any> | null,
  missing: boolean | null,
  pkg: Object | null,
};

const initialState = {
  changelog: [],
  doc: null,
  examples: null,
  missing: false,
  pkg: null,
};

function getExamplesPaths(groupId, pkgId, examples) {
  if (!examples || !examples.length) return {};

  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files
  const filtered = examples.map(a => a.id).filter(id => id.match(regex));
  const res = filtered[0];

  if (!res) return {};

  return {
    examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
      res,
    )}`,
  };
}

export default function LoadData({ match }) {
  const { groupId, pkgId } = match.params;

  const Content = Loadable({
    loading: () => (
      <Page>
        <Loading />
      </Page>
    ),
    loader: () =>
      fetchPackageData(groupId, pkgId).catch(
        error => console.log(error) || { error },
      ),
    render: props =>
      props.missing || props.error ? (
        <FourOhFour />
      ) : (
        <Package
          {...props}
          pkgId={pkgId}
          groupId={groupId}
          urlIsExactMatch={match.isExact}
        />
      ),
  });

  return <Content />;
}

class Package extends Component<*, *> {
  render() {
    const {
      urlIsExactMatch,
      groupId,
      pkgId,
      pkg,
      doc,
      changelog,
      examples,
    } = this.props;
    const { examplePath, exampleModalPath } = getExamplesPaths(
      groupId,
      pkgId,
      examples,
    );

    const title = fs.titleize(pkgId);

    return (
      <Page>
        {urlIsExactMatch && (
          <Helmet>
            <title>
              {title} package - {BASE_TITLE}
            </title>
          </Helmet>
        )}
        <Title>
          <h1>{title}</h1>
          {examplePath && (
            <ButtonGroup>
              <Button
                component={Link}
                iconBefore={<ExamplesIcon label="Examples Icon" />}
                to={examplePath}
              />
              <Button component={Link} to={exampleModalPath}>
                Examples
              </Button>
              {pkg['atlaskit:designLink'] && (
                <Button
                  iconBefore={<AtlassianIcon size="small" />}
                  href={pkg['atlaskit:designLink']}
                >
                  Design docs
                </Button>
              )}
            </ButtonGroup>
          )}
        </Title>
        <Intro>{pkg.description}</Intro>
        <MetaData
          packageName={pkg.name}
          packageSrc={`https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/${groupId}/${pkgId}`}
        />
        <LatestChangelog
          changelog={changelog}
          pkgId={pkgId}
          groupId={groupId}
        />
        <Sep />
        {doc || <NoDocs name={pkgId} />}
      </Page>
    );
  }
}
