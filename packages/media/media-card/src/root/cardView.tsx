import * as React from 'react';
import { MouseEvent } from 'react';
import { MediaItemType, FileDetails, ImageResizeMode } from '@uidu/media-core';
import {
  withAnalyticsEvents,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';

import {
  SharedCardProps,
  CardStatus,
  CardEvent,
  OnSelectChangeFuncResult,
  CardDimensionValue,
  CardOnClickCallback,
} from '../index';
import { FileCard } from '../files';
import { breakpointSize } from '../utils/breakpoint';
import {
  defaultImageCardDimensions,
  getDefaultCardDimensions,
} from '../utils/cardDimensions';
import { isValidPercentageUnit } from '../utils/isValidPercentageUnit';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { getElementDimension } from '../utils/getElementDimension';
import { Wrapper } from './styled';

import { WithCardViewAnalyticsContext } from './withCardViewAnalyticsContext';

export interface CardViewOwnProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: FileDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onRetry?: () => void;
  readonly onClick?: CardOnClickCallback;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;

  // FileCardProps
  readonly dataURI?: string;
  readonly progress?: number;
  readonly disableOverlay?: boolean;
  readonly previewOrientation?: number;
}

export interface CardViewState {
  elementWidth?: number;
}

export type CardViewBaseProps = CardViewOwnProps &
  WithAnalyticsEventProps & {
    readonly mediaItemType: MediaItemType;
  };

/**
 * This is classic vanilla CardView class. To create an instance of class one would need to supply
 * `createAnalyticsEvent` prop to satisfy it's Analytics Events needs.
 */
export class CardViewBase extends React.Component<
  CardViewBaseProps,
  CardViewState
> {
  state: CardViewState = {};

  componentDidMount() {
    this.saveElementWidth();
  }

  componentWillReceiveProps(nextProps: CardViewBaseProps) {
    const { selected: currSelected } = this.props;
    const { selectable: nextSelectable, selected: nextSelected } = nextProps;

    // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
    const cs: boolean = !!currSelected;
    const ns: boolean = !!nextSelected;

    if (nextSelectable && cs !== ns) {
      this.fireOnSelectChangeToConsumer(ns);
    }
  }

  private fireOnSelectChangeToConsumer = (newSelectedState: boolean): void => {
    const { metadata, selectable, onSelectChange } = this.props;

    if (selectable && onSelectChange) {
      onSelectChange({
        selected: newSelectedState,
        mediaItemDetails: metadata,
      });
    }
  };

  // This width is only used to calculate breakpoints, dimensions are passed down as
  // integrator pass it to the root component
  private get width(): CardDimensionValue {
    const { elementWidth } = this.state;
    if (elementWidth) {
      return elementWidth;
    }

    const { width } = this.props.dimensions || { width: undefined };

    if (!width) {
      return defaultImageCardDimensions.width;
    }

    return getCSSUnitValue(width);
  }

  // If the dimensions.width is a percentage, we need to transform it
  // into a pixel value in order to get the right breakpoints applied.
  saveElementWidth() {
    const { dimensions } = this.props;
    if (!dimensions) {
      return;
    }

    const { width } = dimensions;

    if (width && isValidPercentageUnit(width)) {
      const elementWidth = getElementDimension(this, 'width');

      this.setState({ elementWidth });
    }
  }

  render() {
    const { onClick, onMouseEnter } = this;
    const { dimensions, appearance, mediaItemType } = this.props;
    const shouldUsePointerCursor = mediaItemType === 'file';
    const wrapperDimensions = dimensions
      ? dimensions
      : getDefaultCardDimensions(appearance);

    return (
      <Wrapper
        shouldUsePointerCursor={shouldUsePointerCursor}
        breakpointSize={breakpointSize(this.width)}
        appearance={appearance}
        dimensions={wrapperDimensions}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {this.renderFile()}
      </Wrapper>
    );
  }

  private renderFile = () => {
    const {
      status,
      metadata,
      dataURI,
      progress,
      onRetry,
      resizeMode,
      appearance,
      dimensions,
      actions,
      selectable,
      selected,
      disableOverlay,
      mediaItemType,
      previewOrientation,
    } = this.props;

    return (
      <FileCard
        status={status}
        details={metadata}
        dataURI={dataURI}
        progress={progress}
        onRetry={onRetry}
        resizeMode={resizeMode}
        appearance={appearance}
        dimensions={dimensions}
        actions={actions}
        selectable={selectable}
        selected={selected}
        disableOverlay={disableOverlay}
        mediaItemType={mediaItemType}
        previewOrientation={previewOrientation}
      />
    );
  };

  private onClick = (event: MouseEvent<HTMLDivElement>) => {
    const { onClick, metadata: mediaItemDetails } = this.props;
    if (onClick) {
      onClick({ event, mediaItemDetails });
    }
  };

  private onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const { onMouseEnter, metadata: mediaItemDetails } = this.props;
    if (onMouseEnter) {
      onMouseEnter({ event, mediaItemDetails });
    }
  };
}

const createAndFireEventOnMedia = createAndFireEvent('media');
/**
 * With this CardView class constructor version `createAnalyticsEvent` props is supplied for you, so
 * when creating instance of that class you don't need to worry about it.
 */
export const CardViewWithAnalyticsEvents = withAnalyticsEvents({
  onClick: createAndFireEventOnMedia({ action: 'clicked' }),
})(CardViewBase);

/**
 * This if final version of CardView that is exported to the consumer. This version wraps everything
 * with Analytics Context information so that all the Analytics Events created anywhere inside CardView
 * will have it automatically.
 */
export class CardView extends React.Component<CardViewOwnProps, CardViewState> {
  static defaultProps: Partial<CardViewOwnProps> = {
    appearance: 'auto',
  };

  private get mediaItemType(): MediaItemType {
    return 'file';
  }

  render() {
    const mediaItemType = this.mediaItemType;

    return (
      <WithCardViewAnalyticsContext
        {...this.props}
        mediaItemType={mediaItemType}
      >
        <CardViewWithAnalyticsEvents
          {...this.props}
          mediaItemType={mediaItemType}
        />
      </WithCardViewAnalyticsContext>
    );
  }
}
