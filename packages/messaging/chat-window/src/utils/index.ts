import moment from 'moment';

export const sortByDay = data =>
  data.sort(
    (a, b) =>
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      new Date(b.createdAt) - new Date(a.createdAt),
  );

export const groupByDay = data =>
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

export const groupByMessager = data =>
  data.reduce((accumulator, message, index) => {
    const lastMessage = index > 0 ? accumulator[index - 1] : null;
    if (
      lastMessage &&
      lastMessage.messager.id === message.messager.id &&
      lastMessage.kind === message.kind
      //  &&
      // moment(message.createdAt).diff(lastMessage.createdAt, 'minutes') <= 5
    ) {
      accumulator[index - 1].messages.push(message);
    } else {
      accumulator.push({ ...message, messages: [message] });
    }

    return accumulator;
  }, []);
