import { MediaSingleLayout } from '@uidu/adf-schema';
import { MediaSingleProps } from '@uidu/editor-common';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { getPosHandler } from '../../../../nodeviews';
import { EditorAppearance } from '../../../../types';
import { GridType } from '../../../grid/types';

export type EnabledHandles = { left?: boolean; right?: boolean };

export type Props = MediaSingleProps & {
  updateSize: (width: number | null, layout: MediaSingleLayout) => void;
  displayGrid: (
    show: boolean,
    type: GridType,
    highlight?: number[] | string[],
  ) => void;
  getPos: getPosHandler;
  view: EditorView;
  state: EditorState;
  lineLength: number;
  gridSize: number;
  containerWidth: number;
  appearance?: EditorAppearance;
  selected: boolean;
  viewMediaClientConfig?: any;
  fullWidthMode?: boolean;
};
