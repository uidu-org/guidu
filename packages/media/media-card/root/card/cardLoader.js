import * as tslib_1 from "tslib";
import * as React from 'react';
import { CardLoading } from '../../utils/cardLoading';
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            Card: Card.Card,
        };
        return _this;
    }
    Card.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.state.Card) {
            import(/* webpackChunkName:"@atlaskit-internal_Card" */ './index').then(function (module) {
                Card.Card = module.Card;
                _this.setState({ Card: module.Card });
            });
        }
    };
    Card.prototype.render = function () {
        var dimensions = this.props.dimensions;
        if (!this.state.Card) {
            return React.createElement(CardLoading, { dimensions: dimensions });
        }
        return React.createElement(this.state.Card, tslib_1.__assign({}, this.props));
    };
    Card.displayName = 'AsyncCard';
    return Card;
}(React.PureComponent));
export default Card;
//# sourceMappingURL=cardLoader.js.map