// @flow

import type { Node } from 'react';

import type { StyleReducer, ProductTheme } from '../../../theme/types';

export type RenderProvided = {
  className: string,
  css: {},
};

export type SectionPresentationProps = {
  /** Whether to always render the shadow at the top of the section to indicate
   * that the container can be scrolled up. This can be used to create a
   * consistent visual distinction between this section and the one above it.
   * This prop is only applied if shouldGrow = true, since it only applies to
   * sections which can scroll. */
  alwaysShowScrollHint: boolean,
};

export type ConnectedSectionProps = SectionPresentationProps & {
  /** A unique ID for this section. */
  id?: string,
  /** The unique ID of the section which is this section's 'parent' in the
   * context of a nested navigation transition. */
  parentId?: string | null,
  /** A component to render the children of this section. It will be provided
   * with a styles object which should be applied to the outermost element to
   * enable transition animations. */
  children: RenderProvided => Node,
  /** Whether the section should grow the fill the available space within the
   * navigation area. Sections that grow will also scroll internally. */
  shouldGrow: boolean,
  /** A function which will be passed the default styles object for the Section
   * and should return a new styles object. */
  styles: StyleReducer,
};

export type SectionProps = ConnectedSectionProps & { theme: ProductTheme };

export type SectionState = {
  traversalDirection: 'down' | 'up' | null,
};
