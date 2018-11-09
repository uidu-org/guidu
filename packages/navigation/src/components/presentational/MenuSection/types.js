// @flow

import type { Node } from 'react';
import type { RenderProvided } from '../Section/types';

// TODO: Fix extract-react-types to handle TupleTypeAnnotation so we can use this type instead
// export type MenuSectionProps = Pick<
//   SectionProps,
//   ['id', 'children', 'parentId', 'alwaysShowScrollHint'],
// >;

export type MenuSectionProps = {
  /** A unique ID for this section. */
  id?: string,
  /** A component to render the children of this section. It will be provided
   * with a styles object which should be applied to the outermost element to
   * enable transition animations. */
  children: RenderProvided => Node,
  /** The unique ID of the section which is this section's 'parent' in the
   * context of a nested navigation transition. */
  parentId?: string | null,
  /** Whether to always render the shadow at the top of the section to indicate
   * that the container can be scrolled up. This can be used to create a
   * consistent visual distinction between this section and the one above it.
   * This prop is only applied if shouldGrow = true, since it only applies to
   * sections which can scroll. */
  alwaysShowScrollHint: boolean,
};
