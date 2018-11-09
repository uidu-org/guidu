// @flow

import type { Node } from 'react';
import type { RenderProvided } from '../Section/types';

// TODO: Fix extract-react-types to handle TupleTypeAnnotation so we can use this type instead
// export type HeaderSectionProps = Pick<SectionProps, ['id', 'children']>;

// TODO: Deprecate/remove parentId from HeaderSection
export type HeaderSectionProps = {
  /** A unique ID for this section. */
  id?: string,
  /** The unique ID of the section which is this section's 'parent' in the
   * context of a nested navigation transition. This should not be necessary
   * as HeaderSections are typically not supposed to transition. */
  parentId?: string | null,
  /** A component to render the children of this section. It will be provided
   * with a styles object which should be applied to the outermost element to
   * enable transition animations. */
  children: RenderProvided => Node,
};
