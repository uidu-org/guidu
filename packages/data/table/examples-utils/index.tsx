import faker from 'faker';
import numeral from 'numeral';

export const withGroupColumns = [
  {
    Header: 'Name',
    id: 'noome',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    id: 'infoo',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
  },
];

export const columnDefsNext = {
  'Users.id': {
    isPrivate: true,
  },
  'Users.firstName': {
    name: 'First name',
  },
  'Users.email': {
    cellProps: {
      avatar: ({ row }) => {
        return row.values['Users.avatar'];
      },
    },
    primary: true,
    name: 'Email',
    pinned: 'left',
    kind: 'member',
    width: 340,
  },
  'Donations.average': {
    name: 'Average donations',
    kind: 'currency',
    valueFormatter: ({ value }) => {
      return numeral(value).format('$ 0,0.00');
    },
  },
  'Donations.max': {
    name: 'Amount',
    kind: 'currency',
    valueFormatter: ({ value }) => {
      return numeral(value).format('$ 0,0.00');
    },
  },
  'Donations.amount': {
    name: 'Donations amount',
    kind: 'currency',
    valueFormatter: ({ value }) => {
      return numeral(value).format('$ 0,0.00');
    },
  },
};

export const availableColumns = [
  // {
  //   kind: 'uid',
  //   id: 'id',
  //   field: 'id',
  //   cellProps: { onItemClick: (params) => console.log(params) },
  // },
  {
    kind: 'cover',
    id: 'cover',
    field: 'cover',
    name: 'Cover',
  },
  {
    kind: 'avatar',
    id: 'avatar',
    field: 'avatar',
    name: 'Avatar',
  },
  {
    kind: 'contact',
    cellProps: {
      avatar: (data) => (data ? data.avatar : null),
    },
    id: 'member',
    accessor: (data) => data.member.email,
    primary: true,
    name: 'Donor',
    headerClass: 'ag-header-cell-primary-with-uid',
    field: 'member',
    pinned: 'left',
    valueGetter: (props) => {
      return props.data ? props.data.member.email : null;
    },
    width: 340,
  },
  {
    kind: 'string',
    id: 'displayName',
    field: 'displayName',
    name: 'FullName',
  },
  {
    kind: 'currency',
    id: 'amount',
    field: 'amount',
    name: 'Donation amount',
    aggFunc: 'sum',
    valueFormatter: ({ value, node, aggData, groupData, ...rest }) => {
      return numeral(value).format('$ 0,0.00');
    },
  },
  {
    kind: 'country',
    id: 'country',
    field: 'country',
    name: 'Country',
    canGroupBy: true,
    editable: true,
  },
  {
    kind: 'percent',
    id: 'percent',
    field: 'percent',
    name: 'Percentuale',
    valueGetter: ({ value }) => numeral(value / 100).format('% 0'),
  },
  {
    kind: 'date',
    cellProps: { format: 'l' },
    id: 'createdAt',
    field: 'createdAt',
    name: 'Data creazione',
    canGroupBy: true,
    editable: true,
  },
  {
    kind: 'date',
    cellProps: { format: 'l' },
    id: 'updatedAt',
    field: 'updatedAt',
    name: 'Ultimo aggiornamento',
  },
  {
    kind: 'singleSelect',
    cellProps: {
      options: [
        { id: 'male', name: 'Maschio', color: 'turquoise' },
        { id: 'female', name: 'Femmina', color: 'yellow' },
        { id: null, name: 'Unknown' },
      ],
    },
    id: 'gender',
    field: 'gender',
    name: 'Genere',
    canGroupBy: true,
    editable: true,
    filter: 'exact',
  },
  {
    kind: 'string',
    id: 'firstName',
    field: 'firstName',
    name: 'firstName',
  },
  {
    kind: 'string',
    id: 'donationCampaign',
    field: 'donationCampaign',
    name: 'Donation Campaign',
    canGroupBy: true,
    accessor: (data) => data.donationCampaign.name,
  },
  // {
  //   id: 'role',
  //   field: 'role',
  //   name: 'Admin',
  //   ...checkboxColumn(),
  // },
  // {
  //   id: 'multiple-select',
  //   field: 'scope',
  //   name: 'Tags',
  //   ...multipleSelectColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  // },
  // {
  //   id: 'member',
  //   field: 'member',
  //   name: 'Assignee',

  //   ...memberColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  //   valueGetter: ({ data: { member } }) => member.email,
  // },
  // {
  //   id: 'address',
  //   field: 'uid',
  //   name: 'Indirizzo',
  //   ...addressColumn(),
  // },
  {
    kind: 'phone',
    id: 'phone',
    field: 'phone',
    name: 'Telefono',
  },
  {
    kind: 'text',
    id: 'text',
    field: 'text',
    name: 'Long text',
  },
  {
    kind: 'paymentMethod',
    cellProps: {
      options: [
        {
          id: 1,
          name: 'Cash',
        },
        { id: 2, name: 'Transfer' },
        { id: 3, name: 'Credit Card' },
      ],
    },
    id: 'paymentMethod',
    field: 'paymentMethod',
    name: 'Payment Method',
    canGroupBy: true,
  },

  // {
  //   id: 'progress',
  //   field: 'progress',
  //   name: 'Progress',
  //   ...progressColumn(),
  // },
  // {
  //   id: 'files',
  //   field: 'uid',
  //   name: 'Files',
  //   ...attachmentsColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
  // },
  // {
  //   id: 'votes',
  //   field: 'uid',
  //   name: 'Voto',
  //   ...ratingColumn(),
  // },
  // {
  //   id: 'assignee',
  //   field: 'uid',
  //   name: 'Assignee',
  //   ...urlColumn(),
  // },
];

export const fetchContacts = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(100).keys()).map((i) => ({
          id: faker.datatype.uuid(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          cover: faker.image.imageUrl(),
          donationCampaign: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            path: '/foo/bar',
            scope: 'donations',
          },
          text: faker.lorem.paragraphs(),
          amount: parseInt(faker.commerce.price(), 10),
          country: faker.address.countryCode(),
          percent: faker.datatype.number(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: `${faker.date.recent().toISOString()}`,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.datatype.number(),
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
