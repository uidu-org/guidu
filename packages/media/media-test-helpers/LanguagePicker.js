import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import DropdownMenu, { DropdownItemGroup, DropdownItem, } from '@uidu/dropdown-menu';
import WorldIcon from '@atlaskit/icon/glyph/world';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
var DropdownContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: 8px;\n  width: 200px;\n"], ["\n  margin: 8px;\n  width: 200px;\n"])));
var LanguagePicker = /** @class */ (function (_super) {
    tslib_1.__extends(LanguagePicker, _super);
    function LanguagePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (locale) {
            _this.props.onChange(locale);
        };
        return _this;
    }
    LanguagePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, languages = _a.languages, locale = _a.locale;
        return (React.createElement(DropdownContainer, null,
            React.createElement(DropdownMenu, { trigger: languages[locale], triggerType: "button", boundariesElement: "scrollParent", triggerButtonProps: {
                    iconBefore: React.createElement(WorldIcon, { label: "Language Picker" }),
                    iconAfter: React.createElement(ChevronDownIcon, { label: "Language Picker" }),
                    shouldFitContainer: true,
                }, shouldFitContainer: true },
                React.createElement(DropdownItemGroup, null, Object.keys(languages).map(function (l) { return (React.createElement(DropdownItem, { key: l, onClick: function () { return _this.handleClick(l); } }, languages[l])); })))));
    };
    return LanguagePicker;
}(Component));
export default LanguagePicker;
var templateObject_1;
//# sourceMappingURL=LanguagePicker.js.map