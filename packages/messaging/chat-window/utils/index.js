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
        var lastMessage = index > 0 ? accumulator[accumulator.length - 1] : null;
        if (lastMessage &&
            lastMessage.messager.id === message.messager.id &&
            lastMessage.kind === message.kind
        //  &&
        // moment(message.createdAt).diff(lastMessage.createdAt, 'minutes') <= 5
        ) {
            accumulator[accumulator.length - 1].messages.push(message);
        }
        else {
            accumulator.push({
                kind: message.kind,
                messager: message.messager,
                messages: [message],
            });
        }
        return accumulator;
    }, []);
};
//# sourceMappingURL=index.js.map