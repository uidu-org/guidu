import Button from '@uidu/button';
import { FieldTextStateless as Input } from '@uidu/field-text';
import Modal, { ModalHeader as OgModalHeader } from '@uidu/modal-dialog';
import { gridSize, math } from '@uidu/theme';
import * as H from 'history';
import * as React from 'react';
import { X } from 'react-feather';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import styled from 'styled-components';
import Changelog, { NoMatch } from '../../components/ChangeLog';
import Loading from '../../components/Loading';
import { packages } from '../../site';
import { divvyChangelog } from '../../utils/changelog';
import * as fs from '../../utils/fs';

// ==============================
// STYLES
// ==============================

const ModalBody = styled.div`
  padding-bottom: ${math.multiply(gridSize, 2)}px;
`;

const ModalHeader = styled(OgModalHeader)`
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 0;
  padding-right: 0;
`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  padding-right: ${math.multiply(gridSize, 2)}px;
`;
const LogWrapper = styled.div`
  margin-top: 2em;
`;

// ==============================
// END STYLES
// ==============================

export type HeaderProps = {
  isInvalid: boolean;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onClose: () => void;
  showKeyline: boolean;
  value: string;
};
const Header = ({
  isInvalid,
  onChange,
  onClose,
  showKeyline,
  value,
}: HeaderProps) => (
  <ModalHeader showKeyline={showKeyline}>
    <FieldWrapper>
      <Input
        key="input"
        isInvalid={isInvalid}
        isLabelHidden
        label="Semver Range"
        onChange={onChange}
        placeholder={'Semver Range: e.g. "> 1.0.6 <= 3.0.2"'}
        shouldFitContainer
        value={value}
      />
    </FieldWrapper>
    <Button
      appearance="subtle"
      iconBefore={<X size={16} />}
      onClick={onClose}
    />
  </ModalHeader>
);

// ==============================
// END STYLES
// ==============================

// Ensure the string ends with a number:
// avoids unsatisfied semver range, which causes a flickering "no match" message
// as the user is typing
function getQualifiedRange(str: string) {
  if (/[0-9]$/.test(str)) return str;

  return '';
}

export type ResolvedChangelog = {
  changelog?: string;
};

export type Props = {
  match: match<Record<string, string>>;
  history: H.History;
};
export type State = {
  isInvalid: boolean;
  range: string;
};

export default class ExamplesModal extends React.Component<Props, State> {
  state: State = { isInvalid: false, range: '' };

  componentDidMount() {
    const { semver } = this.props.match.params;

    if (semver)
      this.setState({
        range: decodeURI(String(this.props.match.params.semver)),
      });
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { groupId, pkgId } = this.props.match.params;
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const range = target.value;
    const isInvalid = /[a-z]/gi.test(range);
    const path = `/packages/${groupId}/${pkgId}/changelog/${encodeURI(range)}`;

    this.props.history.replace(path);
    this.setState({ isInvalid, range });
  };

  close = (event?: Event) => {
    if (event) event.stopPropagation();

    const { groupId, pkgId } = this.props.match.params;
    const url = `/packages/${groupId}/${pkgId}`;

    this.props.history.push(url);
  };

  header = () => {
    const { isInvalid, range } = this.state;

    return (
      <Header
        isInvalid={isInvalid}
        onChange={this.handleChange}
        onClose={this.close}
        showKeyline
        value={range}
      />
    );
  };

  render() {
    const { groupId, pkgId } = this.props.match.params;
    const filePath = `packages/${groupId}/${pkgId}/CHANGELOG.md`;
    const found = fs.find(packages, (file, currPath) => currPath === filePath);
    const { isInvalid, range } = this.state;

    const Content = Loadable<{}, ResolvedChangelog>({
      loading: () => <Loading />,
      loader: async () =>
        fs.isFile(found) ? { changelog: await found.contents() } : {},
      render: changelog =>
        changelog ? (
          <Changelog
            changelog={divvyChangelog({ default: changelog.changelog || '' })}
            range={getQualifiedRange(range)}
            packageName={pkgId}
          />
        ) : (
          <NoMatch>Invalid range; please try again.</NoMatch>
        ),
    });

    return (
      <Modal
        autoFocus
        components={{ Header: this.header }}
        height={600}
        onClose={this.close}
        width={640}
      >
        <Helmet>
          <title>{`Changelog - ${fs.titleize(pkgId)} - ${BASE_TITLE}`}</title>
        </Helmet>
        <ModalBody>
          {isInvalid ? (
            <NoMatch>Invalid range &mdash; please try again.</NoMatch>
          ) : (
            <LogWrapper>
              <Content />
            </LogWrapper>
          )}
        </ModalBody>
      </Modal>
    );
  }
}
