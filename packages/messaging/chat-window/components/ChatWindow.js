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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Component } from 'react';
import ReactChatView from 'react-chatview';
import Message, { MessageGroup, MessageActions, MessageActionReactions, MessageActionReply, MessageActionMore, MessageReactions, } from '@uidu/message';
import MessagesForm from '@uidu/message-form';
import { sortByDay, groupByDay, groupByMessager } from '../utils';
// import Loader from 'components/Loader';
var ChatWindow = /** @class */ (function (_super) {
    __extends(ChatWindow, _super);
    function ChatWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatWindow.prototype.render = function () {
        var _a = this.props, messageable = _a.messageable, fetchMessages = _a.fetchMessages, otherProps = __rest(_a, ["messageable", "fetchMessages"]);
        var messages = messageable.messages;
        // if (!messages || messages.isFetching) {
        //   return (
        //     <div className="h-100 d-flex align-items-center justify-content-center">
        //       <Loader />
        //     </div>
        //   );
        // }
        var groupedByDay = groupByDay(sortByDay(messages.messages));
        return (React.createElement("div", { className: "feed d-flex flex-column justify-content-end h-100" },
            React.createElement("div", { className: "h-100" // commenting this will put messages down but no auto-.scroll
                , style: {
                    overflow: 'auto',
                } },
                React.createElement(ReactChatView, { onInfiniteLoad: function () {
                        return fetchMessages(messageable, messages.messages[messages.messages.length - 1].id);
                    }, shouldTriggerLoad: function () { return messages.hasMore; }, className: "h-100", flipped: true }, Object.keys(groupedByDay).map(function (day) {
                    var todayMessages = groupedByDay[day];
                    return (React.createElement("div", { key: day },
                        React.createElement("div", { className: "d-flex justify-content-center sticky-top small text-muted py-3" }, day),
                        groupByMessager(todayMessages)
                            .reverse()
                            .map(function (messageGroup, index) {
                            return (React.createElement(MessageGroup, { key: day + "-" + index, messager: messageGroup.messager, messages: messageGroup.messages, kind: messageGroup.kind }, function (_a) {
                                var messager = _a.messager, messages = _a.messages;
                                return messages.reverse().map(function (message) { return (React.createElement(Message, { key: message.id, message: message, messager: messager }, function (_a) {
                                    var editing = _a.editing, setEditing = _a.setEditing, hovered = _a.hovered, onDropdownChange = _a.onDropdownChange;
                                    return [
                                        React.createElement(MessageActions, { hovered: hovered },
                                            React.createElement(MessageActionReply, null),
                                            React.createElement(MessageActionReactions, { onOpenChange: onDropdownChange, onClick: console.log }),
                                            React.createElement(MessageActionMore, { onOpenChange: onDropdownChange, actions: [
                                                    { name: 'Edit', onClick: setEditing },
                                                    // { name: 'Pin' },
                                                    { name: 'Forward' },
                                                    { name: 'Copy' },
                                                    { name: 'Set reminder' },
                                                ] })),
                                        message.reactions && (React.createElement(MessageReactions, { reactions: message.reactions })),
                                    ];
                                })); });
                            }));
                        })));
                }))),
            React.createElement(MessagesForm, __assign({}, otherProps, { message: {}, messageable: messageable }))));
    };
    ChatWindow.defaultProps = {
        messageable: {},
        fetchMessages: function () { },
    };
    return ChatWindow;
}(Component));
export default ChatWindow;
//# sourceMappingURL=ChatWindow.js.map