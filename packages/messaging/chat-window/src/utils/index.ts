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

export const groupByMessager = (data: Array<any>): Array<any> =>
  data.reduce((accumulator, message, index) => {
    const lastMessage = index > 0 ? accumulator[accumulator.length - 1] : null;
    if (
      lastMessage &&
      lastMessage.messager.id === message.messager.id &&
      lastMessage.kind === message.kind
      //  &&
      // moment(message.createdAt).diff(lastMessage.createdAt, 'minutes') <= 5
    ) {
      accumulator[accumulator.length - 1].messages.push(message);
    } else {
      accumulator.push({
        kind: message.kind,
        messager: message.messager,
        messages: [message],
      });
    }

    return accumulator;
  }, []);
