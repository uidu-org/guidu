import faker from 'faker';
import numeral from 'numeral';

export const availableColumns = [
  {
    dataField: 'uid',
    colId: 'id',
    field: 'id',
    dataFieldParams: { onItemClick: params => console.log(params) },
  },
  {
    dataField: 'cover',
    colId: 'cover',
    field: 'cover',
    headerName: 'Cover',
  },
  {
    dataField: 'avatar',
    colId: 'avatar',
    field: 'avatar',
    headerName: 'Avatar',
  },
  {
    dataField: 'contact',
    dataFieldParams: {
      avatar: data => (data ? data.avatar : null),
    },
    colId: 'member',
    primary: true,
    headerName: 'Donor',
    headerClass: 'ag-header-cell-primary-with-uid',
    field: 'member',
    pinned: 'left',
    valueGetter: props => {
      return props.data ? props.data.member.email : null;
    },
  },
  {
    dataField: 'string',
    colId: 'displayName',
    field: 'displayName',
    headerName: 'FullName',
  },
  {
    dataField: 'currency',
    colId: 'amount',
    field: 'amount',
    headerName: 'Donation amount',
    aggFunc: 'sum',
    enableValue: true,
    valueFormatter: ({ value, node, aggData, groupData, ...rest }) => {
      return numeral(value).format('$ 0,0.00');
    },
  },
  {
    dataField: 'country',
    colId: 'country',
    field: 'country',
    headerName: 'Country',
    enableRowGroup: true,
    editable: true,
  },
  {
    dataField: 'percent',
    colId: 'percent',
    field: 'percent',
    headerName: 'Percentuale',
    // valueGetter: ({ data }) => numeral(data.percent / 100).format('% 0'),
  },
  {
    dataField: 'date',
    dataFieldParams: { format: 'l' },
    colId: 'createdAt',
    field: 'createdAt',
    headerName: 'Data creazione',
    enableRowGroup: true,
    editable: true,
  },
  {
    dataField: 'date',
    dataFieldParams: { format: 'l' },
    colId: 'updatedAt',
    field: 'updatedAt',
    headerName: 'Ultimo aggiornamento',
  },
  {
    dataField: 'singleSelect',
    dataFieldParams: {
      options: [
        { id: 'male', name: 'Maschio', color: 'turquoise' },
        { id: 'female', name: 'Femmina', color: 'yellow' },
        { id: null, name: 'Unknown' },
      ],
    },
    colId: 'gender',
    field: 'gender',
    headerName: 'Genere',
    enableRowGroup: true,
    editable: true,
  },
  {
    dataField: 'string',
    colId: 'firstName',
    field: 'firstName',
    headerName: 'firstName',
  },
  {
    dataField: 'linkRecord',
    colId: 'donationCampaign',
    field: 'donationCampaign',
    headerName: 'Donation Campaign',
    enableRowGroup: true,
    keyCreator: function(params) {
      return params.value.name;
    },
  },
  // {
  //   colId: 'role',
  //   field: 'role',
  //   headerName: 'Admin',
  //   ...checkboxColumn(),
  // },
  // {
  //   colId: 'multiple-select',
  //   field: 'scope',
  //   headerName: 'Tags',
  //   ...multipleSelectColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  // },
  // {
  //   colId: 'member',
  //   field: 'member',
  //   headerName: 'Assignee',

  //   ...memberColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  //   valueGetter: ({ data: { member } }) => member.email,
  // },
  // {
  //   colId: 'address',
  //   field: 'uid',
  //   headerName: 'Indirizzo',
  //   ...addressColumn(),
  // },
  {
    dataField: 'phone',
    colId: 'phone',
    field: 'phone',
    headerName: 'Telefono',
  },
  {
    dataField: 'paymentMethod',
    dataFieldParams: {
      options: [
        {
          id: 1,
          name: 'Cash',
        },
        { id: 2, name: 'Transfer' },
        { id: 3, name: 'Credit Card' },
      ],
    },
    colId: 'paymentMethod',
    field: 'paymentMethod',
    headerName: 'Payment Method',
    enableRowGroup: true,
  },

  // {
  //   colId: 'progress',
  //   field: 'progress',
  //   headerName: 'Progress',
  //   ...progressColumn(),
  // },
  // {
  //   colId: 'files',
  //   field: 'uid',
  //   headerName: 'Files',
  //   ...attachmentsColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  // },
  // {
  //   colId: 'votes',
  //   field: 'uid',
  //   headerName: 'Voto',
  //   ...ratingColumn(),
  // },
  // {
  //   colId: 'assignee',
  //   field: 'uid',
  //   headerName: 'Assignee',
  //   ...urlColumn(),
  // },
];

export const fetchContacts = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(132).keys()).map(i => ({
          id: faker.random.uuid(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          cover:
            'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          donationCampaign: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            path: '/foo/bar',
            scope: 'donations',
          },
          amount: parseInt(faker.commerce.price(), 10),
          country: faker.address.countryCode(),
          percent: faker.random.number(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.random.number(),
          gender: ['male', 'female', null][Math.floor(Math.random() * 3)],
          role: 'admin',
          paymentMethod: Math.floor(Math.random() * 3) + 1,
          member: faker.helpers.userCard(),
          phone: faker.phone.phoneNumber(),
          progress: Math.random(),
        })),
      );
    }, 3000);
  });
};
