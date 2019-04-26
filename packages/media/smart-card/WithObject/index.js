import * as tslib_1 from "tslib";
import * as React from 'react';
import Context from '../Context';
import { v4 } from 'uuid';
import { BlockCardErroredView, InlineCardErroredView } from '@uidu/media-ui';
import { ANALYTICS_CHANNEL } from '../analytics';
var InnerWithObject = /** @class */ (function (_super) {
    tslib_1.__extends(InnerWithObject, _super);
    function InnerWithObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            uuid: v4(),
            cardState: { status: 'pending' },
        };
        _this.fireAnalyticsEvent = function (payload) {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                createAnalyticsEvent(payload).fire(ANALYTICS_CHANNEL);
            }
        };
        _this.reload = function () {
            var cardState = _this.state.cardState;
            if (cardState.status === 'errored' ||
                cardState.status === 'unauthorized' ||
                cardState.status === 'forbidden') {
                var _a = _this.props, client = _a.client, url = _a.url;
                client.reload(url, _this.fireAnalyticsEvent, cardState.definitionId);
            }
        };
        _this.updateState = function (incoming) {
            var _a = _this.props, url = _a.url, client = _a.client;
            var _b = tslib_1.__read(incoming, 2), state = _b[0], expired = _b[1];
            if (state === null || expired) {
                return client.resolve(url, _this.fireAnalyticsEvent);
            }
            return _this.setState({
                cardState: state,
            });
        };
        return _this;
    }
    InnerWithObject.prototype.componentDidMount = function () {
        var _a = this.props, client = _a.client, url = _a.url;
        var uuid = this.state.uuid;
        client.register(url).subscribe(uuid, this.updateState);
    };
    InnerWithObject.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, client = _a.client, url = _a.url;
        var uuid = this.state.uuid;
        if (client !== prevProps.client) {
            prevProps.client.deregister(prevProps.url, uuid);
            client.register(url).subscribe(uuid, this.updateState);
        }
        if (url !== prevProps.url) {
            client.deregister(prevProps.url, uuid);
            client.register(url).subscribe(uuid, this.updateState);
        }
        return;
    };
    InnerWithObject.prototype.componentWillUnmount = function () {
        var _a = this.props, client = _a.client, url = _a.url;
        var uuid = this.state.uuid;
        client.deregister(url, uuid);
    };
    InnerWithObject.prototype.render = function () {
        var children = this.props.children;
        var cardState = this.state.cardState;
        return children({ state: cardState, reload: this.reload });
    };
    return InnerWithObject;
}(React.Component));
export function WithObject(props) {
    var clientFromProps = props.client, url = props.url, children = props.children, isSelected = props.isSelected, appearance = props.appearance, createAnalyticsEvent = props.createAnalyticsEvent;
    return (React.createElement(Context.Consumer, null, function (clientFromContext) {
        var client = clientFromProps || clientFromContext;
        if (!client) {
            // tslint:disable-next-line:no-console
            console.error("No Smart Card client provided. Provide a client via prop <Card client={new Client()} /> or by wrapping with a provider <SmartCardProvider><Card /></SmartCardProvider>.'");
            return appearance === 'inline' ? (React.createElement(InlineCardErroredView, { url: url, isSelected: isSelected, message: "Smart Card provider missing", onClick: function () { return window.open(url); } })) : (React.createElement(BlockCardErroredView, { url: url, isSelected: isSelected, message: "Smart Card provider missing", onClick: function () { return window.open(url); } }));
        }
        return (React.createElement(InnerWithObject, { client: client, url: url, createAnalyticsEvent: createAnalyticsEvent }, children));
    }));
}
//# sourceMappingURL=index.js.map