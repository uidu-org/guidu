import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as debounce from 'lodash.debounce';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from '@uidu/media-ui';
import FieldText from '@uidu/field-text';
import Button from '@uidu/button';
import Spinner from '@uidu/spinner';
import { CardView } from '@uidu/media-card';
import { BricksLayout } from './bricksGrid';
import { fileClick } from '../../../actions/fileClick';
import { setUpfrontIdDeferred } from '../../../actions/setUpfrontIdDeferred';
import gridCellScaler from '../../../tools/gridCellScaler';
import { searchGiphy } from '../../../actions/searchGiphy';
import { Container, Title, ButtonContainer, GridCell, WarningContainer, WarningIconWrapper, WarningImage, WarningHeading, WarningSuggestion, } from './styles';
import { errorIcon } from '../../../../icons';
var NUMBER_OF_COLUMNS = 4;
var GAP_SIZE = 5;
var CONTAINER_WIDTH = 677;
var GiphyView = /** @class */ (function (_super) {
    tslib_1.__extends(GiphyView, _super);
    function GiphyView(props) {
        var _this = _super.call(this, props) || this;
        _this.getContent = function () {
            var _a = _this.props, hasError = _a.hasError, isLoading = _a.isLoading, cardModels = _a.cardModels;
            if (hasError) {
                return _this.renderError();
            }
            if (!isLoading && cardModels.length === 0) {
                return _this.renderEmptyState();
            }
            return _this.renderSearchResults();
        };
        _this.renderError = function () {
            return (React.createElement(WarningContainer, null,
                React.createElement(WarningIconWrapper, null, errorIcon),
                React.createElement(WarningHeading, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.cant_retrieve_gifs))),
                React.createElement(WarningSuggestion, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.check_your_network))),
                React.createElement(Button, { onClick: _this.handleRetryButtonClick },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.try_again)))));
        };
        _this.renderEmptyState = function () {
            var query = _this.state.query;
            // The GIF used in this error state is too large to store as a data URI (> 3.2 MB)
            return (React.createElement(WarningContainer, null,
                React.createElement(WarningImage, { src: "https://media1.giphy.com/media/10YK5Hh53nC3dK/200w.gif" }),
                React.createElement(WarningHeading, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_gifs_found))),
                React.createElement(WarningSuggestion, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_gifs_found_suggestion, { values: { query: query } })))));
        };
        _this.renderSearchResults = function () {
            var _a = _this.props, isLoading = _a.isLoading, cardModels = _a.cardModels, totalResultCount = _a.totalResultCount;
            var isThereAreMoreResults = totalResultCount === undefined ||
                cardModels.length < totalResultCount - 1;
            var shouldShowLoadMoreButton = isLoading || isThereAreMoreResults;
            var loadMoreButton = shouldShowLoadMoreButton && _this.renderLoadMoreButton();
            return (React.createElement("div", null,
                _this.renderMasonaryLayout(_this.props.cardModels),
                loadMoreButton));
        };
        _this.renderMasonaryLayout = function (cardModels) {
            if (cardModels.length === 0) {
                return null;
            }
            var cards = cardModels.map(function (cardModel, i) {
                var dataURI = cardModel.dataURI, metadata = cardModel.metadata, actualDimensions = cardModel.dimensions;
                var selectedItems = _this.props.selectedItems;
                var selected = selectedItems.some(function (item) { return item.id === metadata.id && item.serviceName === 'giphy'; });
                var dimensions = gridCellScaler(tslib_1.__assign({}, actualDimensions, { gapSize: GAP_SIZE, containerWidth: CONTAINER_WIDTH, numberOfColumns: NUMBER_OF_COLUMNS }));
                return (React.createElement(GridCell, { key: i + "-metadata.id", width: dimensions.width },
                    React.createElement(CardView, { status: "complete", dataURI: dataURI, metadata: metadata, dimensions: dimensions, selectable: true, selected: selected, onClick: _this.createClickHandler(cardModel) })));
            });
            return (React.createElement(BricksLayout, { id: "mediapicker-gif-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
        };
        _this.renderLoadMoreButton = function () {
            var isLoading = _this.props.isLoading;
            var iconAfter = isLoading ? React.createElement(Spinner, null) : undefined;
            return (React.createElement(ButtonContainer, null,
                React.createElement(Button, { onClick: _this.handleLoadMoreButtonClick, isDisabled: isLoading, iconAfter: iconAfter },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.load_more_gifs)))));
        };
        _this.createSearchChangeHandler = function () {
            var onSearchQueryChange = _this.props.onSearchQueryChange;
            var debouncedOnSearchQueryChange = debounce(onSearchQueryChange, 1000);
            return function (e) {
                var query = e.currentTarget.value;
                _this.setState({
                    query: query,
                });
                debouncedOnSearchQueryChange(query);
            };
        };
        _this.createClickHandler = function (cardModel) { return function () {
            var _a = _this.props, onCardClick = _a.onCardClick, setUpfrontIdDeferred = _a.setUpfrontIdDeferred;
            var upfrontId = new Promise(function (resolve, reject) {
                var id = cardModel.metadata.id;
                setUpfrontIdDeferred(id, resolve, reject);
            });
            onCardClick(cardModel, upfrontId);
        }; };
        _this.handleLoadMoreButtonClick = function () {
            var onLoadMoreButtonClick = _this.props.onLoadMoreButtonClick;
            onLoadMoreButtonClick(_this.state.query, true);
        };
        _this.handleRetryButtonClick = function () {
            var onSearchQueryChange = _this.props.onSearchQueryChange;
            onSearchQueryChange(_this.state.query);
        };
        _this.state = {
            query: '',
        };
        _this.searchChangeHandler = _this.createSearchChangeHandler();
        return _this;
    }
    GiphyView.prototype.componentDidUpdate = function (_a) {
        var oldOnSearchQueryChange = _a.onSearchQueryChange;
        var newOnSearchQueryChange = this.props.onSearchQueryChange;
        if (oldOnSearchQueryChange !== newOnSearchQueryChange) {
            this.createSearchChangeHandler();
        }
    };
    GiphyView.prototype.render = function () {
        var formatMessage = this.props.intl.formatMessage;
        var query = this.state.query;
        return (React.createElement(Container, { id: "mediapicker-giphy-container" },
            React.createElement(Title, null, "GIPHY"),
            React.createElement(FieldText, { label: "", placeholder: formatMessage(messages.search_all_gifs), onChange: this.searchChangeHandler, shouldFitContainer: true, value: query }),
            this.getContent()));
    };
    return GiphyView;
}(Component));
export { GiphyView };
export default connect(function (state) { return ({
    hasError: state.view.hasError,
    isLoading: state.view.isLoading,
    cardModels: state.giphy.imageCardModels,
    totalResultCount: state.giphy.totalResultCount,
    selectedItems: state.selectedItems,
}); }, function (dispatch) { return ({
    onSearchQueryChange: function (query) { return dispatch(searchGiphy(query, false)); },
    onLoadMoreButtonClick: function (query, shouldAppendResults) {
        return dispatch(searchGiphy(query, shouldAppendResults));
    },
    onCardClick: function (cardModel, upfrontId) {
        var _a = cardModel.metadata, id = _a.id, name = _a.name, size = _a.size;
        dispatch(fileClick({
            mimeType: 'image/gif',
            id: id || '',
            name: name || '',
            size: size || 0,
            date: Date.now(),
            upfrontId: upfrontId,
        }, 'giphy'));
    },
    setUpfrontIdDeferred: function (id, resolver, rejecter) {
        return dispatch(setUpfrontIdDeferred(id, resolver, rejecter));
    },
}); })(injectIntl(GiphyView));
//# sourceMappingURL=giphyView.js.map