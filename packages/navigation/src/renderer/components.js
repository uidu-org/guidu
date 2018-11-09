// @flow

import React, { PureComponent, type ComponentType } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import { navigationItemClicked } from '../common/analytics';

import RenderBlocker from '../components/common/RenderBlocker';

import ContainerHeaderComponent from '../components/presentational/ContainerHeader';
import GroupComponent from '../components/presentational/Group';
import GroupHeadingComponent from '../components/presentational/GroupHeading';
import HeaderSectionComponent from '../components/presentational/HeaderSection';
import MenuSectionComponent from '../components/presentational/MenuSection';
import SectionComponent from '../components/presentational/Section';
import SectionHeadingComponent from '../components/presentational/SectionHeading';
import Separator from '../components/presentational/Separator';
import Switcher from '../components/presentational/Switcher';
import Wordmark from '../components/presentational/Wordmark';

import BackItem from '../components/connected/BackItem';
import ConnectedItem from '../components/connected/ConnectedItem';
import GoToItem from '../components/connected/GoToItem';
import SortableContextComponent from '../components/connected/SortableContext';
import SortableGroupComponent from '../components/connected/SortableGroup';
import SortableItem from '../components/connected/SortableItem';

import type {
  GroupProps,
  GroupHeadingProps,
  HeaderSectionProps,
  ItemsRendererProps,
  MenuSectionProps,
  SectionHeadingProps,
  SectionProps,
  SortableContextProps,
  SortableGroupProps,
} from './types';

const gridSize = gridSizeFn();

/**
 * ITEMS
 */

// Title
const GroupHeading = ({ text, ...props }: GroupHeadingProps) => (
  <GroupHeadingComponent {...props}>{text}</GroupHeadingComponent>
);

// SectionHeading
const SectionHeading = ({ text, ...props }: SectionHeadingProps) => (
  <SectionHeadingComponent {...props}>{text}</SectionHeadingComponent>
);

// ContainerHeader
const ContainerHeader = (props: *) => (
  // -2px here to account for the extra space at the top of a MenuSection for
  // the scroll hint.
  <div css={{ paddingBottom: gridSize * 2.5 - 2 }}>
    <ContainerHeaderComponent {...props} />
  </div>
);

const Debug = (props: *) => (
  <pre
    css={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fontSize: '10px',
      overflowX: 'auto',
      padding: `${gridSize / 2}px`,
    }}
  >
    {JSON.stringify(props, null, 2)}
  </pre>
);

/**
 * GROUPS
 */

// Group
const Group = ({
  customComponents,
  hasSeparator,
  heading,
  items,
  id,
}: GroupProps) =>
  items.length ? (
    <GroupComponent heading={heading} hasSeparator={hasSeparator} id={id}>
      <ItemsRenderer items={items} customComponents={customComponents} />
    </GroupComponent>
  ) : null;

const SortableGroup = ({
  customComponents,
  hasSeparator,
  heading,
  items,
  id,
}: SortableGroupProps) =>
  items && items.length ? (
    <SortableGroupComponent
      heading={heading}
      hasSeparator={hasSeparator}
      id={id}
    >
      <RenderBlocker items={items} customComponents={customComponents}>
        <ItemsRenderer items={items} customComponents={customComponents} />
      </RenderBlocker>
    </SortableGroupComponent>
  ) : null;

// Section
const Section = ({
  alwaysShowScrollHint = false,
  customComponents,
  id,
  items,
  nestedGroupKey,
  parentId,
  shouldGrow,
}: SectionProps) =>
  items.length ? (
    <SectionComponent
      alwaysShowScrollHint={alwaysShowScrollHint}
      id={id}
      key={nestedGroupKey}
      parentId={parentId}
      shouldGrow={shouldGrow}
    >
      {({ className }) => (
        <div className={className}>
          <ItemsRenderer items={items} customComponents={customComponents} />
        </div>
      )}
    </SectionComponent>
  ) : null;

