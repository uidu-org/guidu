// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Link } from '../../components/WrappedLink';
import { Helmet } from 'react-helmet';

import CodeIcon from '@atlaskit/icon/glyph/code';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ScreenIcon from '@atlaskit/icon/glyph/screen';
import LinkIcon from '@atlaskit/icon/glyph/link';

import Button from '@uidu/button';
import { FlagGroup } from '@atlaskit/flag';
import Tooltip from '@atlaskit/tooltip';
import Modal, {
  ModalBody as Body,
  ModalHeader as OgModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { colors, elevation, gridSize } from '@atlaskit/theme';

import * as fs from '../../utils/fs';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import type { RouterMatch } from '../../types';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { getConfig } from '../../site';
// import CodeSandbox from './CodeSandbox';
import CodeSandboxLogo from './CodeSandboxLogo';

// ==============================
// PAGE
// ==============================

const Content = styled.div`
  flex: 1 1 auto;
`;

const CodeContainer = styled.div``;

const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  color: white;
  font-size: 120%;
  padding: 1em;
`;

// ==============================
// MODAL
// ==============================
const ModalBody = styled(Body)`
  display: flex;
  flex-direction: column;
`;
const ContentBody = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 17px;
`;
const ModalContent = styled.div`
  flex: 1 1 auto;
  min-height: 240px;
  padding: ${gridSize() * 2}px;
  ${elevation.e200};
`;
const ModalHeader = styled(OgModalHeader)`
  margin-left: ${gridSize() * 2.5}px;
  margin-right: ${gridSize() * 2.5}px;
  padding-left: 0;
  padding-right: 0;
`;
const ModalActions = styled.div`
  display: flex;
`;

// ==============================
// NAVIGATION
// ==============================

const keylineMask = css`
  background-color: ${colors.background};
  margin-top: -2px;
  padding-top: 2px;
`;
const Nav = styled.nav`
  ${keylineMask} flex-shrink: 0;
  margin-right: ${gridSize() * 2}px;
  position: relative;
  width: 240px;
`;
const NavInner = styled.div`
  max-height: 100%;
  overflow-y: auto;
  padding: 2px;

  /* Not ideal to be overriding AkButton styles, but we don't have a link list component */
  a {
    margin: 2px 0 0 0;
    width: 100%;
  }
`;

function ExampleNavigation({ examples, exampleId, onExampleSelected }) {
  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  return (
    <Nav>
      <NavInner>
        {examples ? (
          fs.flatMap(
            examples,
            (file, filePath) =>
              file.id.match(regex) && (
                <Button
                  isSelected={file.id === exampleId}
                  key={file.id}
                  appearance="subtle"
                  spacing="compact"
                  href={fs.normalize(filePath.replace('examples/', ''))}
                  onClick={event => {
                    event.preventDefault();
                    onExampleSelected(
                      fs.normalize(filePath.replace('examples/', '')),
                    );
                  }}
                >
                  {fs.titleize(file.id)}
                </Button>
              ),
          )
        ) : (
          <div>No Examples</div>
        )}
      </NavInner>
    </Nav>
  );
}

type State = {
  displayCode: boolean,
  flags: Object,
  loadingSandbox: boolean,
};

type Props = {
  match: RouterMatch,
};

function toUrl(
  groupId?: string,
  packageId?: string,
  exampleId?: string | null,
) {
  let url;

  if (!groupId) {
    url = `/packages`;
  } else if (!packageId) {
    url = `/packages/${groupId}`;
  } else if (!exampleId) {
    url = `/packages/${groupId}/${packageId}`;
  } else {
    url = `/packages/${groupId}/${packageId}/example/${fs.normalize(
      exampleId,
    )}`;
  }

  return url;
}

function toExampleUrl(
  groupId?: string,
  packageId?: string,
  exampleId?: string | null,
) {
  let url;

  if (!groupId) {
    url = `/examples`;
  } else if (!packageId) {
    url = `/examples/${groupId}`;
  } else if (!exampleId) {
    url = `/examples/${groupId}/${packageId}`;
  } else {
    url = `/examples/${groupId}/${packageId}/${fs.normalize(exampleId)}`;
  }

  return url;
}

const ModalHeaderComp = ({
  showKeyline,
  packageId,
  example,
  examples,
  groupId,
  pkgJSON,
  displayCode,
  exampleId,
  loaderUrl,
  onCodeToggle,
  close,
}) => (
  <ModalHeader showKeyline={showKeyline}>
    <ModalTitle>{fs.titleize(packageId)} Examples</ModalTitle>
    <ModalActions>
      <div>
        {/* <CodeSandbox
          example={example}
          examples={examples}
          groupId={groupId}
          packageId={packageId}
          pkgJSON={pkgJSON}
          loadingButton={() => (
            <Button type="submit" isDisabled iconBefore={<CodeSandboxLogo />}>
              Loading...
            </Button>
          )}
          deployButton={({ isDisabled, error }) => (
            <Button
              type="submit"
              isDisabled={isDisabled}
              iconBefore={<CodeSandboxLogo />}
            >
              {error ? error.name : 'Sandbox'}
            </Button>
          )}
        /> */}
        <Button
          iconBefore={<CodeIcon label="Toggle code snippet" />}
          onClick={onCodeToggle}
          isSelected={displayCode}
          title={displayCode ? 'Hide Source' : 'Show Source'}
        >
          Source
        </Button>
        <Tooltip content="Fullscreen" position="bottom">
          <Button
            appearance="subtle"
            component={Link}
            iconBefore={<ScreenIcon label="Screen Icon" />}
            to={toExampleUrl(groupId, packageId, exampleId)}
          />
        </Tooltip>
        <Tooltip content="Isolated View" position="bottom">
          <Button
            appearance="subtle"
            component={'a'}
            iconBefore={<LinkIcon label="Link Icon" />}
            href={loaderUrl}
            target={'_blank'}
          />
        </Tooltip>
        <Tooltip content="Close" position="bottom">
          <Button
            appearance="subtle"
            iconBefore={<CloseIcon label="Close Modal" />}
            onClick={close}
          />
        </Tooltip>
      </div>
    </ModalActions>
  </ModalHeader>
);

export default class ExamplesModal extends Component<Props, State> {
  state = {
    displayCode: false,
    flags: {},
    loadingSandbox: false,
  };

  getChildContext() {
    return {
      theme: 'dark',
    };
  }

  static childContextTypes = {
    theme: PropTypes.string,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  onPackageSelected = (selected: { item: { value: string } }) => {
    const [groupId, packageId] = selected.item.value.split('/');
    this.updateSelected(groupId, packageId);
  };

  onExampleSelected = (selected: string) => {
    this.updateSelected(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      selected,
    );
  };

  updateSelected(groupId?: string, packageId?: string, exampleId?: string) {
    const resolved = packageResolver(groupId, packageId, exampleId);
    const url = toUrl(resolved.groupId, resolved.packageId, resolved.exampleId);
    this.context.router.history.push(url);
  }

  onCodeToggle = () =>
    this.setState(state => ({ displayCode: !state.displayCode }));

  close = (event?: Event) => {
    if (event) event.stopPropagation();

    const { params } = this.props.match;
    const { packageId, groupId } = packageResolver(
      params.groupId,
      params.pkgId,
      params.exampleId,
    );
    const url = `/packages/${groupId}/${packageId}`;

    this.context.router.history.push(url);
  };

  render() {
    const {
      hasChanged,
      groups,
      examples,
      packageId,
      groupId,
      exampleId,
    } = packageResolver(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      this.props.match.params.exampleId,
    );

    let example;
    if (exampleId && examples) {
      example = fs.getById(fs.getFiles(examples.children), exampleId);
    }

    const { displayCode } = this.state;
    const pkgJSON = getConfig(groupId, packageId).config;
    const loaderUrl = getLoaderUrl(
      groupId,
      packageId,
      this.props.match.params.exampleId,
    );

    if (hasChanged) {
      return <Redirect to={toUrl(groupId, packageId, exampleId)} />;
    }
    return (
      <Modal
        autoFocus={false}
        body={ModalBody}
        header={({ showKeyline }) => (
          <ModalHeaderComp
            showKeyline={showKeyline}
            packageId={packageId}
            example={example}
            examples={examples}
            exampleId={exampleId}
            groupId={groupId}
            pkgJSON={pkgJSON}
            displayCode={displayCode}
            loaderUrl={loaderUrl}
            onCodeToggle={this.onCodeToggle}
            close={this.close}
          />
        )}
        height="100%"
        onClose={this.close}
        width={1180}
      >
        <Helmet>
          <title>
            Example - {fs.titleize(exampleId)} - {fs.titleize(packageId)} -{' '}
            {BASE_TITLE}
          </title>
        </Helmet>
        <ContentBody>
          <ExampleNavigation
            groupId={groupId}
            packageId={packageId}
            exampleId={exampleId}
            groups={groups}
            examples={examples}
            onPackageSelected={this.onPackageSelected}
            onExampleSelected={this.onExampleSelected}
            loadingSandbox={this.state.loadingSandbox}
          />
          <ModalContent>
            {examples && exampleId && loaderUrl ? (
              <ExampleDisplay
                displayCode={displayCode}
                example={fs.getById(fs.getFiles(examples.children), exampleId)}
                name={pkgJSON.name}
                src={loaderUrl}
              >
                {(ExampleCode, ExampleComponent, displayCode) => {
                  if (displayCode) {
                    return (
                      <Content>
                        <CodeContainer>
                          <ExampleCode />
                        </CodeContainer>
                      </Content>
                    );
                  }
                  return <ExampleComponent />;
                }}
              </ExampleDisplay>
            ) : (
              <Content>
                <ErrorMessage>
                  {fs.titleize(packageId)} does not have any examples
                </ErrorMessage>
              </Content>
            )}
            <FlagGroup>
              {Object.keys(this.state.flags).map(key => this.state.flags[key])}
            </FlagGroup>
          </ModalContent>
        </ContentBody>
      </Modal>
    );
  }
}
