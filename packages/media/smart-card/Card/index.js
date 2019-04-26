import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalyticsForSumTypeProps } from '@atlaskit/analytics-next';
import { isCardWithData, CardWithDataRenderer, CardWithURLRenderer, } from './render';
var PlainCard = /** @class */ (function (_super) {
    tslib_1.__extends(PlainCard, _super);
    function PlainCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlainCard.prototype.render = function () {
        return isCardWithData(this.props) ? (React.createElement(CardWithDataRenderer, tslib_1.__assign({}, this.props))) : (React.createElement(CardWithURLRenderer, tslib_1.__assign({}, this.props)));
    };
    return PlainCard;
}(React.PureComponent));
export var Card = withAnalyticsForSumTypeProps()(PlainCard);
//# sourceMappingURL=index.js.map