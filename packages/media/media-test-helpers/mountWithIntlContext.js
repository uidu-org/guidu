import * as tslib_1 from "tslib";
import { IntlProvider, intlShape } from 'react-intl';
import { mount } from 'enzyme';
export var mountWithIntlContext = function (node, reactContext, childContextTypes) {
    var intlProvider = new IntlProvider({
        locale: 'en',
        messages: {},
    });
    var intl = intlProvider.getChildContext().intl;
    return mount(node, {
        context: tslib_1.__assign({ intl: intl }, reactContext),
        childContextTypes: tslib_1.__assign({ intl: intlShape }, childContextTypes),
    });
};
//# sourceMappingURL=mountWithIntlContext.js.map