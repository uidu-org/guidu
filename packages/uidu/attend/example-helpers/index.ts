const plans = [
  {
    id: 'Z2lkOi8vdWlkdS9QbGFuLzE2',
    name: 'Custom plan',
    interval: 'month',
    description: null,
    amount: 1,
    currency: '€',
  },
  {
    id: 'Z2lkOi8vdWlkdS9QbGFuLzI3',
    name: 'Bronze',
    interval: 'month',
    description: 'This allow us to purchase school materials for 1 kid ',
    amount: 1000,
    currency: '€',
  },
  {
    id: 'Z2lkOi8vdWlkdS9QbGFuLzI4',
    name: 'Silver',
    interval: 'month',
    description: 'With silver support you help 2 kids\n',
    amount: 2000,
    currency: '€',
  },
];

const skus = [
  {
    id: 'Z2lkOi8vdWlkdS9Ta3UvMjQ',
    price: 1,
    stripeAttributes: {
      name: 'Custom donation',
    },
    currency: '€',
  },
  {
    id: 'Z2lkOi8vdWlkdS9Ta3UvMjU',
    price: 1000,
    stripeAttributes: {
      name: 'One-time bronze',
    },
    currency: '€',
  },
];

export const updateOrder = async (order, model) => {
  const items = model.items.filter(
    (item) => item.quantity && item.quantity > 0,
  );
  console.log(model);
  return {
    ...order,
    attendances: items.reduce((res, item) => {
      Array.from(Array(item.quantity).keys()).map(() => {
        res.push({ sku: item });
      });
      return res;
    }, []),
    stripeAmount: items.reduce((res, item) => {
      console.log(item);
      res += item.price * item.quantity;
      return res;
    }, 0),
  };
  // attendances: model.items
  //           .filter((item) => item.quantity && item.quantity > 0)
  //           .reduce((res, item) => {
  //             res.push({ sku: item });
  //             return res;
  //           }, []),
  //         stripeAmount: 1200, // should be set by back-end
  if (model.subscriptionAttributes) {
    const quantity = model.subscriptionAttributes.itemsAttributes[0].quantity;
    const planId = model.subscriptionAttributes.itemsAttributes[0].planId;
    const amount = plans.find((plan) => plan.id === planId)?.amount * quantity;
    return {
      ...order,
      amount,
      contact: {
        id: 'ref',
      },
      subscriptionItem: {
        id: 'test-subscription-item',
        plan: {
          quantity,
          id: planId,
        },
      },
    };
  } else if (model.orderAttributes) {
    const quantity = model.orderAttributes.itemsAttributes[0].quantity;
    const skuId = model.orderAttributes.itemsAttributes[0].skuId;
    const amount = skus.find((sku) => sku.id === skuId)?.price * quantity;

    return {
      ...order,
      amount,
      orderItem: {
        id: 'test-order-item',
        sku: {
          quantity: model.orderAttributes.itemsAttributes[0].quantity,
          id: model.orderAttributes.itemsAttributes[0].skuId,
        },
      },
    };
  }
  return {
    ...order,
    ...model,
  };
};

export const createOrder = async (model) => {
  return {
    id: 'new',
    contact: {
      id: 'foo',
    },
    event: {
      name: 'text',
    },
  };
};

const tickets = [
  {
    id: '123',
    stripeId: '123',
    name: 'Free',
    price: 0,
    inventoryQuantity: 100,
  },
  {
    name: 'Backstage',
    id: '123-backstage',
    stripeId: '123-backstage',
    price: 1000,
    inventoryQuantity: 20,
  },
  {
    name: 'Premium',
    id: '123-premium',
    stripeId: '123-premium',
    price: 3500,
    inventoryQuantity: 20,
  },
];

export const event = {
  name: 'Pitch your failure - Berlin',
  location: { address: 'Berlin' },
  beginsAt: '06/17/2019',
  beginTime: '12:00',
  finishesAt: '06/18/2019',
  endTime: '12:00',
  tickets,
};
