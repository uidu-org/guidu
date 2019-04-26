import * as tslib_1 from "tslib";
import React, { Component, Fragment } from 'react';
import ReactChatView from 'react-chatview';
import Message, { MessageGroup, MessageActions, MessageActionReactions, MessageActionReply, MessageActionMore, MessageReactions, } from '@uidu/message';
import MessagesForm from '@uidu/message-form';
import { sortByDay, groupByDay, groupByMessager } from '../utils';
// import Loader from 'components/Loader';
var ChatWindow = /** @class */ (function (_super) {
    tslib_1.__extends(ChatWindow, _super);
    function ChatWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatWindow.prototype.render = function () {
        var _a = this.props, messageable = _a.messageable, fetchMessages = _a.fetchMessages, mentionables = _a.mentionables, betweenMinutes = _a.betweenMinutes, actions = _a.actions, otherProps = tslib_1.__rest(_a, ["messageable", "fetchMessages", "mentionables", "betweenMinutes", "actions"]);
        var messages = messageable.messages;
        // if (!messages || messages.isFetching) {
        //   return (
        //     <div className="h-100 d-flex align-items-center justify-content-center">
        //       <Loader />
        //     </div>
        //   );
        // }
        var groupedByDay = groupByDay(sortByDay(messages.messages));
        return (React.createElement("div", { className: "feed d-flex flex-column justify-content-end h-100 flex-grow-1" },
            React.createElement("div", { className: "h-100" // commenting this will put messages down but no auto-.scroll
                , style: {
                    overflow: 'auto',
                } },
                React.createElement(ReactChatView, { onInfiniteLoad: function () {
                        return fetchMessages(messageable, messages.messages[messages.messages.length - 1].id);
                    }, shouldTriggerLoad: function () { return messages.hasMore; }, className: "h-100", flipped: true }, Object.keys(groupedByDay).map(function (day) {
                    var todayMessages = groupedByDay[day];
                    return (React.createElement(Fragment, { key: day },
                        React.createElement("div", { className: "d-flex justify-content-center sticky-top small text-muted py-3" }, day),
                        groupByMessager(todayMessages, betweenMinutes)
                            .reverse()
                            .map(function (messageGroup, index) {
                            return (React.createElement(MessageGroup, { key: day + "-" + index, messager: messageGroup.messager, messages: messageGroup.messages, kind: messageGroup.kind }, function (_a) {
                                var messager = _a.messager, messages = _a.messages;
                                return messages.reverse().map(function (message) { return (React.createElement(Message, { key: message.id, message: message, messager: messager, mentionables: mentionables }, function (_a) {
                                    var editing = _a.editing, setEditing = _a.setEditing, hovered = _a.hovered, onDropdownChange = _a.onDropdownChange;
                                    return [
                                        React.createElement(MessageActions, { hovered: hovered },
                                            React.createElement(MessageActionReply, null),
                                            React.createElement(MessageActionReactions, { onOpenChange: onDropdownChange, onClick: console.log }),
                                            React.createElement(MessageActionMore, { onOpenChange: onDropdownChange, actions: actions({
                                                    onDropdownChange: onDropdownChange,
                                                    setEditing: setEditing,
                                                    editing: editing,
                                                    message: message,
                                                }) })),
                                        message.reactions && (React.createElement(MessageReactions, { reactions: message.reactions })),
                                    ];
                                })); });
                            }));
                        })));
                }))),
            React.createElement(MessagesForm, tslib_1.__assign({}, otherProps, { mentionables: mentionables, message: {}, messageable: messageable }))));
    };
    ChatWindow.defaultProps = {
        betweenMinutes: 5,
        messageable: {},
        fetchMessages: function () { },
    };
    return ChatWindow;
}(Component));
export default ChatWindow;
//# sourceMappingURL=ChatWindow.js.map