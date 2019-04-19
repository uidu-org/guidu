import moment from 'moment';

export const sortByDay = (data: Array<any>): Array<any> =>
  data.sort(
    (a, b) =>
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

export const groupByDay = (data: Array<any>): Object =>
  data.reduce((messages, message) => {
    const date = moment(message.createdAt)
      .startOf('day')
      .format('L');
    if (!messages[date]) {
      messages[date] = [];
    }
    messages[date].push(message);
    return messages;
  }, {});

export const groupByMessager = (
  data: Array<any>,
  betweenMinutes: number,
): Array<any> =>
  data.reduce((accumulator, message, index) => {
    const lastMessage = index > 0 ? accumulator[accumulator.length - 1] : null;
    if (
      lastMessage &&
      lastMessage.messager.id === message.messager.id &&
      lastMessage.kind === message.kind &&
      moment(lastMessage.createdAt).diff(message.createdAt, 'minutes') <=
        betweenMinutes
    ) {
      // Group with previous
      accumulator[accumulator.length - 1].messages.push(message);
    } else {
      // New line
      accumulator.push({
        kind: message.kind,
        messager: message.messager,
        createdAt: message.createdAt,
        messages: [message],
      });
    }

    return accumulator;
  }, []);
