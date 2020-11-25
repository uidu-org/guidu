import axios from 'axios';

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

export const subscribeToPlan = (donation, payload) => {
  return axios
    .post('https://uidu.local:8443/create-customer', {
      payment_method_id: payload.paymentMethod.id,
      plan_id: donation.subscriptionItem.planId,
      quantity: donation.subscriptionItem.quantity,
    })
    .then((res) => res.data);
};

export const createDonation = async (model) => {
  console.log(model);
  if (model.subscriptionAttributes) {
    const quantity = model.subscriptionAttributes.itemsAttributes[0].quantity;
    const planId = model.subscriptionAttributes.itemsAttributes[0].planId;
    const amount = plans.find((plan) => plan.id === planId)?.amount * quantity;
    return {
      id: 'newly-created',
      amount,
      contact: {
        email: 'andrea.vanini@uidu.org',
      },
      subscriptionItem: {
        id: 'test-subscription-item',
        plan: {
          quantity,
          id: planId,
        },
      },
    };
  }

  const quantity = model.orderAttributes.itemsAttributes[0].quantity;
  const skuId = model.orderAttributes.itemsAttributes[0].skuId;
  const amount = skus.find((sku) => sku.id === skuId)?.price * quantity;

  return {
    id: 'newly-created',
    amount,
    orderItem: {
      id: 'test-order-item',
      sku: {
        quantity: model.orderAttributes.itemsAttributes[0].quantity,
        id: model.orderAttributes.itemsAttributes[0].skuId,
      },
    },
  };
};

export const donationCampaign = {
  name: 'The Spring',
  products: [
    {
      id: 'Z2lkOi8vdWlkdS9Qcm9kdWN0Lzk',
      stripeKind: 'service',
      skus: [],
      plans,
    },
    {
      id: 'Z2lkOi8vdWlkdS9Qcm9kdWN0LzMy',
      stripeKind: 'good',
      skus,
      plans: [],
    },
  ],
};
