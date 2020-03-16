export const calculateTotals = cart =>
  Object.keys(cart).reduce(
    (result, cartKey) => {
      const item = cart[cartKey];
      result.amount += item.ticket.price * item.count;
      result.total += item.count;
      return result;
    },
    {
      total: 0,
      amount: 0,
    },
  );
