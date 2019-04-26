import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import { MentionsInput, Mention } from 'react-mentions';
import { defaultStyle, defaultMentionStyle } from '../utils';
var FieldMentionsStateless = /** @class */ (function (_super) {
    tslib_1.__extends(FieldMentionsStateless, _super);
    function FieldMentionsStateless() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldMentionsStateless.prototype.render = function () {
        var _a = this.props, value = _a.value, placeholder = _a.placeholder, allowSpaceInQuery = _a.allowSpaceInQuery, items = _a.items, onChange = _a.onChange, onKeyDown = _a.onKeyDown, className = _a.className, suggestionsPortalHost = _a.suggestionsPortalHost, style = _a.style;
        return (React.createElement(MentionsInput, { value: value.value || '', onChange: onChange, onKeyDown: onKeyDown, style: style, placeholder: placeholder, allowSpaceInQuery: allowSpaceInQuery, className: classNames('form-control h-auto', className), suggestionsPortalHost: suggestionsPortalHost }, items.map(function (item) { return (React.createElement(Mention, tslib_1.__assign({}, item, { key: item.type, style: defaultMentionStyle, appendSpaceOnAdd: true }))); })));
    };
    FieldMentionsStateless.defaultProps = {
        placeholder: "Mention people using '@'",
        allowSpaceInQuery: true,
        style: defaultStyle,
    };
    return FieldMentionsStateless;
}(Component));
export default FieldMentionsStateless;
//# sourceMappingURL=FieldMentionsStateless.js.map