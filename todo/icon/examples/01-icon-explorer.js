// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { FieldTextStateless } from '@atlaskit/field-text';

import { metadata as objectIconMetadata } from '@atlaskit/icon-object';
import { metadata as fileTypeIconMetadata } from '@atlaskit/icon-file-type';
import { metadata as priorityIconMetadata } from '@atlaskit/icon-priority';

import { metadata } from '../src';
import IconExplorerCell from './utils/IconExplorerCell';
import logoIcons from '../utils/logoIcons';

// WARNING
// It is going to be very tempting to move these into some higher level abstraction
// They need to live at the root because of the dynamic imports so webpack resolves
// them correctly

const iconIconInfo = Promise.all(
  Object.keys(metadata).map(async (name: $Keys<typeof metadata>) => {
    // $ExpectError - we are fine with this being dynamic
    const icon = await import(`../glyph/${name}.js`);
    return { name, icon: icon.default };
  }),
).then(newData =>
  newData
    .map(icon => ({
      [icon.name]: { ...metadata[icon.name], component: icon.icon },
    }))
    .reduce((acc, b) => ({ ...acc, ...b })),
);
const objectIconInfo = Promise.all(
  Object.keys(objectIconMetadata).map(
    async (name: $Keys<typeof objectIconMetadata>) => {
      // $ExpectError - we are fine with this being dynamic
      const icon = await import(`@atlaskit/icon-object/glyph/${name}.js`);
      return { name, icon: icon.default };
    },
  ),
).then(newData =>
  newData
    .map(icon => ({
      [icon.name]: { ...objectIconMetadata[icon.name], component: icon.icon },
    }))
    .reduce((acc, b) => ({ ...acc, ...b })),
);
const fileTypeIconInfo = Promise.all(
  Object.keys(fileTypeIconMetadata).map(
    async (name: $Keys<typeof fileTypeIconMetadata>) => {
      // $ExpectError - we are fine with this being dynamic
      const icon = await import(`@atlaskit/icon-file-type/glyph/${name}.js`);
      return { name, icon: icon.default };
    },
  ),
).then(newData =>
  newData
    .map(icon => ({
      [icon.name]: { ...fileTypeIconMetadata[icon.name], component: icon.icon },
    }))
    .reduce((acc, b) => ({ ...acc, ...b })),
);

const priorityIconInfo = Promise.all(
  Object.keys(priorityIconMetadata).map(
    async (name: $Keys<typeof priorityIconMetadata>) => {
      // $ExpectError - we are fine with this being dynamic
      const icon = await import(`@atlaskit/icon-priority/glyph/${name}.js`);
      return { name, icon: icon.default };
    },
  ),
).then(newData =>
  newData
    .map(icon => ({
      [icon.name]: { ...priorityIconMetadata[icon.name], component: icon.icon },
    }))
    .reduce((acc, b) => ({ ...acc, ...b })),
);

const getAllIcons = async () => {
  const iconData = await iconIconInfo;
  const objectData = await objectIconInfo;
  const filetypeData = await fileTypeIconInfo;
  const priorityData = await priorityIconInfo;
  return {
    first: {
      componentName: 'divider-icons',
      component: () => 'exported from @atlaskit/icon',
      keywords: getKeywords(metadata),
      divider: true,
    },
    ...iconData,
    firstTwo: {
      componentName: 'divider-product',
      component: () => 'exported from @atlaskit/logo',
      keywords: getKeywords(logoIcons),
      divider: true,
    },
    ...logoIcons,
    second: {
      componentName: 'divider-object-icons',
      component: () => 'exported from @atlaskit/icon-object',
      keywords: getKeywords(objectIconMetadata),
      divider: true,
    },
    ...objectData,
    third: {
      componentName: 'divider-file-type-icons',
      component: () => 'exported from @atlaskit/icon-file-type',
      keywords: getKeywords(fileTypeIconMetadata),
      divider: true,
    },
    ...filetypeData,
    forth: {
      componentName: 'divider-priority-icons',
      component: () => 'exported from @atlaskit/icon-priority',
      keywords: getKeywords(priorityIconMetadata),
      divider: true,
    },
    ...priorityData,
  };
};
const allIconsPromise = getAllIcons();

const getKeywords = logoMap =>
  Object.values(logoMap).reduce(
    (existingKeywords, { keywords } /*:any*/) => [
      ...existingKeywords,
      ...keywords,
    ],
    [],
  );

const IconGridWrapper = styled.div`
  padding: 10px 5px 0;
`;

const IconExplorerGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
`;

const NoIcons = styled.div`
  margin-top: 10px;
  padding: 10px;
`;

type iconType = {
  keywords: string[],
  component: Class<Component<*>>,
  componentName: string,
  package: string,
  divider?: boolean,
};

const filterIcons = (icons, query) => {
  const regex = new RegExp(query);
  return Object.keys(icons)
    .map(index => icons[index])
    .filter(icon =>
      icon.keywords
        .map(keyword => (regex.test(keyword) ? 1 : 0))
        .reduce((allMatches, match) => allMatches + match, 0),
    );
};

type State = {
  query: string,
  showIcons: boolean,
  allIcons?: { [string]: iconType },
};

class IconAllExample extends Component<{}, State> {
  state = {
    query: '',
    showIcons: false,
  };

  componentDidMount() {
    allIconsPromise.then(allIcons => this.setState({ allIcons }));
  }

  updateQuery = (query: string) => this.setState({ query, showIcons: true });

  toggleShowIcons = () => this.setState({ showIcons: !this.state.showIcons });

  renderIcons = () => {
    if (!this.state.allIcons) {
      return <div>Loading Icons...</div>;
    }
    const icons: iconType[] = filterIcons(
      this.state.allIcons,
      this.state.query,
    );
    return icons.length ? (
      <IconExplorerGrid>
        {icons.map(icon => (
          <IconExplorerCell {...icon} key={icon.componentName} />
        ))}
      </IconExplorerGrid>
    ) : (
      <NoIcons>{`Sorry, we couldn't find any icons matching "${
        this.state.query
      }".`}</NoIcons>
    );
  };

  render() {
    return (
      <div>
        <FieldTextStateless
          isLabelHidden
          key="Icon search"
          label=""
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            this.updateQuery(event.currentTarget.value)
          }
          placeholder="Search for an icon..."
          shouldFitContainer
          value={this.state.query}
        />
        <IconGridWrapper>
          <p>
            <Button
              appearance="subtle-link"
              onClick={() => this.toggleShowIcons()}
              spacing="none"
            >
              {this.state.showIcons ? 'Hide icons' : 'Show all icons'}
            </Button>
          </p>
          {this.state.showIcons ? this.renderIcons() : null}
        </IconGridWrapper>
      </div>
    );
  }
}

export default IconAllExample;
