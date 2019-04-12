import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Interweave from 'interweave';
import { UrlMatcher, HashtagMatcher } from 'interweave-autolink';
import Hashtag from './Hashtag';
import Url from './Url';
import MentionMatcher from './MentionMatcher';
var MessageRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MessageRenderer, _super);
    function MessageRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageRenderer.prototype.render = function () {
        var _a = this.props, content = _a.content, tagName = _a.tagName;
        return (React.createElement(Interweave, { tagName: tagName, content: content, mentionLinks: function (mention) { return [
                {
                    name: 'View profile',
                    link: "/" + mention.id,
                },
            ]; }, matchers: [
                new UrlMatcher('url', {}, Url),
                new HashtagMatcher('hashtag', {}, Hashtag),
                new MentionMatcher('mention', {}),
            ] }));
    };
    MessageRenderer.defaultProps = {
        tagName: 'div',
    };
    return MessageRenderer;
}(Component));
export default MessageRenderer;
//# sourceMappingURL=MessageRenderer.js.map