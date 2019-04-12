import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import FieldMentionsStateless from './FieldMentionsStateless';
var FieldMentions = /** @class */ (function (_super) {
    tslib_1.__extends(FieldMentions, _super);
    function FieldMentions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (event, newValue, newPlainTextValue, mentions) {
            var _a = _this.props, onSetValue = _a.onSetValue, onChange = _a.onChange, name = _a.name;
            if (newValue === '') {
                onSetValue('');
                onChange(name, '');
            }
            else {
                onSetValue({
                    value: newValue,
                    plainTextValue: newPlainTextValue,
                    mentions: mentions,
                });
                onChange(name, {
                    value: newValue,
                    plainTextValue: newPlainTextValue,
                    mentions: mentions,
                });
            }
        };
        _this.initElementRef = function (element) {
            _this.element = element;
        };
        return _this;
    }
    FieldMentions.prototype.render = function () {
        return (React.createElement(Wrapper, tslib_1.__assign({}, this.props),
            React.createElement(FieldMentionsStateless, tslib_1.__assign({}, this.props, { onChange: this.handleChange, ref: this.initElementRef }))));
    };
    FieldMentions.defaultProps = {
        displayTransform: function (id, display, type) { return display; },
        onBlur: function () { },
        onChange: function () { },
        onKeyDown: function () { },
    };
    return FieldMentions;
}(Component));
export default ComponentHOC(FieldMentions);
//# sourceMappingURL=FieldMentions.js.map