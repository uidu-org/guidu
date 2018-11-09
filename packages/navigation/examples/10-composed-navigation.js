// @flow

/*
  NOTE
  ----------------------------------------------------------------------------
  This is the source file for the webdriver test. If you make changes here,
  please update the tests to reflect those changes:

  `packages/core/navigation-next/src/__tests__/integration/navigation.js`
*/

import React, { Component, type Node } from 'react';
import Avatar from '@atlaskit/avatar';
import AddIcon from '@atlaskit/icon/glyph/add';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import BoardIcon from '@atlaskit/icon/glyph/board';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { JiraIcon, JiraWordmark } from '@atlaskit/logo';
import { ToggleStateless } from '@atlaskit/toggle';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import {
  ContainerHeader,
  GlobalNav,
  GroupHeading,
  HeaderSection,
  Item as ItemComponent,
  ItemAvatar,
  LayoutManager,
  MenuSection,
  NavigationProvider,
  Separator,
  Wordmark,
} from '../src';

const gridSize = gridSizeFn();

const Item = ({ testKey, ...props }: { testKey?: string }) => {
  const item = <ItemComponent {...props} />;
  return testKey ? <div data-webdriver-test-key={testKey}>{item}</div> : item;
};

/**
 * Global navigation
 */
const globalNavPrimaryItems = [
  {
    key: 'jira',
    icon: () => <JiraIcon size="medium" label="Jira" />,
    label: 'Jira',
  },
  { key: 'search', icon: SearchIcon, label: 'Search' },
  { key: 'create', icon: AddIcon, label: 'Add' },
];

const globalNavSecondaryItems = [
  { icon: QuestionCircleIcon, label: 'Help', size: 'small' },
  {
    icon: () => (
      <Avatar
        borderColor="transparent"
        isActive={false}
        isHover={false}
        size="small"
      />
    ),
    label: 'Profile',
    size: 'small',
  },
];

const GlobalNavigation = () => (
  <div data-webdriver-test-key="global-navigation">
    <GlobalNav
      primaryItems={globalNavPrimaryItems}
      secondaryItems={globalNavSecondaryItems}
    />
  </div>
);

const TestMark = ({ id, children }: { id: string, children: Node }) => (
  <div data-webdriver-test-key={id}>{children}</div>
);

/**
 * Content navigation
 */
const ProductNavigation = () => (
  <div data-webdriver-test-key="product-navigation">
    <HeaderSection>
      {({ className }) => (
        <div className={className}>
          <TestMark id="product-header">
            <Wordmark wordmark={JiraWordmark} />
          </TestMark>
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={DashboardIcon}
            text="Dashboards"
            testKey="product-item-dashboards"
          />
          <Item
            before={FolderIcon}
            text="Projects"
            testKey="product-item-projects"
          />
          <Item
            before={IssuesIcon}
            text="Issues"
            testKey="product-item-issues"
          />
        </div>
      )}
    </MenuSection>
  </div>
);

const ContainerNavigation = () => (
  <div data-webdriver-test-key="container-navigation">
    <HeaderSection>
      {({ css }) => (
        <div
          data-webdriver-test-key="container-header"
          css={{
            ...css,
            paddingBottom: gridSize * 2.5,
          }}
        >
          <ContainerHeader
            before={itemState => (
              <ItemAvatar
                itemState={itemState}
                appearance="square"
                size="large"
              />
            )}
            text="My software project"
            subText="Software project"
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={BacklogIcon}
            text="Backlog"
            isSelected
            testKey="container-item-backlog"
          />
          <Item
            before={BoardIcon}
            text="Active sprints"
            testKey="container-item-sprints"
          />
          <Item
            before={GraphLineIcon}
            text="Reports"
            testKey="container-item-reports"
          />
          <Separator />
          <GroupHeading>Shortcuts</GroupHeading>
          <Item before={ShortcutIcon} text="Project space" />
          <Item before={ShortcutIcon} text="Project repo" />
        </div>
      )}
    </MenuSection>
  </div>
);

type State = { shouldDisplayContainerNav: boolean };
export default class Example extends Component<{}, State> {
  state = {
    shouldDisplayContainerNav: true,
  };

  toggleContainerNav = () => {
    this.setState(state => ({
      shouldDisplayContainerNav: !state.shouldDisplayContainerNav,
    }));
  };

  render() {
    const { shouldDisplayContainerNav } = this.state;
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={GlobalNavigation}
          productNavigation={ProductNavigation}
          containerNavigation={
            shouldDisplayContainerNav ? ContainerNavigation : null
          }
        >
          <div
            data-webdriver-test-key="content"
            style={{ padding: `${gridSize * 4}px ${gridSize * 5}px` }}
          >
            <ToggleStateless
              isChecked={shouldDisplayContainerNav}
              onChange={this.toggleContainerNav}
            />{' '}
            Display container navigation layer
          </div>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}
