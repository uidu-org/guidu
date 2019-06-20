import { Decoration, DecorationSet } from 'prosemirror-view';
import { TableDecorations } from '../types';

export const findControlsHoverDecoration = (
  decorationSet: DecorationSet,
): Decoration[] =>
  decorationSet.find(
    undefined,
    undefined,
    spec => spec.key === TableDecorations.CONTROLS_HOVER,
  );
