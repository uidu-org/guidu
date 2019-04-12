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
import moment from 'moment';
export var sortByDay = function (data) {
    return data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};
export var groupByDay = function (data) {
    return data.reduce(function (messages, message) {
        var date = moment(message.createdAt)
            .startOf('day')
            .format('L');
        if (!messages[date]) {
            messages[date] = [];
        }
        messages[date].push(message);
        return messages;
    }, {});
};
export var groupByMessager = function (data) {
    return data.reduce(function (accumulator, message, index) {
        var lastMessage = index > 0 ? accumulator[index - 1] : null;
        if (lastMessage &&
            lastMessage.messager.id === message.messager.id &&
            lastMessage.kind === message.kind
        //  &&
        // moment(message.createdAt).diff(lastMessage.createdAt, 'minutes') <= 5
        ) {
            accumulator[index - 1].messages.push(message);
        }
        else {
            accumulator.push(__assign({}, message, { messages: [message] }));
        }
        return accumulator;
    }, []);
};
//# sourceMappingURL=index.js.map