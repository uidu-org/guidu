import * as tslib_1 from "tslib";
import * as React from 'react';
import { CardLoading } from '../utils/cardLoading';
/**
 * TODO: MS-699 Remove these loaders when CardView is no longer used externally
 */
var CardView = /** @class */ (function (_super) {
    tslib_1.__extends(CardView, _super);
    function CardView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            CardView: CardView.CardView,
        };
        return _this;
    }
    CardView.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.state.CardView) {
            import(/* webpackChunkName:"@atlaskit-internal_CardView" */ './cardView').then(function (module) {
                CardView.CardView = module.CardView;
                _this.setState({ CardView: module.CardView });
            });
        }
    };
    CardView.prototype.render = function () {
        var dimensions = this.props.dimensions;
        if (!this.state.CardView) {
            return React.createElement(CardLoading, { dimensions: dimensions });
        }
        return React.createElement(this.state.CardView, tslib_1.__assign({}, this.props));
    };
    return CardView;
}(React.PureComponent));
export { CardView };
//# sourceMappingURL=cardViewLoader.js.map