const HeaderSection = ({
  customComponents,
  id,
  items,
  nestedGroupKey,
}: HeaderSectionProps) =>
  items.length ? (
    <HeaderSectionComponent id={id} key={nestedGroupKey}>
      {({ className }) => (
        <div className={className}>
          <ItemsRenderer items={items} customComponents={customComponents} />
        </div>
      )}
    </HeaderSectionComponent>
  ) : null;

const MenuSection = ({
  alwaysShowScrollHint,
  customComponents,
  id,
  items,
  nestedGroupKey,
  parentId,
}: MenuSectionProps) => (
  <MenuSectionComponent
    alwaysShowScrollHint={alwaysShowScrollHint}
    id={id}
    key={nestedGroupKey}
    parentId={parentId}
  >
    {({ className }) => (
      <div className={className}>
        <ItemsRenderer items={items} customComponents={customComponents} />
      </div>
    )}
  </MenuSectionComponent>
);

const SortableContext = ({
  customComponents,
  id,
  items,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: SortableContextProps) =>
  items && items.length ? (
    <SortableContextComponent
      id={id}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <ItemsRenderer items={items} customComponents={customComponents} />
    </SortableContextComponent>
  ) : null;

const itemComponents = {
  BackItem,
  ContainerHeader,
  Debug,
  GoToItem,
  GroupHeading,
  Item: ConnectedItem,
  SortableItem,
  SectionHeading,
  Separator,
  Switcher,
  Wordmark,
};

const groupComponents = {
  Group,
  HeaderSection,
  MenuSection,
  Section,
  SortableContext,
  SortableGroup,
};

// Exported for testing purposes only.
export const components = { ...itemComponents, ...groupComponents };

/**
 * RENDERER
 */
class ItemsRenderer extends PureComponent<ItemsRendererProps> {
  customComponentsWithAnalytics: Map<
    string | ComponentType<*>,
    ComponentType<*>,
  > = new Map();

  getCustomComponent = (type: string | ComponentType<*>) => {
    // cache custom components wrapped with analytics
    // to prevent re-mounting of component on re-render
    const { customComponents = {} } = this.props;
    let component = this.customComponentsWithAnalytics.get(type);
    if (!component) {
      component =
        typeof type === 'string'
          ? navigationItemClicked(customComponents[type], type)
          : navigationItemClicked(
              type,
              type.displayName || 'inlineCustomComponent',
            );
      this.customComponentsWithAnalytics.set(type, component);
    }
    return component;
  };

  render() {
    const { customComponents = {}, items } = this.props;

    return items.map(({ type, ...props }, index) => {
      const key =
        typeof props.nestedGroupKey === 'string'
          ? props.nestedGroupKey
          : props.id;

      // If they've provided a component as the type
      if (typeof type === 'function') {
        const CustomComponent = this.getCustomComponent(type);
        return (
          <CustomComponent
            key={key}
            {...props}
            index={index}
            // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            components={components}
            customComponents={customComponents}
          />
        );
      }

      if (typeof type === 'string') {
        // If they've provided a type which matches one of our in-built group
        // components
        if (groupComponents[type]) {
          const G = groupComponents[type];
          return <G key={key} {...props} customComponents={customComponents} />;
        }

        // If they've provided a type which matches one of our in-built item
        // components.
        if (itemComponents[type]) {
          const I = itemComponents[type];
          return <I key={key} {...props} index={index} />;
        }

        // If they've provided a type which matches one of their defined custom
        // components.
        if (customComponents[type]) {
          const CustomComponent = this.getCustomComponent(type);
          return (
            <CustomComponent
              key={key}
              {...props}
              index={index}
              // We pass our in-built components through to custom components so
              // they can wrap/render them if they want to.
              components={components}
              customComponents={customComponents}
            />
          );
        }
      }

      return <Debug key={key} type={type} {...props} />;
    });
  }
}

export default ItemsRenderer;
