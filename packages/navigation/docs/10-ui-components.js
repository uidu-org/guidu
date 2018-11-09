// @flow

import React from 'react';
import { Example, md, Props, Prop } from '@atlaskit/docs';

import { Contents, ContentsProvider, H, Hr } from './shared';

export default (
  <ContentsProvider>
    {md`
${<Contents />}

${<Hr />}

${<H>BackItem</H>}

BackItem is a pre-configured version of [ConnectedItem](#connecteditem) that is used to navigate back to a parent view.
Its text prop defaults to 'Back' and its before prop defaults to an ArrowLeftCircle icon. See [ConnectedItem](#connecteditem) for props.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/BackItem').default}
        title="BackItem"
        source={require('!!raw-loader!./examples/ui-components/BackItem')}
      />
    )}

${(
      <Props
        heading="BackItem props"
        props={require('!!extract-react-types-loader!../src/components/connected/BackItem')}
      />
    )}

${<Hr />}

${<H>ConnectedItem</H>}

ConnectedItem is an Item that will render a [GoToItem](#gotoitem) if goTo prop is provided, otherwise it will render an [Item](#item).

${(
      <Props
        heading="ConnectedItem props"
        props={require('!!extract-react-types-loader!../src/components/connected/ConnectedItem')}
      />
    )}

${<Hr />}

${<H>ContainerHeader</H>}

The ContainerHeader is intended to be used in the container navigation layer for a project, space, etc. It is essentially an Item with some custom styles applied to it and has an almost identical props interface. The only difference is that the ContainerHeader does not accept a spacing prop.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/ContainerHeader').default}
        title="ContainerHeader"
        source={require('!!raw-loader!./examples/ui-components/ContainerHeader')}
      />
    )}

## ContainerHeader props

See [Item](#item).

${<Hr />}

${<H>GlobalItem</H>}

GlobalItems are rendered inside the global navigation layer.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/GlobalItem').default}
        title="GlobalItem"
        source={require('!!raw-loader!./examples/ui-components/GlobalItem')}
      />
    )}

${(
      <Props
        heading="GlobalItem props"
        props={require('!!extract-react-types-loader!../src/components/presentational/GlobalItem')}
      />
    )}

${<Hr />}

${<H>GlobalNav</H>}

If you're building an Atlassian product you probably don't want to use this component directly. Please take a look at the [@atlaskit/global-navigation component](/packages/core/global-navigation) instead.

The GlobalNav component is a primitive layout component which renders GlobalItems into one of two slots.

${(
      <Props
        heading="GlobalNav props"
        props={require('!!extract-react-types-loader!../src/components/presentational/GlobalNav')}
      />
    )}

${<Hr />}

${<H>GoToItem</H>}

GoToItem is a special [Item](#item) that when clicked will cause a transition to the view specified by the 'goTo' prop. You will need to ensure that both the view you're
transitioning from and to use the same [MenuSection](#menusection) component instance with the correct 'id' and parentId' props so that the transition animation works correctly.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/GoToItem').default}
        title="GoToItem"
        source={require('!!raw-loader!./examples/ui-components/GoToItem')}
      />
    )}

${(
      <Props
        heading="GoToItem props"
        props={require('!!extract-react-types-loader!../src/components/connected/GoToItem')}
      />
    )}

${<Hr />}

${<H>Group</H>}

A useful component for rendering a group of Items with a heading and a separator. The heading and separator will only be rendered if the Group has children.

A section of the product or container navigation may contain multiple groups.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/Group').default}
        title="Group"
        source={require('!!raw-loader!./examples/ui-components/Group')}
      />
    )}

${(
      <Props
        heading="Group props"
        props={require('!!extract-react-types-loader!../src/components/presentational/Group')}
      />
    )}

${<Hr />}

${<H>GroupHeading</H>}

The heading for a group of items.

${(
      <Props
        heading="GroupHeading props"
        props={require('!!extract-react-types-loader!../src/components/presentational/GroupHeading')}
      />
    )}

${<Hr />}

${<H>HeaderSection</H>}

A section for the header of your nav view. Applies some minor styling to the standard section component.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/HeaderSection').default}
        title="Header Section"
        source={require('!!raw-loader!./examples/ui-components/HeaderSection')}
      />
    )}

${(
      <Props
        heading="HeaderSection props"
        props={require('!!extract-react-types-loader!../src/components/presentational/HeaderSection')}
      />
    )}

${<Hr />}

${<H>Item</H>}

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/Item').default}
        title="Item"
        source={require('!!raw-loader!./examples/ui-components/Item')}
      />
    )}

${(
      <Props
        heading="Item props"
        props={require('!!extract-react-types-loader!../src/components/presentational/Item')}
      />
    )}

${<Hr />}

${<H>ItemAvatar</H>}

The ItemAvatar is a useful wrapper around Atlaskit's Avatar component, which will update its background color based on the state of the Item that it's in. It's intended to be used inside the before or after props of an Item, and you need to pass through the provided item state.

${(
      <Props
        heading="ItemAvatar props"
        props={require('!!extract-react-types-loader!../src/components/presentational/ItemAvatar')}
      />
    )}

${<Hr />}

${<H>LayoutManager</H>}

The LayoutManager is the entrypoint to navigation. It is in charge of laying out the global, product, and container layers of navigation, along with your page content. Read the [Getting Started guide](/packages/core/navigation-next/docs/composing-your-navigation) for for information.

${(
      <Props
        heading="LayoutManager props"
        props={require('!!extract-react-types-loader!../src/components/presentational/LayoutManager')}
      />
    )}

${<Hr />}

${<H>MenuSection</H>}

A section for the main part of your nav view that enables animation into and out of nested views. Applies some minor styling to the standard section component and allows
scrolling of content when there are too many items to display. If using directly, take care to ensure you share the same MenuSection component across
views as animation relies on the component remaining mounted for view transitions.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/MenuSection').default}
        title="Menu Section"
        source={require('!!raw-loader!./examples/ui-components/MenuSection')}
      />
    )}

${(
      <Props
        heading="MenuSection props"
        props={require('!!extract-react-types-loader!../src/components/presentational/MenuSection')}
      />
    )}

${<Hr />}

${<H>Section</H>}

The product or container navigation layers can be separated into Sections - a navigation is essentially a flat array of Sections. Within a Section, use Groups for further levels of division.

Use Sections to perform nesting transitions. If a Section's props update and its parentId matches its previous id, or vice versa, it will automatically perform a nested navigation animation as it re-renders.

In the majority of cases, you won't need to use Section directly and can use the specific [HeaderSection](#headersection) and [MenuSection](#menusection) components which provide some extra styling
specific to headers and nested menu sections.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('../examples/30-section').default}
        title="Section"
        source={require('!!raw-loader!../examples/30-section')}
      />
    )}

${(
      <Props
        heading="Section props"
        props={require('!!extract-react-types-loader!../src/components/presentational/Section')}
      />
    )}

${<Hr />}

${<H>SortableContext</H>}

Adds the ability to drag-and-drop items within a section. You must compose [SortableGroup](#sortablegroup) and [SortableItem](#sortableitem) components to achieve drag-and-drop behaviour.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('../examples/60-sortable-items').default}
        title="Sortable items"
        source={require('!!raw-loader!../examples/60-sortable-items')}
      />
    )}

${(
      <Props
        heading="SortableContext props"
        props={require('!!extract-react-types-loader!../src/components/connected/SortableContext')}
      />
    )}

${<Hr />}

${<H>SortableItem</H>}

Sortable items are draggable versions of [Items](#item) and should be used within a [SortableGroup](#sortablegroup) that is inside a [SortableContext](#sortablecontext).
Takes the same props as [Item](#item) as well as some additional props documented below.

${(
      <Props
        heading="SortableItem props"
        props={require('!!extract-react-types-loader!../src/components/connected/SortableItem')}
      />
    )}

${<Hr />}

${<H>SortableGroup</H>}

Sortable groups are used to represent droppable areas within [SortableContext](#sortablecontext). The items within this group must be [SortableItems](#sortableitem) to achieve drag-and-drop behaviour.
Takes the same props as [Group](#group) as well as some additional props documented below.

${(
      <Props
        heading="SortableGroup props"
        props={require('!!extract-react-types-loader!../src/components/connected/SortableGroup')}
      />
    )}

${<Hr />}

${<H>SectionHeading</H>}

The SectionHeading is meant to be used at the top of a nested menu section. There should only be one of these used per view, as opposed to GroupHeadings.

${(
      <Props
        heading="SectionHeading props"
        props={require('!!extract-react-types-loader!../src/components/presentational/SectionHeading')}
      />
    )}

${<Hr />}

${<H>Separator</H>}

Separates a group of items. This component takes no props.

${<Hr />}

${<H>SkeletonContainerView</H>}

Renders a skeleton view. The \`LayoutManagerWithViewController\` will automatically render a skeleton when there is no active view data to display, so you should only need to use this component directly if you're using custom view rendering logic.

This component takes no props.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={
          require('./examples/ui-components/SkeletonContainerView').default
        }
        title="SkeletonContainerView"
        source={require('!!raw-loader!./examples/ui-components/SkeletonContainerView')}
      />
    )}

${<Hr />}

${<H>Switcher</H>}

The Switcher component should be used within container navigation for switching projects or boards.

It's recommended that the value be derived from the URL for accessibility, and to make updates via browser's history API \`onChange\`.

${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={require('./examples/ui-components/Switcher').default}
        title="Switcher"
        source={require('!!raw-loader!./examples/ui-components/Switcher')}
      />
    )}

${(
      <Props
        heading="Switcher props"
        props={require('!!extract-react-types-loader!../src/components/presentational/Switcher')}
        overrides={{
          // NOTE remove horrible (aesthetically) default value from docs
          // it's not really relevant to the consumer.
          // eslint-disable-next-line react/prop-types
          components: ({ defaultValue, ...props }) => <Prop {...props} />,
        }}
      />
    )}

${<H>Changing Switcher styles</H>}

The switcher component takes a styles prop which can be used to override the default styles.

In case you want to override just a subset of the default styles, make sure to spread the **provided** argument on your styles Object.


${(
      <Example
        packageName="@atlaskit/navigation-next"
        Component={
          require('./examples/ui-components/SwitcherCustomStyles').default
        }
        title="Switcher"
        source={require('!!raw-loader!./examples/ui-components/SwitcherCustomStyles')}
      />
    )}

${<Hr />}

${<H>Wordmark</H>}

Renders the provided icon or logo wordmark component with relevant padding.

${(
      <Props
        heading="Wordmark props"
        props={require('!!extract-react-types-loader!../src/components/presentational/Wordmark')}
      />
    )}

`}
  </ContentsProvider>
);
