var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import { Matcher } from 'interweave';
import Mention from './Mention';
import { MENTION_PATTERN } from '../constants';
var MentionMatcher = /** @class */ (function (_super) {
    __extends(MentionMatcher, _super);
    function MentionMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MentionMatcher.prototype.replaceWith = function (match, props) {
        return React.createElement(Mention, props, match);
    };
    MentionMatcher.prototype.asTag = function () {
        return 'a';
    };
    MentionMatcher.prototype.match = function (string) {
        return this.doMatch(string, MENTION_PATTERN, function (matches) {
            return {
                display: matches[2],
                type: matches[3].split(':')[0],
                id: matches[3].split(':')[1],
            };
        });
    };
    return MentionMatcher;
}(Matcher));
export default MentionMatcher;
//# sourceMappingURL=MentionMatcher.js.map