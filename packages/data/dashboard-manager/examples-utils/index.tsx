import { colors } from '@uidu/dashlets';
import React from 'react';
import { UserCheck } from 'react-feather';
import 'twin.macro';

export const dashlets = [
  {
    kind: 'InlineComponent',
    query: {
      measures: ['Contacts.count'],
      timeDimensions: [
        {
          dimension: 'Contacts.createdAt',
          granularity: 'month',
          // dateRange: 'This year',
        },
      ],
      filters: [],
    },
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 10,
    },
    component: (props) => {
      console.log(props);
      return <div>Custom</div>;
    },
  },
  {
    kind: 'XY',
    label: 'Raccolta With GQL',
    description: 'Donations amount by time',
    gql: {
      operation: 'currentWorkspace',
      fields: ['id', { plans: ['id', 'name', 'createdAt'] }],
    },
    dataTransformer: (data) => {
      return {
        values: data.currentWorkspace.plans.map((plan) => ({
          x: plan.createdAt,
          y: 1,
        })),
      };
    },
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 10,
    },
    config: {
      series: [
        {
          type: 'ColumnSeries',
          dataFields: {
            valueY: 'y',
            dateX: 'x',
          },
          columns: {
            width: '30%',
            column: { cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 },
          },

          // fillOpacity: 0.1,
          // fill: {
          //   type: 'LinearGradient',
          //   stops: [
          //     {
          //       color: '#6366F1',
          //     },
          //     {
          //       color: '#A5B4FC',
          //     },
          //   ],
          // },
          name: 'Total amount donations received',
        },
      ],
      // colors: {
      //   list: colors,
      // },
    },
    // isCard: false,
  },
  {
    kind: 'XY',
    label: 'Raccolta',
    description: 'Donations amount by time',
    query: {
      measures: ['Contacts.count'],
      timeDimensions: [
        {
          dimension: 'Contacts.createdAt',
          granularity: 'month',
          // dateRange: 'This year',
        },
      ],
      filters: [],
    },
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 10,
    },
    // data: {
    //   values: [
    //     {
    //       x: '2017-01-01T00:00:00.000',
    //       'Contacts.count': 88,
    //     },
    //     {
    //       x: '2018-01-01T00:00:00.000',
    //       'Contacts.count': 48,
    //     },
    //     {
    //       x: '2019-01-01T00:00:00.000',
    //       'Contacts.count': 77,
    //     },
    //     {
    //       x: '2020-01-01T00:00:00.000',
    //       'Contacts.count': 126,
    //     },
    //     {
    //       x: '2021-01-01T00:00:00.000',
    //       'Contacts.count': 59,
    //     },
    //   ],
    // },
    config: {
      series: [
        {
          type: 'ColumnSeries',
          dataFields: {
            valueY: 'Contacts.count',
            dateX: 'x',
          },
          columns: {
            width: '30%',
            column: { cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 },
          },

          // fillOpacity: 0.1,
          // fill: {
          //   type: 'LinearGradient',
          //   stops: [
          //     {
          //       color: '#6366F1',
          //     },
          //     {
          //       color: '#A5B4FC',
          //     },
          //   ],
          // },
          name: 'Total amount donations received',
        },
      ],
      // colors: {
      //   list: colors,
      // },
    },
    // isCard: false,
  },
  {
    kind: 'XY',
    label: 'Raccolta',
    description: 'Donations amount by time',
    query: {
      measures: ['Donations.totalAmount', 'Donations.count'],
      timeDimensions: [
        {
          dimension: 'Donations.createdAt',
          granularity: 'month',
          // dateRange: 'This year',
        },
      ],
      filters: [],
    },
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 10,
    },
    config: {
      series: [
        {
          type: 'ColumnSeries',
          dataFields: {
            valueY: 'Donations.totalAmount',
            dateX: 'x',
          },
          name: 'Total amount donations received',
        },
        {
          type: 'ColumnSeries',
          dataFields: {
            valueY: 'Donations.count',
            dateX: 'x',
          },
          name: 'Total donations received',
        },
      ],
      // colors: {
      //   list: colors,
      // },
    },
    // isCard: false,
  },
  {
    kind: 'XY',
    label: 'Raccolta',
    query: {
      measures: ['Donations.count'],
      timeDimensions: [
        {
          dimension: 'Donations.createdAt',
          granularity: 'month',
        },
      ],
      filters: [],
    },
    color: colors[1],
    layout: {
      x: 0,
      y: 4,
      w: 12,
      h: 10,
    },
    // isCard: false,
  },
  {
    kind: 'HorizontalRule',
    layout: {
      x: 0,
      w: 12,
      h: 1,
      y: 4,
    },
  },
  {
    kind: 'Counter',
    label: 'counter',
    layout: {
      x: 0,
      y: 2,
      w: 4,
      h: 2.5,
    },
    query: {
      measures: ['DonationCampaigns.count'],
      timeDimensions: [
        {
          dimension: 'DonationCampaigns.createdAt',
        },
      ],
      filters: [],
    },
    data: {
      value: 32,
    },
  },
  {
    kind: 'Counter',
    // itemBefore: <UserCheck tw="h-6 w-6 text-white" />,
    label: 'counter',
    layout: { x: 4, y: 2, w: 4, h: 2.5 },
    query: {
      measures: ['Donations.count'],
      timeDimensions: [
        {
          dimension: 'Donations.createdAt',
        },
      ],
      filters: [],
    },
  },
  {
    kind: 'Counter',
    label: 'counter',
    layout: { x: 8, y: 2, w: 4, h: 2.5 },
    query: {
      measures: ['DonationCampaigns.count'],
      timeDimensions: [
        {
          dimension: 'DonationCampaigns.createdAt',
        },
      ],
      filters: [],
    },
  },
  {
    label: 'Ma dove',
    kind: 'XY',
    query: {
      measures: ['Donations.totalAmount'],
      timeDimensions: [
        {
          dimension: 'Donations.createdAt',
          granularity: 'year',
          // dateRange: 'Last year',
        },
      ],
    },
    // config: {
    //   legend: {
    //     position: 'right',
    //     disabled: false,
    //     fillOpacity: 0.3,
    //     fontSize: 14,
    //     type: 'Legend',
    //   },
    // },
    layout: { x: 0, y: 4, w: 8, h: 8 },
  },
  {
    kind: 'Pie',
    label: 'Metodo di pagamento',
    query: {
      dimensions: ['Contacts.email'],
      timeDimensions: [
        {
          dimension: 'Contacts.createdAt',
        },
      ],
      measures: ['Contacts.count'],
      filters: [],
    },
    layout: { x: 0, y: 4, w: 8, h: 8 },
    dataFormatter: (data) => {
      return data.map((item) => {
        return {
          ...item,
          x: item.x + ' (' + item.y + ')',
        };
      });
    },
    config: {
      legend: {
        position: 'right',
        disabled: false,
        fillOpacity: 0.3,
        fontSize: 14,
        type: 'Legend',
      },
    },
  },
  {
    kind: 'DashletGroup',
    layout: { x: 8, y: 4, w: 4, h: 8 },
    dashlets: [
      {
        kind: 'Counter',
        label: 'counter',
        layout: { x: 0, y: 2, w: 4, h: 4 },
        rollup: ['sum', 'amount'],
        formatter: 'currency',
      },
      {
        kind: 'Counter',
        itemBefore: <UserCheck />,
        label: 'counter',
        layout: { x: 4, y: 2, w: 4, h: 4 },
        rollup: ['count', 'id'],
        formatter: 'integer',
      },
      {
        kind: 'Counter',
        namespace: 'donations',
        label: 'counter',
        layout: { x: 8, y: 2, w: 4, h: 4 },
        rollup: ['count', 'contact.id'],
        formatter: 'integer',
      },
    ],
  },
  {
    label: 'Top donations',
    kind: 'List',
    layout: { x: 0, y: 4, w: 6, h: 10 },
    query: {
      dimensions: [
        'Users.email',
        'Users.createdAt',
        'Users.id',
        'Users.avatar',
        'Users.firstName',
        'Users.lastName',
      ],
      filters: [],
      order: {
        'Users.createdAt': 'desc',
      },
      segments: ['Users.people'],
      limit: 10,
    },
    onItemClick: (row) => console.log(row),
    data: {
      keys: [
        { key: 'Users.id', title: 'id' },
        { key: 'Users.email', title: 'email' },
        { key: 'Users.createdAt', title: 'createdAt' },
        { key: 'Users.firstName', title: 'first name' },
      ],
      values: [
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
        {
          'Users.email': 'test12',
          'Users.createdAt': new Date().toISOString(),
          'Users.firstName': 'Andrea',
        },
      ],
    },
  },
  {
    label: 'Average donations',
    kind: 'List',
    layout: { x: 0, y: 4, w: 6, h: 4 },
    query: {
      dimensions: ['DonationCampaigns.name'],
      measures: ['Donations.average'],
      filters: [],
      limit: 10,
    },
  },
  {
    kind: 'Radar',
    query: {
      dimensions: ['Donations.paymentMethod'],
      timeDimensions: [
        {
          dimension: 'Donations.createdAt',
        },
      ],
      measures: ['Donations.count'],
      filters: [],
    },
    layout: { x: 0, y: 5, w: 12, h: 3 },
  },
  {
    kind: 'Funnel',
    namespace: 'donations',
    layout: { x: 0, y: 5, w: 12, h: 3 },
  },
  {
    kind: 'Geo',
    namespace: 'donations',
    layout: { x: 0, y: 5, w: 12, h: 3 },
    rollup: ['count', 'id'],
  },
  {
    kind: 'Treemap',
    namespace: 'donations',
    layout: { x: 0, y: 5, w: 12, h: 3 },
    label: 'Payment methods',
    groupBy: 'paymentMethod',
    rollup: ['count', 'id'],
  },
];
