// @flow
import type { ComponentType, Node } from 'react';

export type TabData = { label: string, content: Node, [string]: any };

type TabItemElementProps = {
  'aria-posinset'?: number,
  'aria-selected'?: boolean,
  'aria-setsize'?: number,
  onClick?: () => void,
  onKeyDown?: (e: KeyboardEvent) => void,
  onMouseDown?: (e: MouseEvent) => void,
  role?: string,
  tabIndex?: number | string,
};

type TabItemInnerRef = (ref: HTMLElement) => void;

export type TabItemComponentProvided = {
  /** The complete tab object which you provided to Tabs in the tabs array. */
  data: TabData,
  /** Accessibility props and interaction callbacks which should be spread onto
   * your component. */
  elementProps: TabItemElementProps,
  /** A ref callback which you'll need to attach to your underlying DOM node. */
  innerRef: TabItemInnerRef,
  /** Whether this tab is currently selected. */
  isSelected: boolean,
};

export type TabContentComponentProvided = {
  /** The complete tab object which you provided to Tabs in the tabs array. */
  data: TabData,
  /** Accessibility props which should be spread onto your component. */
  elementProps: {
    role?: string,
  },
};

export type TabItemType = ComponentType<TabItemComponentProvided>;
export type TabContentType = ComponentType<TabContentComponentProvided>;

export type selectedProp = any;
export type IsSelectedTestFunction = (
  selected: selectedProp,
  tab: TabData,
  tabIndex: number,
) => boolean;
type OnSelectCallback = (selected: TabData, selectedIndex: number) => void;

export type TabsProps = {
  /** Custom components to render instead of the default tab item or content.
   * See Tab Content Provided Props and Tab Item Provided Props below. */
  components: {
    Item?: TabItemType,
    Content?: TabContentType,
  },
  /** The tab that will be selected by default when the component mounts. If not
   * set the first tab will be displayed by default. */
  defaultSelected?: selectedProp,
  /** Override the in-built check to determine whether a tab is selected. This
   * function will be passed some information about the selected tab, the tab to
   * be compared, and the index of the tab to be compared, as parameters in that
   * order. It must return a boolean. */
  isSelectedTest?: IsSelectedTestFunction,
  /** A callback function which will be fired when a new tab is selected. It
   * will be passed the data and the index of the selected tab as parameters. */
  onSelect?: OnSelectCallback,
  /** The selected tab. By default this prop accepts either the tab object or
   * the the tab's index. If used in conjunction with the isSelectedTest prop it
   * can be any arbitrary data. If this prop is set the component behaves as a
   * 'controlled' component, and will not maintain any internal state. It will
   * be up to you to listen to onSelect changes, update your own state, and pass
   * that information down to this prop accordingly. */
  selected?: selectedProp,
  /** An array of objects containing data for your tabs. By default a tab object
   * must include 'label' and 'content' properties, but if used in conjunction
   * with the components prop this object can have any shape you choose. */
  tabs: Array<TabData>,
};

export type TabsState = {
  selected: TabData,
};

export type TabsNavigationProps = {
  component: TabItemType,
  onSelect: OnSelectCallback,
  selected: TabData,
  tabs: Array<TabData>,
};
