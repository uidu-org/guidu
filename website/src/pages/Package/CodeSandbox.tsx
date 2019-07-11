import { replaceSrc } from '@uidu/docs';
import * as React from 'react';
import CodeSandboxer from 'react-codesandboxer';

const getExampleUrl = (groupId, packageId, exampleId) =>
  `https://bitbucket.org/atlassian/atlaskit-mk-2/raw/HEAD/packages/${groupId}/${packageId}/examples/${exampleId}`;
const getExamplePath = (groupId, packageId, exampleId) =>
  `packages/${groupId}/${packageId}/examples/${exampleId}`;
const repoUrl = 'https://bitbucket.org/atlassian/atlaskit-mk-2';

const baseFiles = (groupId, packageId, exampleId) => ({
  'index.js': {
    content: `/**
  This CodeSandbox has been automatically generated from the contents of ${getExampleUrl(
    groupId,
    packageId,
    exampleId,
  )}.

  This generator does not follow relative imports beyond those that reference the
  module root, and as such, other relative imports may fail to load.

  You can look up the relative imports from ${repoUrl}

  If this fails in any other way, contact Ben Conolly (https://bitbucket.org/bconolly)
*/
import * as React from 'react';
import ReactDOM from 'react-dom';
import Example from './example';

ReactDOM.render(
<Example />,
document.getElementById('root')
);`,
  },
});

/*
  The css packs use loaders, which are not needed in prod. This is incredibly not
  ideal. This handles these to create valid sandboxes.

  We only apply this creative solution because these examples are not recommended
  usages in any case.
*/
const cssLoaderExceptions = (pkgJSONName, groupId, packageId) => [
  ['!!style-loader!css-loader!../src/bundle.css', pkgJSONName],
  [`packages/${groupId}/${packageId}/src/index.less`, pkgJSONName],
  [
    '!!raw-loader!../src/icons-sprite.svg',
    `${pkgJSONName}/dist/icons-sprite.svg`,
  ],
];

// TODO: Type correct once codesandbox is typed
export type Props = {
  deployButton: any;
  example: any;
  examples: any;
  groupId: any;
  loadingButton: any;
  packageId: any;
  pkgJSON: any;
  afterDeployError?: any;
};

export type State = {
  parameters: string;
};
export default class CodeSandbox extends React.Component<Props, State> {
  state = { parameters: '' };

  render() {
    const {
      deployButton,
      example,
      groupId,
      loadingButton,
      packageId,
      pkgJSON,
      afterDeployError,
    } = this.props;

    const name = example.id
      .split('.')
      .slice(0, -1)
      .join('-');

    return (
      <CodeSandboxer
        examplePath={getExamplePath(groupId, packageId, example.id)}
        example={example
          .contents()
          .then(content => replaceSrc(content.default, pkgJSON.name))}
        pkgJSON={pkgJSON}
        name={`${pkgJSON.name}-${name}`}
        afterDeployError={afterDeployError}
        gitInfo={{
          account: 'atlassian',
          repository: 'atlaskit-mk-2',
          branch: 'master',
          host: 'bitbucket',
        }}
        importReplacements={[
          [`packages/${groupId}/${packageId}/src`, pkgJSON.name],
          ['packages/core/icon/glyph/*', `${pkgJSON.name}/glyph/`],
          ['packages/core/icon-file-type/glyph/*', `${pkgJSON.name}/glyph/`],
          ['packages/core/icon-object/glyph/*', `${pkgJSON.name}/glyph/`],
          ...cssLoaderExceptions(pkgJSON.name, groupId, packageId),
        ]}
        dependencies={{
          'styled-components':
            pkgJSON.peerDependencies &&
            pkgJSON.peerDependencies['styled-components']
              ? pkgJSON.peerDependencies['styled-components']
              : 'latest',
          [pkgJSON.name]: pkgJSON.version,
        }}
        providedFiles={baseFiles(groupId, packageId, example.id)}
      >
        {({ isLoading, error }) =>
          isLoading ? loadingButton() : deployButton({ error })
        }
      </CodeSandboxer>
    );
  }
}
