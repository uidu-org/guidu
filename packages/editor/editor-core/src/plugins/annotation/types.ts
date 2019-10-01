import { AnnotationType } from '@uidu/adf-schema';
import * as React from 'react';

export type AnnotationInfo = {
  id: string;
  type: AnnotationType;
};

export type AnnotationComponentProps = {
  /**
   * Existing annotations where the cursor is placed.
   * These are provided in order, inner-most first.
   */
  annotations: Array<AnnotationInfo>;

  /**
   * Selected text (can be used when creating a comment)
   */
  textSelection?: string;

  /**
   * DOM element around selected text (for positioning)
   */
  dom?: HTMLElement;

  /**
   * Deletes an annotation with the given ID around the selection.
   */
  onDelete: (id: string) => void;
};

export interface AnnotationProvider {
  component?: React.ComponentType<AnnotationComponentProps>;
}
