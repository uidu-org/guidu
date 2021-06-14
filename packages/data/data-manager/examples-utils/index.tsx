export const defaultDataViews = [
  {
    id: 0,
    name: 'Tutti i contatti',
    kind: 'table',
    fields: [
      'id',
      'member',
      'amount',
      'country',
      'paymentMethod',
      'firstName',
      'gender',
      'phone',
      'createdAt',
      'addField',
    ],
  },
  {
    id: 1,
    name: 'Bigger donations',
    kind: 'table',
    state: {
      hiddenColumns: ['cover'],
      sortBy: [{ id: 'amount', desc: true }],
      filters: [{ amount: { type: 'greaterThan', filter: 100 } }],
    },
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
    state: {
      hiddenColumns: [
        'displayName',
        'firstName',
        'country',
        'percent',
        'phone',
        'createdAt',
        'updatedAt',
        'paymentMethod',
        'custom-field-1',
      ],
      sortBy: [{ id: 'amount', desc: true }],
    },
  },
  {
    id: 3,
    name: 'Lista contatti',
    kind: 'list',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
  },
  {
    id: 17,
    name: 'Galleria contatti x3',
    preferences: { columnCount: 3 },
    kind: 'gallery',
    fields: ['member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
  },
  {
    id: 4,
    name: 'Calendario contatti',
    kind: 'calendar',
    primaryField: 'createdAt',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 5,
    name: 'Trello contatti',
    preferences: { primaryField: 'gender' },
    kind: 'board',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 6,
    name: 'Timeline',
    primaryField: 'country',
    kind: 'timeline',
    fields: ['avatar', 'member', 'amount'],
  },
];
