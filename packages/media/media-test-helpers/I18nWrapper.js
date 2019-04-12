import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { locales, languages } from '@uidu/media-ui';
import LanguagePicker from './LanguagePicker';
import * as es from 'react-intl/locale-data/es';
addLocaleData(es);
var I18NWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(I18NWrapper, _super);
    function I18NWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            locale: 'en',
        };
        _this.onLocaleChange = function (option) {
            _this.setState({
                locale: option.value,
            });
        };
        _this.loadLocale = function (locale) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.setState({ locale: locale });
                return [2 /*return*/];
            });
        }); };
        _this.getLocalTag = function (locale) { return locale.substring(0, 2); };
        return _this;
    }
    I18NWrapper.prototype.render = function () {
        var children = this.props.children;
        var locale = this.state.locale;
        // We need to clone the element and pass a the locale prop to force a re render
        var childrenWithLocale = React.cloneElement(children, { locale: locale });
        return (React.createElement(IntlProvider, { locale: this.getLocalTag(locale), messages: locales[locale] },
            React.createElement("div", null,
                React.createElement(LanguagePicker, { languages: languages, locale: locale, onChange: this.loadLocale }),
                childrenWithLocale)));
    };
    return I18NWrapper;
}(Component));
export { I18NWrapper };
//# sourceMappingURL=I18nWrapper.js.map