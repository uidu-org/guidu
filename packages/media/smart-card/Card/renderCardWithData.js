import * as tslib_1 from "tslib";
import * as React from 'react';
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD';
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD';
import { BlockCardResolvedView, InlineCardResolvedView, } from '@uidu/media-ui';
var CardWithDataContent = /** @class */ (function (_super) {
    tslib_1.__extends(CardWithDataContent, _super);
    function CardWithDataContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardWithDataContent.prototype.render = function () {
        var _a = this.props, data = _a.data, isSelected = _a.isSelected, appearance = _a.appearance, onClick = _a.onClick;
        if (appearance === 'inline') {
            return (React.createElement(InlineCardResolvedView, tslib_1.__assign({}, extractInlinePropsFromJSONLD(data || {}), { isSelected: isSelected, onClick: onClick })));
        }
        else {
            return (React.createElement(BlockCardResolvedView, tslib_1.__assign({}, extractBlockPropsFromJSONLD(data || {}), { isSelected: isSelected, onClick: onClick })));
        }
    };
    return CardWithDataContent;
}(React.Component));
export { CardWithDataContent };
//# sourceMappingURL=renderCardWithData.js.map