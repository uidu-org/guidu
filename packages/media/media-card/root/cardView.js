import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalyticsEvents, createAndFireEvent, } from '@atlaskit/analytics-next';
import { FileCard } from '../files';
import { breakpointSize } from '../utils/breakpoint';
import { defaultImageCardDimensions, getDefaultCardDimensions, } from '../utils/cardDimensions';
import { isValidPercentageUnit } from '../utils/isValidPercentageUnit';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { getElementDimension } from '../utils/getElementDimension';
import { Wrapper } from './styled';
import { WithCardViewAnalyticsContext } from './withCardViewAnalyticsContext';
/**
 * This is classic vanilla CardView class. To create an instance of class one would need to supply
 * `createAnalyticsEvent` prop to satisfy it's Analytics Events needs.
 */
var CardViewBase = /** @class */ (function (_super) {
    tslib_1.__extends(CardViewBase, _super);
    function CardViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.fireOnSelectChangeToConsumer = function (newSelectedState) {
            var _a = _this.props, metadata = _a.metadata, selectable = _a.selectable, onSelectChange = _a.onSelectChange;
            if (selectable && onSelectChange) {
                onSelectChange({
                    selected: newSelectedState,
                    mediaItemDetails: metadata,
                });
            }
        };
        _this.renderFile = function () {
            var _a = _this.props, status = _a.status, metadata = _a.metadata, dataURI = _a.dataURI, progress = _a.progress, onRetry = _a.onRetry, resizeMode = _a.resizeMode, appearance = _a.appearance, dimensions = _a.dimensions, actions = _a.actions, selectable = _a.selectable, selected = _a.selected, disableOverlay = _a.disableOverlay, mediaItemType = _a.mediaItemType, previewOrientation = _a.previewOrientation;
            return (React.createElement(FileCard, { status: status, details: metadata, dataURI: dataURI, progress: progress, onRetry: onRetry, resizeMode: resizeMode, appearance: appearance, dimensions: dimensions, actions: actions, selectable: selectable, selected: selected, disableOverlay: disableOverlay, mediaItemType: mediaItemType, previewOrientation: previewOrientation }));
        };
        _this.onClick = function (event) {
            var _a = _this.props, onClick = _a.onClick, mediaItemDetails = _a.metadata;
            if (onClick) {
                onClick({ event: event, mediaItemDetails: mediaItemDetails });
            }
        };
        _this.onMouseEnter = function (event) {
            var _a = _this.props, onMouseEnter = _a.onMouseEnter, mediaItemDetails = _a.metadata;
            if (onMouseEnter) {
                onMouseEnter({ event: event, mediaItemDetails: mediaItemDetails });
            }
        };
        return _this;
    }
    CardViewBase.prototype.componentDidMount = function () {
        this.saveElementWidth();
    };
    CardViewBase.prototype.componentWillReceiveProps = function (nextProps) {
        var currSelected = this.props.selected;
        var nextSelectable = nextProps.selectable, nextSelected = nextProps.selected;
        // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
        var cs = !!currSelected;
        var ns = !!nextSelected;
        if (nextSelectable && cs !== ns) {
            this.fireOnSelectChangeToConsumer(ns);
        }
    };
    Object.defineProperty(CardViewBase.prototype, "width", {
        // This width is only used to calculate breakpoints, dimensions are passed down as
        // integrator pass it to the root component
        get: function () {
            var elementWidth = this.state.elementWidth;
            if (elementWidth) {
                return elementWidth;
            }
            var width = (this.props.dimensions || { width: undefined }).width;
            if (!width) {
                return defaultImageCardDimensions.width;
            }
            return getCSSUnitValue(width);
        },
        enumerable: true,
        configurable: true
    });
    // If the dimensions.width is a percentage, we need to transform it
    // into a pixel value in order to get the right breakpoints applied.
    CardViewBase.prototype.saveElementWidth = function () {
        var dimensions = this.props.dimensions;
        if (!dimensions) {
            return;
        }
        var width = dimensions.width;
        if (width && isValidPercentageUnit(width)) {
            var elementWidth = getElementDimension(this, 'width');
            this.setState({ elementWidth: elementWidth });
        }
    };
    CardViewBase.prototype.render = function () {
        var _a = this, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter;
        var _b = this.props, dimensions = _b.dimensions, appearance = _b.appearance, mediaItemType = _b.mediaItemType;
        var shouldUsePointerCursor = mediaItemType === 'file';
        var wrapperDimensions = dimensions
            ? dimensions
            : getDefaultCardDimensions(appearance);
        return (React.createElement(Wrapper, { shouldUsePointerCursor: shouldUsePointerCursor, breakpointSize: breakpointSize(this.width), appearance: appearance, dimensions: wrapperDimensions, onClick: onClick, onMouseEnter: onMouseEnter }, this.renderFile()));
    };
    return CardViewBase;
}(React.Component));
export { CardViewBase };
var createAndFireEventOnMedia = createAndFireEvent('media');
/**
 * With this CardView class constructor version `createAnalyticsEvent` props is supplied for you, so
 * when creating instance of that class you don't need to worry about it.
 */
export var CardViewWithAnalyticsEvents = withAnalyticsEvents({
    onClick: createAndFireEventOnMedia({ action: 'clicked' }),
})(CardViewBase);
/**
 * This if final version of CardView that is exported to the consumer. This version wraps everything
 * with Analytics Context information so that all the Analytics Events created anywhere inside CardView
 * will have it automatically.
 */
var CardView = /** @class */ (function (_super) {
    tslib_1.__extends(CardView, _super);
    function CardView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CardView.prototype, "mediaItemType", {
        get: function () {
            return 'file';
        },
        enumerable: true,
        configurable: true
    });
    CardView.prototype.render = function () {
        var mediaItemType = this.mediaItemType;
        return (React.createElement(WithCardViewAnalyticsContext, tslib_1.__assign({}, this.props, { mediaItemType: mediaItemType }),
            React.createElement(CardViewWithAnalyticsEvents, tslib_1.__assign({}, this.props, { mediaItemType: mediaItemType }))));
    };
    CardView.defaultProps = {
        appearance: 'auto',
    };
    return CardView;
}(React.Component));
export { CardView };
//# sourceMappingURL=cardView.js.map