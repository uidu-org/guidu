// based on schema type we render different components
import { gridSize } from '@uidu/theme';
import React, { PureComponent } from 'react';
import NavigationGroup from './Navigation/NavigationGroup';
import NavigationHeader from './Navigation/NavigationHeader';
import NavigationHeaderSkeletonComponent from './Navigation/NavigationHeaderSkeleton';
import NavigationIconItem from './Navigation/NavigationIconItem';
import NavigationItem from './Navigation/NavigationItem';
import NavigationItemSkeleton from './Navigation/NavigationItemSkeleton';
import PrimaryActions from './Navigation/PrimaryActions';
import SecondaryActions from './Navigation/SecondaryActions';

/**
 * ITEMS
 */

// Header
const NavigationHeaderSkeleton = ({ text, after, before }) => (
  <NavigationHeaderSkeletonComponent
    text={text}
    after={after}
    before={before}
  />
);

// Section
const PrimarySection = ({ items, ...props }) => (
  <PrimaryActions {...props}>
    <ItemsRenderer items={items} />
    {/* <div
      style={{
        width: '100%',
        position: 'relative',
        flexShrink: 1,
        minWidth: '1px',
        margin: '0px',
      }}
    >
      <object
        type="text/html"
        aria-hidden="true"
        tabIndex={-1}
        // style="display: block; position: absolute; top: 0px; left: 0px; height: 0px; width: 100%; opacity: 0; overflow: hidden; pointer-events: none; z-index: -1;"
        data="about:blank"
      ></object>
    </div> */}
  </PrimaryActions>
);

const SecondarySection = ({ items, ...props }) => (
  <SecondaryActions>
    <ItemsRenderer items={items} />
  </SecondaryActions>
);

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
  NavigationHeaderSkeleton,
  NavigationItemSkeleton,
  // Item: ConnectedItem,
  // SortableItem,
  // SectionHeading,
  // Separator,
  // Switcher,
  // Wordmark,
};

const renderItemComponent = (props: any, key: string, index: number) => {
  let element = null;
  if (props.type === 'NavigationItem') {
    const { type, ...compProps } = props;
    element = <NavigationItem key={key} {...compProps} index={index} />;
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

  return element;
};

const groupComponents = {
  NavigationGroup,
  PrimarySection,
  SecondarySection,
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
  } else if (props.type === 'PrimarySection') {
    const { type, ...compProps } = props;
    element = <PrimarySection key={key} {...compProps} />;
  } else if (props.type === 'SecondarySection') {
    const { type, ...compProps } = props;
    element = <SecondarySection key={key} {...compProps} />;
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
      console.log(props);
      return <Debug key={key} type={props.type} {...props} />;
    });
  }
}
