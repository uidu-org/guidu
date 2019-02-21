// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import LinkIcon from '@atlaskit/icon/glyph/link';
import Button from '@uidu/button';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Flag, { FlagGroup } from '@atlaskit/flag';
import SingleSelect from '@atlaskit/single-select';
import Tooltip from '@atlaskit/tooltip';
import { colors } from '@atlaskit/theme';

import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import * as fs from '../../utils/fs';
import type { RouterMatch } from '../../types';
import { getConfig } from '../../site';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import { packageUrl } from '../../utils/url';
// import CodeSandbox from '../Package/CodeSandbox';
import CodeSandboxLogo from '../Package/CodeSandboxLogo';

import {
  CodeContainer,
  Container,
  Content,
  Control,
  ErrorMessage,
  ExampleComponentWrapper,
  Nav,
  NavButton,
  NavLink,
  NavSection,
} from './styled';

export const SANDBOX_DEPLOY_ENDPOINT =
  'https://atlaskit-deploy-sandbox.glitch.me/deploy';

function PackageSelector(props) {
  let selectedPackageItem;

  const packagesSelectItems = props.groups.map(group => {
    return {
      heading: fs.titleize(group.id),
      items: fs.getDirectories(group.children).map(pkg => {
        const item = {
          content: fs.titleize(pkg.id),
          value: `${group.id}/${pkg.id}`,
        };

        if (props.groupId === group.id && props.packageId === pkg.id) {
          selectedPackageItem = item;
        }

        return item;
      }),
    };
  });

  return (
    <Control>
      <SingleSelect
        appearance="subtle"
        items={packagesSelectItems}
        hasAutocomplete
        placeholder="Select Package"
        onSelected={props.onSelected}
        defaultSelected={selectedPackageItem}
      />
    </Control>
  );
}

function ExampleSelector(props) {
  let selectedExampleItem;

  const examplesSelectItems = [
    {
      heading: 'Examples',
      items: props.examples
        ? fs.flatMap(props.examples, (file, filePath) => {
            const item = {
              content: fs.titleize(file.id),
              value: fs.normalize(filePath.replace('examples/', '')),
            };

            if (file.id === props.exampleId) {
              selectedExampleItem = item;
            }

            return item;
          })
        : [],
    },
  ];

  return (
    <Control>
      <SingleSelect
        appearance="subtle"
        items={examplesSelectItems}
        hasAutocomplete
        placeholder="Select Example"
        onSelected={props.onSelected}
        defaultSelected={selectedExampleItem}
      />
    </Control>
  );
}

class ExampleNavigation extends Component {
  state = {};
  render() {
    const {
      onExampleSelected,
      examples,
      onPackageSelected,
      groups,
      exampleId,
      groupId,
      loaderUrl,
      packageId,
      config,
      codeIsVisible,
      onCodeToggle,
    } = this.props;
    const { error } = this.state;
    const example = examples && examples.children.find(e => e.id === exampleId);

    return (
      <Nav>
        <NavSection style={{ marginLeft: 8 }}>
          <Tooltip content="Back to docs" position="right">
            <NavLink to={packageUrl(groupId, packageId)}>
              <ArrowLeftIcon label="Back to docs" />
            </NavLink>
          </Tooltip>
        </NavSection>

        <NavSection>
          <PackageSelector
            groupId={groupId}
            packageId={packageId}
            groups={groups}
            onSelected={onPackageSelected}
          />
          <ExampleSelector
            examples={examples}
            exampleId={exampleId}
            onSelected={onExampleSelected}
          />
        </NavSection>
        <NavSection style={{ marginRight: 8 }}>
          <Tooltip
            content={error ? error.name : 'Deploy to CodeSandbox'}
            position="left"
          >
            {/* <CodeSandbox
              example={example}
              groupId={groupId}
              packageId={packageId}
              pkgJSON={config}
              afterDeployError={error => this.setState({ error })}
              loadingButton={() => (
                <NavButton style={{ marginRight: 8 }} type="Submit" disabled>
                  <CodeSandboxLogo />
                </NavButton>
              )}
              deployButton={({ isDisabled }) => (
                <NavButton
                  style={{ marginRight: 8 }}
                  type="Submit"
                  disabled={isDisabled}
                >
                  <CodeSandboxLogo />
                </NavButton>
              )}
              useNavButton
            /> */}
          </Tooltip>
          <Tooltip
            content={`${codeIsVisible ? 'Hide' : 'Show'} source`}
            position="left"
          >
            <NavButton isSelected={codeIsVisible} onClick={onCodeToggle}>
              <CodeIcon label="Show source" />
            </NavButton>
          </Tooltip>
          <Tooltip content="Isolated View" position="bottom">
            <Button
              appearance="subtle"
              iconBefore={<LinkIcon label="Link Icon" />}
              href={loaderUrl}
              target="_blank"
            />
          </Tooltip>
        </NavSection>
      </Nav>
    );
  }
}

