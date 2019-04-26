import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import FieldMentionsStateless from './FieldMentionsStateless';
var FieldMentions = /** @class */ (function (_super) {
    tslib_1.__extends(FieldMentions, _super);
    function FieldMentions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = React.createRef();
        _this.handleChange = function (event, value, plainTextValue, mentions) {
            var _a = _this.props, onSetValue = _a.onSetValue, onChange = _a.onChange, name = _a.name;
            if (value === '') {
                onSetValue('');
                onChange(name, '');
            }
            else {
                onSetValue({
                    value: value,
                    plainTextValue: plainTextValue,
                    mentions: mentions,
                });
                onChange(name, {
                    value: value,
                    plainTextValue: plainTextValue,
                    mentions: mentions,
                });
            }
        };
        return _this;
    }
    FieldMentions.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, otherProps = tslib_1.__rest(_a, ["onChange"]);
        return (React.createElement(Wrapper, tslib_1.__assign({}, this.props),
            React.createElement(FieldMentionsStateless, tslib_1.__assign({}, otherProps, { onChange: this.handleChange, ref: this.element }))));
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