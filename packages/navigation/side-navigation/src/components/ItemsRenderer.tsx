// based on schema type we render different components
import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import { gridSize } from '@uidu/theme';
import React, { PureComponent } from 'react';
import NavigationGroupComponent from './SideNavigation/NavigationGroup';
import NavigationGroupHeadingComponent from './SideNavigation/NavigationGroup/NavigationGroupHeading';
import NavigationHeaderComponent from './SideNavigation/NavigationHeader';
import NavigationHeaderSkeletonComponent from './SideNavigation/NavigationHeaderSkeleton';
import NavigationIconItem from './SideNavigation/NavigationIconItem';
import NavigationItem from './SideNavigation/NavigationItem';
import NavigationItemSkeleton from './SideNavigation/NavigationItemSkeleton';
import NavigationSubItem from './SideNavigation/NavigationSubItem';

/**
 * ITEMS
 */

// Header
const NavigationHeader = ({ text, after, before }) => (
  <ShellHeader>
    <NavigationHeaderComponent text={text} after={after} before={before} />
  </ShellHeader>
);

const NavigationHeaderSkeleton = ({ text, after, before }) => (
  <ShellHeader>
    <NavigationHeaderSkeletonComponent
      text={text}
      after={after}
      before={before}
    />
  </ShellHeader>
);

// Section
const NavigationSection = ({ items, ...props }) => (
  <ShellBody>
    <ShellMain>
      <ScrollableContainer {...props}>
        <ItemsRenderer items={items} />
      </ScrollableContainer>
    </ShellMain>
  </ShellBody>
);

// Footer
const NavigationFooter = ({ items, ...props }) => (
  <ShellFooter {...props}>
    <ItemsRenderer items={items} />
  </ShellFooter>
);

// Group
const NavigationGroupHeading = ({ text, ...props }) => (
  <NavigationGroupHeadingComponent {...props}>
    {text}
  </NavigationGroupHeadingComponent>
);

const NavigationGroup = ({
  heading,
  separator,
  items,
  before,
  after,
  withPadding,
  withMargin,
  className,
  ...props
}) =>
  items.length ? (
    <NavigationGroupComponent
      heading={heading}
      before={before}
      after={after}
      separator={separator}
      withPadding={withPadding}
      withMargin={withMargin}
      className={className}
    >
      <ItemsRenderer items={items} {...props} />
    </NavigationGroupComponent>
  ) : null;

const Debug = (props: any) => (
  <pre
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fontSize: '10px',
      overflowX: 'auto',
      padding: `${gridSize() / 2}px`,
    }}
  >
    {JSON.stringify(props, null, 2)}
  </pre>
);

const itemComponents = {
  NavigationHeader,
  NavigationIconItem,
  NavigationItem,
  NavigationSubItem,
  NavigationHeaderSkeleton,
  NavigationItemSkeleton,
  NavigationGroupHeading,
  // Item: ConnectedItem,
  // SortableItem,
  // SectionHeading,
  // Separator,
  // Switcher,
  // Wordmark,
};

const renderItemComponent = (props: any, key: string, index: number) => {
  let element = null;
  // We need an explicit conditional against each type for flow type refinement to work
  // if (props.type === 'BackItem') {
  //   const { type, ...compProps } = props;
  //   element = <BackItem key={key} {...compProps} index={index} />;
  // } else if (props.type === 'ContainerHeader') {
  //   const { type, ...compProps } = props;
  //   element = <ContainerHeader key={key} {...compProps} />;
  // } else if (props.type === 'Debug') {
  //   const { type, ...compProps } = props;
  //   element = <Debug key={key} {...compProps} />;
  // } else if (props.type === 'GoToItem') {
  //   const { type, ...compProps } = props;
  //   element = <GoToItem key={key} {...compProps} index={index} />;
  if (props.type === 'NavigationItem') {
    const { type, ...compProps } = props;
    element = <NavigationItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'NavigationSubItem') {
    const { type, ...compProps } = props;
    element = <NavigationSubItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'NavigationIconItem') {
    const { type, ...compProps } = props;
    element = <NavigationIconItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'NavigationHeader') {
    const { type, id, ...compProps } = props;
    element = <NavigationHeader key={key} {...compProps} />;
  } else if (props.type === 'NavigationItemSkeleton') {
    const { type, ...compProps } = props;
    element = <NavigationItemSkeleton key={key} {...compProps} />;
  } else if (props.type === 'NavigationHeaderSkeleton') {
    const { type, ...compProps } = props;
    element = <NavigationHeaderSkeleton key={key} {...compProps} />;
  }
  // } else if (props.type === 'SortableItem') {
  //   const { type, ...compProps } = props;
  //   element = <SortableItem key={key} {...compProps} index={index} />;
  // } else if (props.type === 'SectionHeading') {
  //   const { type, id, ...compProps } = props;
  //   element = <SectionHeading key={key} {...compProps} />;
  // } else if (props.type === 'Separator') {
  //   const { type, id, ...compProps } = props;
  //   element = <Separator key={key} {...compProps} />;
  // } else if (props.type === 'Switcher') {
  //   const { type, ...compProps } = props;
  //   element = <Switcher key={key} {...compProps} />;
  // } else if (props.type === 'Wordmark') {
  //   const { type, id, ...compProps } = props;
  //   element = <Wordmark key={key} {...compProps} />;
  // }

  return element;
};

