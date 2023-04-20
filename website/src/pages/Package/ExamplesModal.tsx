import Button, { ButtonGroup } from '@uidu/button';
import { LinkItem, MenuGroup, Section } from '@uidu/menu';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '@uidu/modal-dialog';
import { colors, gridSize } from '@uidu/theme';
import Tooltip from '@uidu/tooltip';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Code, Link as LinkIcon, Maximize, X } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { Link } from '../../components/WrappedLink';
import { getConfig } from '../../site';
import * as fs from '../../utils/fs';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';

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
const ContentBody = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 17px;
`;
const ModalContent = styled.div`
  flex: 1 1 auto;
  min-height: 240px;
  padding: ${gridSize() * 2}px;
`;
const ModalActions = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

// ==============================
// NAVIGATION
// ==============================

const keylineMask = css`
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
`;

function ExampleNavigation({ examples, exampleId, onExampleSelected }) {
  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  return (
    <div tw="border-r flex h-full">
      <MenuGroup>
        <Section isScrollable>
          {examples ? (
            fs.flatMap(
              examples,
              (file, filePath) =>
                file.id.match(regex) && (
                  <LinkItem
                    key={file.id}
                    tw="px-6"
                    href={fs.normalize(filePath.replace('examples/', ''))}
                    isSelected={file.id === exampleId}
                    onClick={(event) => {
                      event.preventDefault();
                      onExampleSelected(
                        fs.normalize(filePath.replace('examples/', '')),
                      );
                    }}
                  >
                    {fs.titleize(file.id)}
                  </LinkItem>
                ),
            )
          ) : (
            <div>No Examples</div>
          )}
        </Section>
      </MenuGroup>
    </div>
  );
}

export type State = {
  displayCode: boolean;
  flags: Object;
  loadingSandbox: boolean;
};

export type Props = {} & RouteComponentProps;

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
  <ModalHeader tw="border-b px-6">
    <ModalTitle>{fs.titleize(packageId)} Examples</ModalTitle>
    <ModalActions>
      <ButtonGroup>
        <Button
          onClick={onCodeToggle}
          isSelected={displayCode}
          title={displayCode ? 'Hide Source' : 'Show Source'}
          iconBefore={<Code size={16} />}
        >
          Source
        </Button>
        <Tooltip content="Fullscreen" position="bottom">
          <Button
            as={Link as any}
            to={toExampleUrl(groupId, packageId, exampleId)}
            iconBefore={<Maximize size={16} />}
          />
        </Tooltip>
        <Tooltip content="Isolated View" position="bottom">
          <Button
            as="a"
            href={loaderUrl}
            target={'_blank'}
            iconBefore={<LinkIcon size={16} />}
          />
        </Tooltip>
        <Tooltip content="Close" position="bottom">
          <Button onClick={close} iconBefore={<X size={16} />} />
        </Tooltip>
      </ButtonGroup>
    </ModalActions>
  </ModalHeader>
);

export default class ExamplesModal extends React.Component<Props, State> {
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
    this.props.history.push(url);
  }

  onCodeToggle = () =>
    this.setState((state) => ({ displayCode: !state.displayCode }));

  close = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();

    const { params } = this.props.match;
    const { packageId, groupId } = packageResolver(
      params.groupId,
      params.pkgId,
      params.exampleId,
    );
    const url = `/packages/${groupId}/${packageId}`;

    this.props.history.push(url);
  };

  render() {
    const { hasChanged, groups, examples, packageId, groupId, exampleId } =
      packageResolver(
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
        width="calc(100vw - 2rem)"
        height="calc(100vh - 2rem)"
        tw="[--modal-dialog-gutter:1rem]"
        // shouldScrollInViewport
        // header={({ showKeyline }) => (
        //   <ModalHeaderComp
        //     showKeyline={showKeyline}
        //     packageId={packageId}
        //     example={example}
        //     examples={examples}
        //     exampleId={exampleId}
        //     groupId={groupId}
        //     pkgJSON={pkgJSON}
        //     displayCode={displayCode}
        //     loaderUrl={loaderUrl}
        //     onCodeToggle={this.onCodeToggle}
        //     close={this.close}
        //   />
        // )}
        onClose={this.close}
      >
        <Helmet>
          <title>
            Example - {fs.titleize(exampleId)} - {fs.titleize(packageId)} -{' '}
            {BASE_TITLE}
          </title>
        </Helmet>
        <ModalHeaderComp
          // showKeyline={showKeyline}
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
        <ModalBody tw="h-full flex p-0">
          <ExampleNavigation
            packageId={packageId}
            exampleId={exampleId}
            groups={groups}
            examples={examples}
            onPackageSelected={this.onPackageSelected}
            onExampleSelected={this.onExampleSelected}
            loadingSandbox={this.state.loadingSandbox}
          />
          <ModalContent tw="p-0">
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
          </ModalContent>
        </ModalBody>
      </Modal>
    );
  }
}