type State = {
  displayCode: boolean,
  flags: Object,
  loadingSandbox: boolean,
};

type Props = {
  match: RouterMatch,
};

export default class Examples extends React.Component<Props, State> {
  state = {
    displayCode: false,
    flags: {},
    loadingSandbox: false,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  onPackageSelected = (selected: { item: { value: string } }) => {
    const [groupId, packageId] = selected.item.value.split('/');
    this.updateSelected(groupId, packageId);
  };

  onExampleSelected = (selected: { item: { value: string } }) => {
    this.updateSelected(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      selected.item.value,
    );
  };

  updateSelected(groupId?: string, packageId?: string, exampleId?: string) {
    const resolved = packageResolver(groupId, packageId, exampleId);
    const url = this.toUrl(
      resolved.groupId,
      resolved.packageId,
      resolved.exampleId,
    );

    this.context.router.history.push(url);
  }

  toUrl(groupId?: string, packageId?: string, exampleId?: string | null) {
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

  onCodeToggle = () =>
    this.setState(state => ({ displayCode: !state.displayCode }));

  addFlag = (flagProps: {
    appearance: 'error' | 'info' | 'normal' | 'success' | 'warning',
    description: string,
    title: string,
  }) => {
    const id = Date.now().toString();
    const icon = (() => {
      if (flagProps.appearance === 'error') {
        return <ErrorIcon label="Error" secondaryColor={colors.R400} />;
      }

      return '';
    })();
    this.setState({
      flags: {
        [id]: (
          <Flag
            icon={icon}
            id={id}
            key={id}
            actions={[{ content: 'OK', onClick: () => this.removeFlag(id) }]}
            {...flagProps}
          />
        ),
        ...this.state.flags,
      },
    });
  };

  removeFlag = (removedKey: string) => {
    const flags = Object.keys(this.state.flags)
      .filter(key => key !== removedKey.toString())
      .reduce(
        (newFlags, key) => ({ ...newFlags, [key]: this.state.flags[key] }),
        {},
      );

    this.setState({ flags });
  };

  deploySandbox = async () => {
    const props = packageResolver(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      this.props.match.params.exampleId,
    );

    if (!props.example) {
      return;
    }

    const component = props.packageId;
    const example = props.example.id
      .split('.')
      .slice(0, -1)
      .join('.');
    this.setState({ loadingSandbox: true });
    const response = await fetch(
      `${SANDBOX_DEPLOY_ENDPOINT}/${component}/${example}`,
    );
    if (response.ok) {
      const url = await response.text();
      window.open(url);
    } else {
      const message = await response.text();
      this.addFlag({
        appearance: 'error',
        description: message,
        title: 'Error deploying to Codesandbox',
      });
    }
    this.setState({ loadingSandbox: false });
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

    const loaderUrl = getLoaderUrl(
      groupId,
      packageId,
      this.props.match.params.exampleId,
    );

    if (hasChanged) {
      return <Redirect to={this.toUrl(groupId, packageId, exampleId)} />;
    }
    const config = getConfig(groupId, packageId).config;
    return (
      <Container>
        <ExampleNavigation
          groupId={groupId}
          packageId={packageId}
          exampleId={exampleId}
          groups={groups}
          examples={examples}
          loaderUrl={loaderUrl}
          codeIsVisible={this.state.displayCode}
          onPackageSelected={this.onPackageSelected}
          onExampleSelected={this.onExampleSelected}
          onCodeToggle={this.onCodeToggle}
          deploySandbox={this.deploySandbox}
          loadingSandbox={this.state.loadingSandbox}
          config={config}
        />
        <Helmet>
          <title>
            Example - {fs.titleize(exampleId)} - {fs.titleize(packageId)} -{' '}
            {BASE_TITLE}
          </title>
        </Helmet>
        {examples && exampleId ? (
          <ExampleDisplay
            displayCode={this.state.displayCode}
            example={fs.getById(fs.getFiles(examples.children), exampleId)}
            name={config.name}
            src={loaderUrl}
          >
            {(ExampleCode, ExampleComponent, displayCode) => {
              return (
                <Content>
                  <ExampleComponentWrapper codeIsVisible={displayCode}>
                    <ExampleComponent />
                  </ExampleComponentWrapper>
                  <CodeContainer show={displayCode}>
                    <ExampleCode />
                  </CodeContainer>
                </Content>
              );
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
      </Container>
    );
  }
}
