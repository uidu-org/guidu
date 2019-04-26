import * as tslib_1 from "tslib";
import * as React from 'react';
import LazyRender from 'react-lazily-render';
import { CardLinkView, BlockCardResolvingView, BlockCardErroredView, BlockCardUnauthorisedView, BlockCardForbiddenView, BlockCardResolvedView, InlineCardResolvedView, InlineCardResolvingView, InlineCardErroredView, InlineCardForbiddenView, InlineCardUnauthorizedView, } from '@uidu/media-ui';
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD';
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD';
import { WithObject } from '../WithObject';
import { connectFailedEvent, connectSucceededEvent, trackAppAccountConnected, ANALYTICS_CHANNEL, } from '../analytics';
var getCollapsedIcon = function (state) {
    var data = state.data;
    return (data && data.generator && data.generator.icon && data.generator.icon.url);
};
var renderBlockCard = function (url, state, handleAuthorise, handleErrorRetry, handleFrameClick, isSelected) {
    switch (state.status) {
        case 'pending':
            return React.createElement(CardLinkView, { link: url, isSelected: isSelected });
        case 'resolving':
            return (React.createElement(BlockCardResolvingView, { isSelected: isSelected, onClick: handleFrameClick }));
        case 'resolved':
            return (React.createElement(BlockCardResolvedView, tslib_1.__assign({}, extractBlockPropsFromJSONLD(state.data || {}), { isSelected: isSelected, onClick: handleFrameClick })));
        case 'unauthorized':
            return (React.createElement(BlockCardUnauthorisedView, { icon: getCollapsedIcon(state), isSelected: isSelected, url: url, onClick: handleFrameClick, onAuthorise: handleAuthorise }));
        case 'forbidden':
            return (React.createElement(BlockCardForbiddenView, { url: url, isSelected: isSelected, onClick: handleFrameClick, onAuthorise: handleAuthorise }));
        case 'not-found':
            return (React.createElement(BlockCardErroredView, { url: url, isSelected: isSelected, message: "We couldn't find this link", onClick: handleFrameClick }));
        case 'errored':
            return (React.createElement(BlockCardErroredView, { url: url, isSelected: isSelected, message: "We couldn't load this link", onClick: handleFrameClick, onRetry: handleErrorRetry }));
    }
};
var renderInlineCard = function (url, state, handleAuthorise, handleFrameClick, isSelected) {
    switch (state.status) {
        case 'pending':
            return React.createElement(CardLinkView, { link: url, isSelected: isSelected });
        case 'resolving':
            return (React.createElement(InlineCardResolvingView, { url: url, isSelected: isSelected, onClick: handleFrameClick }));
        case 'resolved':
            return (React.createElement(InlineCardResolvedView, tslib_1.__assign({}, extractInlinePropsFromJSONLD(state.data || {}), { isSelected: isSelected, onClick: handleFrameClick })));
        case 'unauthorized':
            return (React.createElement(InlineCardUnauthorizedView, { icon: getCollapsedIcon(state), url: url, isSelected: isSelected, onClick: handleFrameClick, onAuthorise: handleAuthorise }));
        case 'forbidden':
            return (React.createElement(InlineCardForbiddenView, { url: url, isSelected: isSelected, onClick: handleFrameClick, onAuthorise: handleAuthorise }));
        case 'not-found':
            return (React.createElement(InlineCardErroredView, { url: url, isSelected: isSelected, message: "We couldn't find this link", onClick: handleFrameClick }));
        case 'errored':
            return React.createElement(CardLinkView, { link: url, isSelected: isSelected });
    }
};
export function CardWithUrlContent(props) {
    var url = props.url, isSelected = props.isSelected, onClick = props.onClick, client = props.client, appearance = props.appearance, createAnalyticsEvent = props.createAnalyticsEvent, authFn = props.authFn;
    return (React.createElement(LazyRender, { offset: 100, component: appearance === 'inline' ? 'span' : 'div', placeholder: React.createElement(CardLinkView, { isSelected: isSelected, key: 'lazy-render-placeholder', link: url }), content: React.createElement(WithObject, { client: client, url: url, isSelected: isSelected, appearance: appearance, createAnalyticsEvent: createAnalyticsEvent }, function (_a) {
            var state = _a.state, reload = _a.reload;
            // TODO: support multiple auth services
            var firstAuthService = state.services &&
                state.services[0];
            var handleAuthorise = function () {
                authFn(firstAuthService.startAuthUrl).then(function () {
                    if (createAnalyticsEvent) {
                        createAnalyticsEvent(trackAppAccountConnected(state.definitionId)).fire(ANALYTICS_CHANNEL);
                        createAnalyticsEvent(connectSucceededEvent(url, state)).fire(ANALYTICS_CHANNEL);
                    }
                    reload();
                }, function (err) {
                    if (createAnalyticsEvent) {
                        createAnalyticsEvent(
                        // Yes, dirty, but we had a ticket for that
                        err.message === 'The auth window was closed'
                            ? connectFailedEvent('auth.window.was.closed', url, state)
                            : connectFailedEvent('potential.sensitive.data', url, state)).fire(ANALYTICS_CHANNEL);
                    }
                    reload();
                });
            };
            if (appearance === 'inline') {
                return renderInlineCard(url, state, firstAuthService ? handleAuthorise : undefined, function () { return (onClick ? onClick() : window.open(url)); }, isSelected);
            }
            return renderBlockCard(url, state, firstAuthService ? handleAuthorise : undefined, reload, function () { return (onClick ? onClick() : window.open(url)); }, isSelected);
        }) }));
}
//# sourceMappingURL=renderCardWithUrl.js.map