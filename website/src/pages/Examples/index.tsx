import { ArrowLeft, Code, Link } from 'react-feather';
import Button from '@uidu/button';
import { Form } from '@uidu/form';
import Select from '@uidu/select';
import Tooltip from '@uidu/tooltip';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { match, withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { externalPackages, getConfig } from '../../site';
import * as fs from '../../utils/fs';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import { packageUrl } from '../../utils/url';
import CodeSandbox from '../Package/CodeSandbox';
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

  const packagesSelectOptions = externalPackages.children.map(
    ({ id, children }) => ({
      label: fs.titleize(id),
      options: fs.getDirectories(children).map(pkg => {
        const item = {
          label: fs.titleize(pkg.id),
          value: `${id}/${pkg.id}`,
        };

        if (props.groupId === id && props.packageId === pkg.id) {
          selectedPackageItem = item;
        }

        return item;
      }),
    }),
  );

  return (
    <Control>
      <Form>
        <Select
          name="foo"
          styles={{
            container: styles => ({
              ...styles,
              flex: '1 1 0px',
            }),
            control: styles => ({
              ...styles,
              backgroundColor: '#fff',
            }),
          }}
          options={packagesSelectOptions}
          placeholder="Select Package"
          onChange={(value, { action }) =>
            action === 'select-option' && props.onSelected(value)
          }
          value={selectedPackageItem}
        />
      </Form>
    </Control>
  );
}

function ExampleSelector(props) {
  let selectedExampleItem;

  const examplesSelectItems = [
    {
      label: 'Examples',
      options: props.examples
        ? fs.flatMap(props.examples, (file, filePath) => {
            const item = {
              label: fs.titleize(file.id),
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
      <Form>
        <Select
          name="foo"
          styles={{
            container: styles => ({
              ...styles,
              flex: '1 1 0px',
            }),
            control: styles => ({
              ...styles,
              backgroundColor: '#fff',
            }),
          }}
          options={examplesSelectItems}
          placeholder="Select Example"
          onChange={(value, { action }) =>
            action === 'select-option' && props.onSelected(value)
          }
          value={selectedExampleItem}
        />
      </Form>
    </Control>
  );
}

// TODO: Type correct once codesandbox is typed
export type ExampleNavigationProps = {
  onExampleSelected?: (selected: { value: string }) => void;
  examples?: any;
  onPackageSelected?: (selected: { value: string }) => void;
  exampleId?: string;
  groupId: string;
  loaderUrl?: string | null;
  packageId: string;
  config?: any;
  codeIsVisible: boolean;
  onCodeToggle?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  deploySandbox?: any;
  loadingSandbox?: any;
};
class ExampleNavigation extends React.Component<ExampleNavigationProps> {
  state: Error = { name: '', message: '' };
  render() {
    const {
      onExampleSelected,
      examples,
      onPackageSelected,
      exampleId,
      groupId,
      loaderUrl,
      packageId,
      config,
      codeIsVisible,
      onCodeToggle,
    } = this.props;
    const error: Error = this.state;
    const example = examples && examples.children.find(e => e.id === exampleId);

    return (
      <Nav>
        <NavSection style={{ marginLeft: 8 }}>
          <Tooltip content="Back to docs" position="right">
            <NavLink to={packageUrl(groupId, packageId)}>
              <ArrowLeft size={16} />
            </NavLink>
          </Tooltip>
        </NavSection>

        <NavSection>
          <PackageSelector
            groupId={groupId}
            packageId={packageId}
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
            <CodeSandbox
              examples={examples}
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
            />
          </Tooltip>
          <Tooltip
            content={`${codeIsVisible ? 'Hide' : 'Show'} source`}
            position="left"
          >
            <NavButton isSelected={codeIsVisible} onClick={onCodeToggle}>
              <Code size={16} />
            </NavButton>
          </Tooltip>
          <Tooltip content="Isolated View" position="bottom">
            <Button
              appearance="subtle"
              iconBefore={<Link size={16} />}
              href={loaderUrl}
              target="_blank"
            />
          </Tooltip>
        </NavSection>
      </Nav>
    );
  }
}

export type State = {
  displayCode: boolean;
  flags: Object;
  loadingSandbox: boolean;
};

export type Props = {
  match: match<Record<string, string>>;
};

class Examples extends React.Component<Props, State> {
  state = {
    displayCode: false,
    flags: {},
    loadingSandbox: false,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  onPackageSelected = (selected: { value: string }) => {
    const [groupId, packageId] = selected.value.split('/');
    this.updateSelected(groupId, packageId);
  };

  onExampleSelected = (selected: { value: string }) => {
    this.updateSelected(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      selected.value,
    );
  };

  updateSelected(groupId?: string, packageId?: string, exampleId?: string) {
    const resolved = packageResolver(groupId, packageId, exampleId);
    const url = this.toUrl(
      resolved.groupId,
      resolved.packageId,
      resolved.exampleId,
    );

    this.props.history.push(url);
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
    }
    this.setState({ loadingSandbox: false });
  };

  render() {
    const {
      hasChanged,
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
            {`Example - ${fs.titleize(exampleId)} - ${fs.titleize(
              packageId,
            )} -${' '}
            ${BASE_TITLE}`}
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
      </Container>
    );
  }
}

export default withRouter(Examples);