const groupComponents = {
  NavigationGroup,
  NavigationSection,
  NavigationFooter,
  // HeaderSection,
  // MenuSection,
  // Section,
  // SortableContext,
  // SortableGroup,
};

const renderGroupComponent = (
  props: any,
  key: string,
  customComponents: any,
) => {
  let element = null;
  // We need an explicit conditional against each type for flow type refinement to work
  if (props.type === 'NavigationGroup') {
    const { type, ...compProps } = props;
    element = (
      <NavigationGroup
        key={key}
        {...compProps}
        customComponents={customComponents}
      />
    );
  } else if (props.type === 'NavigationSection') {
    const { type, ...compProps } = props;
    element = <NavigationSection key={key} {...compProps} />;
  } else if (props.type === 'NavigationFooter') {
    const { type, ...compProps } = props;
    element = <NavigationFooter key={key} {...compProps} />;
  }
  // } else if (props.type === 'HeaderSection') {
  //   const { type, ...compProps } = props;
  //   element = (
  //     <HeaderSection
  //       key={key}
  //       {...compProps}
  //       customComponents={customComponents}
  //     />
  //   );
  // } else if (props.type === 'MenuSection') {
  //   const { type, ...compProps } = props;
  //   element = (
  //     <MenuSection
  //       key={key}
  //       {...compProps}
  //       customComponents={customComponents}
  //     />
  //   );
  // } else if (props.type === 'Section') {
  //   const { type, ...compProps } = props;
  //   element = (
  //     <Section key={key} {...compProps} customComponents={customComponents} />
  //   );
  // } else if (props.type === 'SortableContext') {
  //   const { type, ...compProps } = props;
  //   element = (
  //     <SortableContext
  //       key={key}
  //       {...compProps}
  //       customComponents={customComponents}
  //     />
  //   );
  // } else if (props.type === 'SortableGroup') {
  //   const { type, ...compProps } = props;
  //   element = (
  //     <SortableGroup
  //       key={key}
  //       {...compProps}
  //       customComponents={customComponents}
  //     />
  //   );
  // }

  return element;
};

export const components = { ...itemComponents, ...groupComponents };

export default class ItemsRenderer extends PureComponent<any> {
  render() {
    const { customComponents = {}, items } = this.props;
    return items.map((props, index) => {
      const key =
        typeof props.nestedGroupKey === 'string'
          ? props.nestedGroupKey
          : props.id || `navigation-${index}`;

      if (props.type === 'InlineComponent') {
        const { type, component: CustomComponent, ...componentProps } = props;
        // If they've provided a component as the type
        // const CustomComponent = this.getCustomComponent(props.component);
        return (
          <CustomComponent
            key={key}
            {...componentProps}
            index={index}
            // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            components={components}
            customComponents={customComponents}
          />
        );
      }
      if (Object.keys(groupComponents).includes(props.type)) {
        // If they've provided a type which matches one of our in-built group
        // components
        return renderGroupComponent(props, key, customComponents);
        // If they've provided a type which matches one of our in-built item
        // components.
      }
      if (Object.keys(itemComponents).includes(props.type)) {
        return renderItemComponent(props, key, index);
      }
      // if (Object.keys(customComponents).includes(props.type)) {
      //   const { type, ...componentProps } = props;
      //   // If they've provided a type which matches one of their defined custom
      //   // components.
      //   const CustomComponent = this.getCustomComponent(type);
      //   return (
      //     <CustomComponent
      //       key={key}
      //       {...componentProps}
      //       index={index}
      //       // We pass our in-built components through to custom components so
      //       // they can wrap/render them if they want to.
      //       components={components}
      //       customComponents={customComponents}
      //     />
      //   );
      // }

      return <Debug key={key} type={props.type} {...props} />;
    });
  }
}
