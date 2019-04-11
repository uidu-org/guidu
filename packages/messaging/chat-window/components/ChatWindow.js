import * as tslib_1 from "tslib";
import React, { Component } from 'react';
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
        var _a = this.props, messageable = _a.messageable, organizationMembers = _a.organizationMembers, fetchMessages = _a.fetchMessages, otherProps = tslib_1.__rest(_a, ["messageable", "organizationMembers", "fetchMessages"]);
        var messages = messageable.messages;
        if (!messages || messages.isFetching) {
            return (React.createElement("div", { className: "h-100 d-flex align-items-center justify-content-center" },
                React.createElement(Loader, null)));
        }
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
            React.createElement(MessagesForm, tslib_1.__assign({}, otherProps, { message: {}, messageable: messageable, organizationMembers: organizationMembers }))));
    };
    ChatWindow.defaultProps = {
        messageable: {},
        organizationMembers: [],
        fetchMessages: function () { },
    };
    return ChatWindow;
}(Component));
export default ChatWindow;
// Messages.propTypes = {
//   organizationMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
//   messageable: PropTypes.shape(PropTypes.obj).isRequired,
//   fetchMessages: PropTypes.func.isRequired,
// };
//# sourceMappingURL=ChatWindow.js.map