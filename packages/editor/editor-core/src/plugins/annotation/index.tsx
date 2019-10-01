import { annotation } from '@uidu/adf-schema';
import { ResolvedPos } from 'prosemirror-model';
import { findDomRefAtPos } from 'prosemirror-utils';
import * as React from 'react';
import { stateKey as reactPluginKey } from '../../plugins/base/pm-plugins/react-nodeview';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { sum } from '../../utils';
import { removeInlineCommentNearSelection } from './commands';
import {
  AnnotationComponentProps,
  AnnotationInfo,
  AnnotationProvider,
} from './types';
import { filterAnnotationIds, surroundingMarks } from './utils';

/**
 * Re-orders the annotation array based on the order in the document.
 *
 * This places the marks that do not appear in the surrounding nodes
 * higher in the list. That is, the inner-most one appears first.
 *
 * Undo, for example, can re-order annotation marks in the document.
 * @param annotations annotation metadata
 * @param $from location to look around (usually the selection)
 */
const reorderAnnotations = (
  annotations: Array<AnnotationInfo>,
  $from: ResolvedPos,
) => {
  const idSet = surroundingMarks($from).map(filterAnnotationIds);

  annotations.sort(
    (a, b) =>
      sum(idSet, ids => ids.indexOf(a.id)) -
      sum(idSet, ids => ids.indexOf(b.id)),
  );
};

const annotationPlugin = (
  annotationProvider?: AnnotationProvider,
): EditorPlugin => ({
  name: 'annotation',

  marks() {
    return [
      {
        name: 'annotation',
        mark: annotation,
      },
    ];
  },

  contentComponent({ editorView }) {
    const { annotation: annotationMarkType } = editorView.state.schema.marks;
    if (!annotationProvider) {
      return null;
    }

    const Component = annotationProvider.component;
    if (!Component) {
      return null;
    }

    return (
      <WithPluginState
        plugins={{
          selectionState: reactPluginKey,
        }}
        render={() => {
          const { state } = editorView;
          const { from, $from } = state.selection;
          const node = state.doc.nodeAt(from);
          if (!node) {
            return null;
          }

          const annotationsMarks = node.marks.filter(
            mark => mark.type === annotationMarkType,
          );
          if (!annotationsMarks.length) {
            return null;
          }

          const annotations = annotationsMarks.map(mark => ({
            id: mark.attrs.id,
            type: mark.attrs.annotationType,
          }));

          // re-order to handle nested annotations
          reorderAnnotations(annotations, $from);

          const dom = findDomRefAtPos(
            from,
            editorView.domAtPos.bind(editorView),
          ) as HTMLElement;

          return (
            <Component
              annotations={annotations}
              dom={dom}
              onDelete={(id: string) =>
                removeInlineCommentNearSelection(id)(
                  editorView.state,
                  editorView.dispatch,
                )
              }
            />
          );
        }}
      />
    );
  },
});

export default annotationPlugin;
export { AnnotationProvider, AnnotationComponentProps, AnnotationInfo };
