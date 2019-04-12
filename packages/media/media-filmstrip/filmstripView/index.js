import * as tslib_1 from "tslib";
/* tslint:disable variable-name */
import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import * as debounce from 'debounce';
import { FilmStripViewWrapper, FilmStripListWrapper, FilmStripList, ArrowLeftWrapper, ArrowRightWrapper, ShadowLeft, ShadowRight, FilmStripListItem, } from './styled';
var DURATION_MIN = 0.5;
var DURATION_MAX = 1.0;
var EXTRA_PADDING = 4;
export var MUTATION_CONFIG = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
};
export var LeftArrow = function (_a) {
    var onClick = _a.onClick;
    return (React.createElement(ShadowLeft, null,
        React.createElement(ArrowLeftWrapper, { className: "arrow", onClick: onClick },
            React.createElement(ArrowLeft, { label: "left" }))));
};
export var RightArrow = function (_a) {
    var onClick = _a.onClick;
    return (React.createElement(ShadowRight, null,
        React.createElement(ArrowRightWrapper, { className: "arrow", onClick: onClick },
            React.createElement(ArrowRight, { label: "right" }))));
};
var FilmstripView = /** @class */ (function (_super) {
    tslib_1.__extends(FilmstripView, _super);
    function FilmstripView(props) {
        var _this = _super.call(this, props) || this;
        _this.previousOffset = 0;
        _this.state = {
            bufferWidth: 0,
            windowWidth: 0,
        };
        _this.handleSizeChange = function () {
            // get the new widths
            var _a = _this, windowElement = _a.windowElement, bufferElement = _a.bufferElement;
            var bufferWidth = 0;
            var windowWidth = 0;
            var childOffsets = [];
            if (windowElement && bufferElement) {
                bufferWidth = bufferElement.getBoundingClientRect().width;
                windowWidth = windowElement.getBoundingClientRect().width;
                // we're calculating `left` based on `width` because `rect.left` can be a negative value after resizing the window (considered scrolled??)
                var children = Array.prototype.slice.call(bufferElement.children, 0);
                var left_1 = 0;
                childOffsets = children.map(function (child, index) {
                    var width = child.getBoundingClientRect().width;
                    var offset = {
                        left: left_1,
                        right: left_1 + width - 1,
                    };
                    left_1 += width;
                    return offset;
                });
            }
            // make sure the state has changed before we update state and notify the integrator
            // (otherwise, since this method() is called in componentDidUpdate() we'll recurse until the stack size is exceeded)
            var _b = _this.state, prevBufferWidth = _b.bufferWidth, prevWindowWidth = _b.windowWidth;
            if (bufferWidth === prevBufferWidth && windowWidth === prevWindowWidth) {
                // NOTE: we're not checking here if childOffsets has changed... if the children change size but
                // result in the exact same size buffer, we're not going to update, resulting in incorrect navigations
                return;
            }
            // store the widths
            _this.setState({
                bufferWidth: bufferWidth,
                windowWidth: windowWidth,
            }, function () {
                _this.childOffsets = childOffsets;
                // notify the integrator
                var onSize = _this.props.onSize;
                if (onSize) {
                    onSize({
                        offset: Math.min(_this.maxOffset, _this.offset),
                        offsets: childOffsets,
                        width: windowWidth,
                        minOffset: _this.minOffset,
                        maxOffset: _this.maxOffset,
                    });
                }
            });
        };
        _this.handleWindowElementChange = function (windowElement) {
            _this.windowElement = windowElement;
            _this.handleSizeChange();
        };
        _this.handleBufferElementChange = function (bufferElement) {
            if (!bufferElement) {
                return;
            }
            _this.bufferElement = bufferElement;
            _this.handleSizeChange();
            _this.initMutationObserver();
        };
        _this.handleMutation = function (mutationList) {
            // there are edge cases where the DOM may change outside of the normal React life-cycle
            // https://product-fabric.atlassian.net/browse/MSW-425
            _this.handleSizeChange();
        };
        _this.handleLeftClick = function (event) {
            // Stop the click event from bubling up and being handled by other components
            // See https://product-fabric.atlassian.net/browse/MSW-165
            event.stopPropagation();
            var onScroll = _this.props.onScroll;
            if (onScroll) {
                var windowWidth = _this.state.windowWidth;
                var newOffset = _this.getClosestForLeft(_this.offset - windowWidth);
                onScroll({
                    direction: 'left',
                    offset: newOffset,
                    animate: true,
                });
            }
        };
        _this.handleRightClick = function (event) {
            // Stop the click event from bubling up and being handled by other components
            // See https://product-fabric.atlassian.net/browse/MSW-165
            event.stopPropagation();
            var onScroll = _this.props.onScroll;
            if (onScroll) {
                var windowWidth = _this.state.windowWidth;
                var newOffset = _this.getClosestForRight(_this.offset + windowWidth);
                onScroll({
                    direction: 'right',
                    offset: newOffset,
                    animate: true,
                });
            }
        };
        _this.handleScroll = function (event) {
            var isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
            if (!isHorizontalScroll) {
                return;
            }
            // don't actually let the element scroll because we'll fake scrolling with `transform: translateX()`
            event.preventDefault();
            // notify the integrator of the offset change
            var onScroll = _this.props.onScroll;
            if (onScroll && isHorizontalScroll) {
                var newOffset = Math.max(_this.minOffset, Math.min(_this.maxOffset, _this.offset + event.deltaX));
                onScroll({
                    direction: event.deltaX < 0 ? 'left' : 'right',
                    offset: newOffset,
                    animate: false,
                });
            }
        };
        try {
            _this.mutationObserver = new MutationObserver(debounce(_this.handleMutation, 30, true));
        }
        catch (e) {
            // in the case where we are running on an unsupported browser,
            // or where tests include the FilmstripView but do not mock the MutationObserver - we catch it and handle safely here.
            // NOTE: this won't effect the component, it just means mutations won't be observerd
        }
        return _this;
    }
    Object.defineProperty(FilmstripView.prototype, "offset", {
        get: function () {
            var offset = this.props.offset;
            if (!offset) {
                return 0;
            }
            return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilmstripView.prototype, "minOffset", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilmstripView.prototype, "maxOffset", {
        /**
         * The furthest we can scroll, where the end of the buffer is just in view
         */
        get: function () {
            var _a = this.state, bufferWidth = _a.bufferWidth, windowWidth = _a.windowWidth;
            return Math.max(this.minOffset, bufferWidth - windowWidth - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilmstripView.prototype, "canGoLeft", {
        get: function () {
            return this.offset > this.minOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilmstripView.prototype, "canGoRight", {
        get: function () {
            return this.offset < this.maxOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilmstripView.prototype, "transitionDuration", {
        get: function () {
            var animate = this.props.animate;
            var windowWidth = this.state.windowWidth;
            if (!animate) {
                return 0;
            }
            if (Math.abs(this.offset - this.previousOffset) < 1e-6) {
                return DURATION_MIN;
            }
            else {
                var diff = Math.abs(this.offset - this.previousOffset);
                var relativeOffset = diff / windowWidth;
                var duration = DURATION_MAX - DURATION_MIN * relativeOffset;
                return Math.max(Math.min(duration, DURATION_MAX), DURATION_MIN);
            }
        },
        enumerable: true,
        configurable: true
    });
    FilmstripView.prototype.initMutationObserver = function () {
        var mutationObserver = this.mutationObserver;
        if (mutationObserver) {
            mutationObserver.disconnect();
            mutationObserver.observe(this.bufferElement, MUTATION_CONFIG);
        }
    };
    FilmstripView.prototype.triggerScrollEvent = function () {
        if (!this.windowElement) {
            return;
        }
        var event = document.createEvent('MouseEvents');
        event.initEvent('scroll', true, true);
        this.windowElement.dispatchEvent(event);
    };
    // find the child that is cut off on the left edge of the window and change the window offset to
    // start to the left of that child
    FilmstripView.prototype.getClosestForLeft = function (offset) {
        var leftWindowEdge = Math.min(this.maxOffset, Math.max(this.minOffset, offset));
        for (var i = 0; i < this.childOffsets.length; ++i) {
            var childBounds = this.childOffsets[i];
            if (leftWindowEdge >= childBounds.left &&
                leftWindowEdge <= childBounds.right) {
                var newOffset = childBounds.left;
                if (newOffset >= EXTRA_PADDING) {
                    return newOffset - EXTRA_PADDING; // show extra padding from the next sibling for aesthetic reasons
                }
                else {
                    return newOffset;
                }
            }
        }
        return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
    };
    // find the child that is cut off on the right edge of the window and change the window offset
    // to finish at start of the next child
    FilmstripView.prototype.getClosestForRight = function (offset) {
        var windowWidth = this.state.windowWidth;
        var rightWindowEdge = Math.min(this.maxOffset, Math.max(this.minOffset, offset)) + windowWidth;
        for (var i = 0; i < this.childOffsets.length; ++i) {
            var childBounds = this.childOffsets[i];
            if (rightWindowEdge >= childBounds.left &&
                rightWindowEdge <= childBounds.right) {
                var newOffset = childBounds.right - windowWidth;
                if (newOffset + EXTRA_PADDING <= this.maxOffset) {
                    return newOffset + EXTRA_PADDING; // show extra padding from the next sibling for aesthetic reasons
                }
                else {
                    return newOffset;
                }
            }
        }
        return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
    };
    FilmstripView.prototype.renderLeftArrow = function () {
        var canGoLeft = this.canGoLeft;
        if (!canGoLeft) {
            return null;
        }
        return React.createElement(LeftArrow, { onClick: this.handleLeftClick });
    };
    FilmstripView.prototype.renderRightArrow = function () {
        var canGoRight = this.canGoRight;
        if (!canGoRight) {
            return null;
        }
        return React.createElement(RightArrow, { onClick: this.handleRightClick });
    };
    FilmstripView.prototype.componentDidMount = function () {
        this.previousOffset = this.offset;
        window.addEventListener('resize', this.handleSizeChange);
    };
    FilmstripView.prototype.componentWillUnmount = function () {
        var mutationObserver = this.mutationObserver;
        window.removeEventListener('resize', this.handleSizeChange);
        if (mutationObserver) {
            mutationObserver.disconnect();
        }
    };
    FilmstripView.prototype.componentDidUpdate = function () {
        var _this = this;
        this.previousOffset = this.offset;
        // trigger a "real" scroll event so lazily loaded cards realize they've been shown
        // note: we have to wait for the transition to end, otherwise the cards not visible when the scroll
        // event is triggered will be forever stuck in the loading screen (due to the lazy load)
        window.setTimeout(function () { return _this.triggerScrollEvent(); }, this.transitionDuration * 1000);
    };
    FilmstripView.prototype.render = function () {
        var _a = this.props, animate = _a.animate, children = _a.children;
        var transform = "translateX(" + -this.offset + "px)";
        var transitionProperty = animate ? 'transform' : 'none';
        var transitionDuration = this.transitionDuration + "s";
        return (React.createElement(FilmStripViewWrapper, null,
            this.renderLeftArrow(),
            React.createElement(FilmStripListWrapper, { ref: this.handleWindowElementChange, onWheel: this.handleScroll },
                React.createElement(FilmStripList, { ref: this.handleBufferElementChange, style: { transform: transform, transitionProperty: transitionProperty, transitionDuration: transitionDuration } }, React.Children.map(children, mapReactChildToReactNode))),
            this.renderRightArrow()));
    };
    FilmstripView.defaultProps = {
        animate: false,
        offset: 0,
    };
    return FilmstripView;
}(React.Component));
export { FilmstripView };
function mapReactChildToReactNode(child, index) {
    var key = (isReactElement(child) && child.key) || index;
    return React.createElement(FilmStripListItem, { key: key }, child);
}
function isReactElement(child) {
    return !!child.type;
}
//# sourceMappingURL=index.js.map