import { CSSObject } from '@emotion/react';
import { ComponentType, ReactNode, Ref } from 'react';

export interface RenderFunction<TProps = {}> {
  (Component: ComponentType | string, props: TProps): React.ReactNode;
}

export interface TitleOverrides {
  render?: RenderFunction<{
    className?: string;
    children: ReactNode;
    'data-item-title': boolean;
  }>;
}

export interface Overrides {
  Title?: TitleOverrides;
}

export interface MenuGroupSizing {
  /**
   * Useful to constrain the menu group minimum height to a specific value.
   */
  minHeight?: number | string;

  /**
   * Useful to constrain the menu groups height to a specific value.
   * Needs to be set when wanting to have scrollable sections.
   */
  maxHeight?: number | string;

  /**
   * Useful to constrain the menu group minimum width to a specific value.
   */
  minWidth?: number | string;

  /**
   * Useful to constrain the menu group width to a specific value.
   */
  maxWidth?: number | string;
}

export interface MenuGroupProps extends MenuGroupSizing {
  /**
   * Children of the menu group,
   * should generally be `Section` components.
   */
  children: React.ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  /**
   * Handler called when clicking on this element,
   * or any children elements.
   * Useful when needing to stop propagation of child events.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

export interface SectionBaseProps {
  /**
   * Enables scrolling within the section.
   * Make sure to set `maxHeight` on the parent `MenuGroup` component else it will not work.
   */
  isScrollable?: boolean;

  /**
   * Will render a border at the top of the section.
   */
  hasSeparator?: boolean;

  /**
   * Children of the section,
   * should generally be `Item` or `Heading` components,
   * but can also be [`EmptyState`](https://uidu.design/packages/design-system/empty-state)s when wanting to render errors.
   */
  children: React.ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
}

export interface SectionProps extends SectionBaseProps {
  overrides?: {
    HeadingItem?: {
      /**
       * A function that can be used to override the styles of the component.
       * It receives the current styles and state and expects a styles object.
       */
      cssFn?: StatelessCSSFn;
    };
  };

  /**
   * The text passed into the internal HeadingItem. If a title is not provided,
   * the HeadingItem will not be rendered, and this component acts as a regular Section
   */
  title?: string;
}

export interface BaseItemProps {
  /**
   * A function that can be used to override the styles of the component.
   * It receives the current styles and state and expects a styles object.
   */
  cssFn?: CSSFn;

  /**
   * Element to render before the item text.
   * Generally should be an [icon](https://uidu.design/packages/design-system/icon) component.
   */
  iconBefore?: React.ReactNode;

  /**
   * Element to render after the item text.
   * Generally should be an [icon](https://uidu.design/packages/design-system/icon) component.
   */
  iconAfter?: React.ReactNode;

  /**
   * Event that is triggered when the element is clicked.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;

  /**
   * Event that is triggered when the element has been pressed.
   */
  onMouseDown?: React.MouseEventHandler;

  /**
   * Description of the item.
   * This will render smaller text below the primary text of the item as well as slightly increasing the height of the item.
   */
  description?: string | JSX.Element;

  /**
   * Makes the element appear disabled as well as removing interactivity.
   */
  isDisabled?: boolean;

  /**
   * Makes the element appear selected.
   */
  isSelected?: boolean;

  /**
   * Primary content for the item.
   */
  children?: React.ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  /**
   * Custom overrides for the composed components.
   */
  overrides?: Overrides;
}

export interface ButtonItemProps extends BaseItemProps {}

export interface LinkItemProps extends BaseItemProps {
  /**
   * Link to another page.
   */
  href?: string;

  /**
   * Where to display the linked URL,
   * see [anchor information](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) on mdn for more information.
   */
  target?: string;

  /**
   * The relationship of the linked URL as space-separated link types.
   * Generally you'll want to set this to "noopener noreferrer" when `target` is "_blank".
   */
  rel?: string;
}

export interface CustomItemComponentProps {
  /**
   * The children of the item.
   */
  children: React.ReactNode;

  /**
   * Class to apply to the root container of the custom component,
   * ensure this has been applied so the consistent item styling is applied.
   */
  className: string;

  /**
   * Test id that is passed through to the custom component.
   */
  'data-testid'?: string;

  /**
   * Event handler that is passed through to the custom component.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Event handler that is passed through to the custom component.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Event handler that is passed through to the custom component.
   * Used to disable the element from being draggable.
   */
  onDragStart?: (event: React.DragEvent) => void;

  /**
   * Turns off the element being draggable.
   */
  draggable: boolean;

  /**
   * React ref for the raw DOM element,
   * make sure to place this on the outer most DOM element.
   */
  ref?: Ref<any>;

  /**
   * Makes the element appear disabled as well as removing interactivity.
   */
  tabIndex: number | undefined;

  /**
   * Disabled attribute.
   */
  disabled?: boolean;

  /**
   * Selected attribute.
   * This is used to make the element appear selected.
   */
  isSelected?: boolean;
  /**
   * Disabled attribute.
   */
  isDisabled?: boolean;
}

export interface CustomItemProps<
  TCustomComponentProps = CustomItemComponentProps,
> extends BaseItemProps {
  /**
   * Custom component to render as an item.
   * This can be both a functional component or a class component.
   * **Will return `null` if no component is defined.**
   * If using TypeScript and this has typed props it will make its props available to the root custom item component for type safety.

   * **NOTE:** Make sure the reference for this component does not change between renders else undefined behavior may happen.
   */
  component?: React.ComponentType<TCustomComponentProps>;
}

export interface SkeletonItemProps {
  /**
   * Renders a skeleton circle in the `iconBefore` location.
   * Takes priority over `hasIcon.
   */
  hasAvatar?: boolean;

  /**
   * Renders a skeleton square in the `iconBefore` location.
   */
  hasIcon?: boolean;

  /**
   * Width of the skeleton item.
   * Generally you don't need to specify this as it has a staggered width based on `:nth-child` by default.
   */
  width?: string | number;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  /**
   * Causes to the skeleton to have a slight horizontal shimmer.
   * Only use this when you want to bring more attention to the loading content.
   */
  isShimmering?: boolean;

  /**
   * A function that can be used to override the styles of this component.
   * It receives the current styles and returns a customized styles object.
   */
  cssFn?: StatelessCSSFn;
}

export type Width = string | number;

export interface HeadingItemProps {
  /**
   * The text of the heading.
   */
  children: React.ReactNode;

  /**
   * A unique identifier that can be referenced in the `labelledby` prop of a
   * section to allow screen readers to announce the name of groups.
   */
  id?: string;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
}

export interface SkeletonHeadingItemProps {
  /**
   * Width of the skeleton heading item.
   * Generally you don't need to specify this as it has a staggered width based on `:nth-child` by default.
   */
  width?: Width;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  /**
   * Causes to the skeleton to have a slight horizontal shimmer.
   * Only use this when you want to bring more attention to the loading content.
   */
  isShimmering?: boolean;

  /**
   * A function that can be used to override the styles of this component.
   * It receives the current styles and returns a customized styles object.
   */
  cssFn?: StatelessCSSFn;
}

export type ItemState = { isSelected: boolean; isDisabled: boolean };

/**
 * A function that can be used to override the styles of
 * menu components. It receives the current styles and state
 * and expects a styles object.
 */
export interface CSSFn<TState = ItemState> {
  (currentStyles: CSSObject, currentState: TState): CSSObject;
}

export type StatelessCSSFn = CSSFn<undefined>;
