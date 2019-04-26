import * as tslib_1 from "tslib";
import * as React from 'react';
import { CardLinkView } from '@uidu/media-ui';
import { auth } from '@atlaskit/outbound-auth-flow-client';
export var isCardWithData = function (props) {
    return !!props.data;
};
var CardWithURLRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CardWithURLRenderer, _super);
    function CardWithURLRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardWithURLRenderer.moduleImporter = function (target) {
        import(/* webpackChunkName:"@atlaskit-internal-smartcard-urlcardcontent" */ './renderCardWithUrl').then(function (module) {
            CardWithURLRenderer.CardContent = module.CardWithUrlContent;
            target.forceUpdate();
        });
    };
    CardWithURLRenderer.prototype.componentDidMount = function () {
        if (CardWithURLRenderer.CardContent === null) {
            (this.props.importer || CardWithURLRenderer.moduleImporter)(this);
        }
    };
    CardWithURLRenderer.prototype.render = function () {
        var _a = this.props, url = _a.url, client = _a.client, appearance = _a.appearance, isSelected = _a.isSelected, onClick = _a.onClick, createAnalyticsEvent = _a.createAnalyticsEvent;
        if (!url) {
            throw new Error('@atlaskit/smart-card: url property is missing.');
        }
        return CardWithURLRenderer.CardContent !== null ? (React.createElement(CardWithURLRenderer.CardContent, { url: url, client: client, appearance: appearance, onClick: onClick, isSelected: isSelected, createAnalyticsEvent: createAnalyticsEvent, authFn: auth })) : (React.createElement(CardLinkView, { key: 'chunk-placeholder', link: url }));
    };
    CardWithURLRenderer.CardContent = null;
    return CardWithURLRenderer;
}(React.PureComponent));
export { CardWithURLRenderer };
var CardWithDataRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CardWithDataRenderer, _super);
    function CardWithDataRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardWithDataRenderer.moduleImporter = function (target) {
        import(/* webpackChunkName:"@atlaskit-internal-smartcard-datacardcontent" */ './renderCardWithData').then(function (module) {
            CardWithDataRenderer.CardContent = module.CardWithDataContent;
            target.forceUpdate();
        });
    };
    CardWithDataRenderer.prototype.componentDidMount = function () {
        if (CardWithDataRenderer.CardContent === null) {
            (this.props.importer || CardWithDataRenderer.moduleImporter)(this);
        }
    };
    CardWithDataRenderer.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, data = _a.data, isSelected = _a.isSelected, onClick = _a.onClick;
        if (!data) {
            throw new Error('@atlaskit/smart-cards: you are trying to render a card with data, but does not provide any');
        }
        if (CardWithDataRenderer.CardContent) {
            return (React.createElement(CardWithDataRenderer.CardContent, { appearance: appearance, data: data, isSelected: isSelected, onClick: onClick }));
        }
        return React.createElement("div", { "card-with-data": true });
    };
    CardWithDataRenderer.CardContent = null;
    return CardWithDataRenderer;
}(React.PureComponent));
export { CardWithDataRenderer };
//# sourceMappingURL=render.js.map