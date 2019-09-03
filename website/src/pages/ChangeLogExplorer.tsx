import * as React from 'react';
import * as H from 'history';
import { match } from 'react-router';
import styled from 'styled-components';
import { Link } from '../components/WrappedLink';
import { ArrowLeft } from 'react-feather';
import TextField from '@uidu/field-text';
import Button from '@uidu/button';
import Loadable from '../components/WrappedLoader';
import Changelog, { NoMatch } from '../components/ChangeLog';
import Page from '../components/Page';
import { packages } from '../site';
import * as fs from '../utils/fs';
import Loading from '../components/Loading';
import { divvyChangelog } from '../utils/changelog';

export type Props = {
  match: match<Record<string, string>>;
  history: H.History;
};

export type State = { isInvalid: boolean; range: string };

export type ResolvedLog = {
  log: string;
};
export default class ChangelogExplorer extends React.Component<Props, State> {
  props: Props;
  state: State = { isInvalid: false, range: '' };

  UNSAFE_componentWillMount() {
    const { semver } = this.props.match.params;
    if (semver)
      this.setState({
        range: decodeURI(String(this.props.match.params.semver)),
      });
  }

  // TODO: [strictFunctionTypes] Fix any
  handleChange = (e: React.ChangeEvent<any>) => {
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
    const Content = Loadable<{}, ResolvedLog>({
      loading: () => <Loading />,
      loader: async () =>
        fs.isFile(found) ? { log: await found.contents() } : { log: '' },
      render: changelog =>
        changelog ? (
          <Changelog
            changelog={divvyChangelog({ default: changelog.log })}
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

const Back = ({
  children,
  to,
}: {
  children?: React.ReactChild;
  to: string;
}) => (
  <Button
    appearance="link"
    component={Link}
    iconBefore={<ArrowLeft size={16} />}
    spacing="none"
    to={to}
  >
    <span style={{ paddingLeft: '0.5em' }}>{children || 'Back to Docs'}</span>
  </Button>
);

const LogWrapper = styled.div`
  margin-top: 2em;
`;
