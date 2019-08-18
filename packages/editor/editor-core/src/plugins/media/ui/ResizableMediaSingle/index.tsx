import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  akEditorBreakoutPadding,
  akEditorWideLayoutWidth,
  calcColumnsFromPx,
  calcPctFromPx,
  calcPxFromColumns,
} from '@uidu/editor-common';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import * as React from 'react';
import { isFullPage } from '../../../../utils/is-full-page';
import { calcMediaPxWidth } from '../../utils/media-single';
import Resizer from './Resizer';
import { Wrapper } from './styled';
import { EnabledHandles, Props } from './types';
import { handleSides, imageAlignmentMap, snapTo } from './utils';

type State = {
  offsetLeft: number;
  isVideoFile: boolean;
};

export default class ResizableMediaSingle extends React.Component<
  Props,
  State
> {
  state = {
    offsetLeft: this.calcOffsetLeft(),

    // We default to true until we resolve the file type
    isVideoFile: true,
  };

  componentDidUpdate() {
    const offsetLeft = this.calcOffsetLeft();
    if (offsetLeft !== this.state.offsetLeft && offsetLeft >= 0) {
      this.setState({ offsetLeft });
    }

    return true;
  }

  get wrappedLayout() {
    const { layout } = this.props;
    return (
      layout === 'wrap-left' ||
      layout === 'wrap-right' ||
      layout === 'align-start' ||
      layout === 'align-end'
    );
  }

  async componentDidMount() {
    const { viewContext } = this.props;
    if (viewContext) {
      this.checkVideoFile(viewContext);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.props.viewContext !== nextProps.viewContext) {
      this.checkVideoFile(nextProps.viewContext);
    }
  }

  async checkVideoFile(viewContext?: any) {
    const $pos = this.$pos;
    if (!$pos || !viewContext) {
      return undefined;
    }
    const getMediaNode = this.props.state.doc.nodeAt($pos.pos + 1);
    const state = await viewContext.file.getCurrentState(
      getMediaNode!.attrs.id,
    );
    if (state && state.status !== 'error' && state.mediaType === 'image') {
      this.setState({
        isVideoFile: false,
      });
    }
  }

  calcNewSize = (newWidth: number, stop: boolean) => {
    const { layout } = this.props;

    const newPct = calcPctFromPx(newWidth, this.props.lineLength) * 100;

    if (newPct <= 100) {
      let newLayout: MediaSingleLayout;
      if (this.wrappedLayout && (stop ? newPct !== 100 : true)) {
        newLayout = layout;
      } else {
        newLayout = 'center';
      }

      return {
        width: newPct,
        layout: newLayout,
      };
    } else {
      // wide or full-width
      const newLayout: MediaSingleLayout =
        newWidth <= akEditorWideLayoutWidth ? 'wide' : 'full-width';

      return {
        width: this.props.pctWidth || null,
        layout: newLayout,
      };
    }
  };

  get $pos() {
    const pos = this.props.getPos();
    if (Number.isNaN(pos as any) || typeof pos !== 'number') {
      return null;
    }

    // need to pass view because we may not get updated props in time
    return this.props.view.state.doc.resolve(pos);
  }

  /**
   * The maxmimum number of grid columns this node can resize to.
   */
  get gridWidth() {
    const { gridSize } = this.props;
    return !(this.wrappedLayout || this.insideInlineLike)
      ? gridSize / 2
      : gridSize;
  }

  calcOffsetLeft() {
    let offsetLeft = 0;
    if (this.wrapper && this.insideInlineLike) {
      const currentNode: HTMLElement = this.wrapper;
      const boundingRect = currentNode.getBoundingClientRect();
      const pmRect = this.props.view.dom.getBoundingClientRect();
      offsetLeft = boundingRect.left - pmRect.left;
    }
    return offsetLeft;
  }

  calcColumnLeftOffset = () => {
    const { offsetLeft } = this.state;
    return this.insideInlineLike
      ? calcColumnsFromPx(
          offsetLeft,
          this.props.lineLength,
          this.props.gridSize,
        )
      : 0;
  };

  wrapper?: HTMLElement;
  calcSnapPoints() {
    const { offsetLeft } = this.state;

    const { containerWidth, lineLength, appearance } = this.props;
    const snapTargets: number[] = [];
    for (let i = 0; i < this.gridWidth; i++) {
      snapTargets.push(
        calcPxFromColumns(i, lineLength, this.gridWidth) - offsetLeft,
      );
    }
    // full width
    snapTargets.push(lineLength - offsetLeft);

    const minimumWidth = calcPxFromColumns(
      this.wrappedLayout || this.insideInlineLike ? 1 : 2,
      lineLength,
      this.props.gridSize,
    );

    let snapPoints = snapTargets.filter(width => width >= minimumWidth);
    const $pos = this.$pos;
    if (!$pos) {
      return snapPoints;
    }

    const { isVideoFile } = this.state;

    snapPoints = isVideoFile
      ? snapPoints.filter(width => width > 320)
      : snapPoints;

    const isTopLevel = $pos.parent.type.name === 'doc';
    if (isTopLevel && isFullPage(appearance)) {
      snapPoints.push(akEditorWideLayoutWidth);
      const fullWidthPoint = containerWidth - akEditorBreakoutPadding;
      if (fullWidthPoint > akEditorWideLayoutWidth) {
        snapPoints.push(fullWidthPoint);
      }
    }
    return snapPoints;
  }

  calcPxWidth = (): number => {
    const {
      width: origWidth,
      height: origHeight,
      layout,
      pctWidth,
      lineLength,
      containerWidth,
      fullWidthMode,
      getPos,
      state,
    } = this.props;

    return calcMediaPxWidth({
      origWidth,
      origHeight,
      pctWidth,
      state,
      containerWidth: { width: containerWidth, lineLength },
      isFullWidthModeEnabled: fullWidthMode,
      layout,
      pos: getPos(),
    });
  };

  get insideInlineLike(): boolean {
    const $pos = this.$pos;
    if (!$pos) {
      return false;
    }

    const { table, listItem } = this.props.view.state.schema.nodes;
    return !!findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
  }

  highlights = (newWidth: number, snapPoints: number[]) => {
    const snapWidth = snapTo(newWidth, snapPoints);
    const { layoutColumn } = this.props.view.state.schema.nodes;

    if (
      this.$pos &&
      !!findParentNodeOfTypeClosestToPos(this.$pos, [layoutColumn])
    ) {
      return [];
    }

    if (snapWidth > akEditorWideLayoutWidth) {
      return ['full-width'];
    }

    const { layout, lineLength, gridSize } = this.props;
    const columns = calcColumnsFromPx(snapWidth, lineLength, gridSize);
    const columnWidth = Math.round(columns);
    const highlight: number[] = [];

    if (layout === 'wrap-left' || layout === 'align-start') {
      highlight.push(0, columnWidth);
    } else if (layout === 'wrap-right' || layout === 'align-end') {
      highlight.push(gridSize, gridSize - columnWidth);
    } else if (this.insideInlineLike) {
      highlight.push(Math.round(columns + this.calcColumnLeftOffset()));
    } else {
      highlight.push(
        Math.floor((gridSize - columnWidth) / 2),
        Math.ceil((gridSize + columnWidth) / 2),
      );
    }

    return highlight;
  };

  render() {
    const {
      width: origWidth,
      height: origHeight,
      layout,
      pctWidth,
      containerWidth,
      fullWidthMode,
    } = this.props;

    const pxWidth = this.calcPxWidth();

    // scale, keeping aspect ratio
    const height = (origHeight / origWidth) * pxWidth;
    const width = pxWidth;

    const enable: EnabledHandles = {};
    handleSides.forEach(side => {
      const oppositeSide = side === 'left' ? 'right' : 'left';
      enable[side] =
        ['full-width', 'wide', 'center']
          .concat(`wrap-${oppositeSide}` as MediaSingleLayout)
          .concat(
            `align-${imageAlignmentMap[oppositeSide]}` as MediaSingleLayout,
          )
          .indexOf(layout) > -1;

      if (side === 'left' && this.insideInlineLike) {
        enable[side] = false;
      }
    });

    return (
      <Wrapper
        width={width}
        height={height}
        layout={layout}
        isResized={!!pctWidth}
        containerWidth={containerWidth || origWidth}
        innerRef={elem => (this.wrapper = elem)}
        fullWidthMode={fullWidthMode}
      >
        <Resizer
          {...this.props}
          width={width}
          height={height}
          selected={this.props.selected}
          enable={enable}
          calcNewSize={this.calcNewSize}
          snapPoints={this.calcSnapPoints()}
          scaleFactor={!this.wrappedLayout && !this.insideInlineLike ? 2 : 1}
          highlights={this.highlights}
        >
          {this.props.children}
        </Resizer>
      </Wrapper>
    );
  }
}
