import { MediaSingleLayout } from '@uidu/adf-schema';
import {
  akEditorBreakoutPadding,
  akEditorFullPageMaxWidth,
  breakoutWideScaleRatio,
} from '@uidu/editor-common';
import classnames from 'classnames';
import { PluginKey } from 'prosemirror-state';
import React from 'react';
import { withTheme } from 'styled-components';
import { createDispatch, EventDispatcher } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPlugin, WidthPluginState } from '../width/index';
import { GridPluginState, GridType } from './types';

export const stateKey = new PluginKey('gridPlugin');
export const GRID_SIZE = 12;

export type Highlights = Array<'wide' | 'full-width' | number>;

export const createDisplayGrid = (eventDispatcher: EventDispatcher) => {
  const dispatch = createDispatch(eventDispatcher);
  return (show: boolean, type: GridType, highlight: number[] | string[] = []) =>
    dispatch(stateKey, {
      visible: show,
      gridType: type,
      highlight,
    } as GridPluginState);
};

export const gridTypeForLayout = (layout: MediaSingleLayout): GridType =>
  layout === 'wrap-left' || layout === 'wrap-right' ? 'wrapped' : 'full';

type Side = 'left' | 'right';
const sides: Side[] = ['left', 'right'];

const overflowHighlight = (
  highlights: Highlights,
  side: Side,
  start: number,
  size?: number,
) => {
  if (!highlights.length) {
    return false;
  }

  const minHighlight = highlights.reduce((prev, cur) =>
    Math.min(prev as any, cur as any),
  );
  const maxHighlight = highlights.reduce((prev, cur) =>
    Math.max(prev as any, cur as any),
  );

  if (side === 'left') {
    return (
      minHighlight < 0 &&
      minHighlight <= -start &&
      (typeof size === 'number' ? minHighlight >= -(start + size) : true)
    );
  }
  return (
    maxHighlight > GRID_SIZE &&
    maxHighlight >= GRID_SIZE + start &&
    (typeof size === 'number' ? maxHighlight <= GRID_SIZE + size : true)
  );
};

const gutterGridLines = (
  editorMaxWidth: number,
  editorWidth: number,
  highlights: Highlights,
  shouldCalcBreakoutGridLines?: boolean,
): JSX.Element[] => {
  const gridLines: JSX.Element[] = [];
  if (!shouldCalcBreakoutGridLines) {
    return gridLines;
  }

  const wideSpacing =
    (editorMaxWidth * breakoutWideScaleRatio - editorMaxWidth) / 2;
  sides.forEach((side) => {
    gridLines.push(
      <div
        key={side}
        className={classnames(
          'gridLine',
          overflowHighlight(highlights, side, 0, 4) ? 'highlight' : '',
        )}
        style={{ position: 'absolute', [side]: `-${wideSpacing}px` }}
      />,
    );

    gridLines.push(
      <div
        key={`${side}-bk`}
        className={classnames(
          'gridLine',
          highlights.indexOf('full-width') > -1 ? 'highlight' : '',
        )}
        style={{
          position: 'absolute',
          [side]: `-${
            (editorWidth - editorMaxWidth - akEditorBreakoutPadding) / 2
          }px`,
        }}
      />,
    );
  });

  return gridLines;
};

const lineLengthGridLines = (highlights: Highlights) => {
  const gridLines: JSX.Element[] = [];
  const gridSpacing = 100 / GRID_SIZE;

  for (let i = 0; i <= GRID_SIZE; i++) {
    const style = {
      paddingLeft: `${gridSpacing}%`,
    };
    gridLines.push(
      <div
        key={i}
        className={classnames(
          'gridLine',
          highlights.indexOf(i) > -1 ? 'highlight' : '',
        )}
        style={i < GRID_SIZE ? style : undefined}
      />,
    );
  }

  return gridLines;
};

type Props = {
  theme: any;
  shouldCalcBreakoutGridLines?: boolean;
  containerElement: HTMLElement;
  editorWidth: number;

  visible: boolean;
  gridType: GridType;
  highlight: number[];
};

class Grid extends React.Component<Props> {
  render() {
    const {
      highlight,
      shouldCalcBreakoutGridLines,
      theme,
      containerElement,
      editorWidth,
      gridType,
      visible,
    } = this.props;
    console.log('theme', theme.layoutMaxWidth);
    const editorMaxWidth = theme.layoutMaxWidth;

    const gridLines = [
      ...lineLengthGridLines(highlight),
      ...gutterGridLines(
        editorMaxWidth,
        editorWidth,
        highlight,
        shouldCalcBreakoutGridLines,
      ),
    ];

    return (
      <div className="gridParent">
        <div
          className={classnames(
            'gridContainer',
            gridType,
            !visible ? 'hidden' : '',
          )}
          style={{
            height: `${containerElement.scrollHeight}px`,
          }}
        >
          {gridLines}
        </div>
      </div>
    );
  }
}

const ThemedGrid = withTheme(Grid);

interface GridPluginOptions {
  shouldCalcBreakoutGridLines?: boolean;
}

const gridPlugin = (options?: GridPluginOptions): EditorPlugin => ({
  name: 'grid',

  contentComponent: ({ editorView }) => (
    <WithPluginState
      plugins={{
        grid: stateKey,
        widthState: widthPlugin,
      }}
      render={({
        grid,
        widthState = { width: akEditorFullPageMaxWidth },
      }: {
        grid?: GridPluginState;
        widthState?: WidthPluginState;
      }) => {
        if (!grid) {
          return null;
        }

        return (
          <ThemedGrid
            shouldCalcBreakoutGridLines={
              options && options.shouldCalcBreakoutGridLines
            }
            editorWidth={widthState.width}
            containerElement={editorView.dom}
            {...grid}
          />
        );
      }}
    />
  ),
});

export default gridPlugin;
export { GRID_GUTTER } from './styles';
