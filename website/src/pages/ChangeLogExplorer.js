// @flow
import React, { Component, type Node } from 'react';
import styled from 'styled-components';
import { Link } from '../components/WrappedLink';

import BackIcon from '@atlaskit/icon/glyph/arrow-left';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import Loadable from '../components/WrappedLoader';

import Changelog, { NoMatch } from '../components/ChangeLog';
import Page from '../components/Page';
import { packages } from '../site';
import * as fs from '../utils/fs';
import Loading from '../components/Loading';
import { divvyChangelog } from '../utils/changelog';

import type { RouterMatch } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  match: RouterMatch,
  history: any,
};

type State = { isInvalid: boolean, range: string };

export default class ChangelogExplorer extends Component<Props, State> {
  props: Props;
  state: State = { isInvalid: false, range: '' };

  componentWillMount() {
    const { semver } = this.props.match.params;
    if (semver)
      this.setState({
        range: decodeURI(String(this.props.match.params.semver)),
      });
  }

  handleChange = (e: any) => {
    const { groupId, pkgId } = this.props.match.params;
    const range = e.target.value;
    this.props.history.replace(
      `/changelog/${groupId}/${pkgId}/${encodeURI(range)}`,
    );
    const isInvalid = /[a-z]/gi.test(range);

    this.setState({ isInvalid, range });
  };

  render() {
    const { groupId, pkgId } = this.props.match.params;
    const filePath = `packages/${groupId}/${pkgId}/CHANGELOG.md`;
    const found = fs.find(packages, (file, currPath) => {
      return currPath === filePath;
    });
    const { isInvalid, range } = this.state;

    const Content = Loadable({
      loading: Loading,
      loader: () => found && found.contents(),
      render: changelog =>
        changelog ? (
          <Changelog
            changelog={divvyChangelog(changelog)}
            range={range}
            packageName={pkgId}
          />
        ) : (
          <NoMatch>Invalid range; please try again.</NoMatch>
        ),
    });

    return (
      <Page>
        <Back to={`/packages/${groupId}/${pkgId}`} />
        <h1>Changelog: {pkgId}</h1>
        <TextField
          autoFocus
          isInvalid={isInvalid}
          label="Semver Range"
          onChange={this.handleChange}
          placeholder={'e.g. "> 1.0.6 <= 3.0.2"'}
          shouldFitContainer
          value={range}
        />
        {isInvalid ? (
          <NoMatch>Invalid range; please try again.</NoMatch>
        ) : (
          <LogWrapper>
            <Content />
          </LogWrapper>
        )}
      </Page>
    );
  }
}

const Back = ({ children, to }: { children?: Node | string, to: string }) => (
  <Button
    appearance="link"
    component={Link}
    iconBefore={<BackIcon label="Back Icon" size="small" />}
    spacing="none"
    to={to}
  >
    <span style={{ paddingLeft: '0.5em' }}>{children || 'Back to Docs'}</span>
  </Button>
);

const LogWrapper = styled.div`
  margin-top: 2em;
`;
