import { faker } from '@faker-js/faker';
import { ColumnDef, Row } from '@tanstack/react-table';
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

export const columnDefsNext: Record<string, ColumnDef<unknown>> = {
  'Users.id': {
    id: 'Users.id',
    meta: {
      kind: 'string',
      isPrivate: true,
    },
  },
  'Users.firstName': {
    id: 'Users.firstName',
    meta: {
      kind: 'string',
      name: 'First name',
    },
  },
  'Users.avatar': {
    id: 'Users.avatar',
    meta: {
      isPrivate: true,
    },
  },
  'Users.email': {
    id: 'Users.email',
    meta: {
      avatar: ({ row }: { row: Row<unknown> }) => {
        if (!row._valuesCache['Users.avatar']) {
          return '';
        }
        return `https://uidu.local:8443/uploads/${row._valuesCache['Users.avatar']}`;
      },
      isPrimary: true,
      name: 'Email',
      pinned: 'left',
      kind: 'contact',
    },
    size: 340,
  },
  'Donations.average': {
    id: 'Donations.average',
    meta: {
      name: 'Average donations',
      kind: 'currency',
      valueFormatter: (value) => {
        return numeral(value).format('$ 0,0.00');
      },
    },
  },
  'Donations.max': {
    id: 'Donations.max',
    meta: {
      name: 'Amount',
      kind: 'currency',
      valueFormatter: (value) => {
        return numeral(value).format('$ 0,0.00');
      },
    },
  },
  'Donations.amount': {
    id: 'Donations.amount',
    meta: {
      name: 'Donations amount',
      kind: 'currency',
      valueFormatter: (value) => {
        return numeral(value).format('$ 0,0.00');
      },
    },
  },
};

export const availableColumns: ColumnDef<unknown>[] = [
  // {
  //   kind: 'uid',
  //   id: 'id',
  //   field: 'id',
  //   cellProps: { onItemClick: (params) => console.log(params) },
  // },
  {
    accessorKey: 'cover',
    meta: {
      kind: 'cover',
      name: 'Cover',
    },
  },
  {
    accessorKey: 'avatar',
    meta: {
      kind: 'avatar',
      id: 'avatar',
      name: 'Avatar',
    },
  },
  {
    meta: {
      kind: 'contact',
      avatar: ({ row }) => {
        return row.original.avatar;
      },
      isPrimary: true,
      name: 'Donor',
      pinned: 'left',
      valueGetter: (props) => {
        return props.data ? props.data.member.email : null;
      },
    },
    id: 'member',
    accessorFn: (data) => data.member.email,
    size: 340,
  },
  {
    id: 'displayName',
    meta: {
      kind: 'string',
      name: 'FullName',
    },
    accessorKey: 'displayName',
  },
  {
    id: 'amount',
    meta: {
      name: 'Donation amount',
      kind: 'currency',
      aggFunc: 'sum',
      valueFormatter: (value) => {
        return numeral(value).format('$ 0,0.00');
      },
    },
    accessorKey: 'amount',
  },
  {
    id: 'country',
    meta: {
      kind: 'country',
      name: 'Country',
      enableEditing: true,
    },
    accessorKey: 'country',
    enableGrouping: true,
  },
  {
    meta: {
      kind: 'percent',
      name: 'Percentuale',
      valueFormatter: (value: number) => numeral(value / 100).format('% 0'),
    },
    id: 'percent',
    accessorKey: 'percent',
  },
  {
    id: 'createdAt',
    meta: {
      kind: 'date',
      name: 'Data creazione',
      enableEditing: true,
    },
    accessorKey: 'createdAt',
    enableGrouping: true,
  },
  {
    meta: {
      kind: 'date',
      name: 'Ultimo aggiornamento',
    },
    id: 'updatedAt',
    accessorKey: 'updatedAt',
  },
  {
    id: 'gender',
    meta: {
      kind: 'singleSelect',
      options: [
        { id: 'male', name: 'Maschio', color: 'turquoise' },
        { id: 'female', name: 'Femmina', color: 'yellow' },
        { id: null, name: 'Unknown' },
      ],
      name: 'Genere',
      enableEditing: true,
    },
    accessorKey: 'gender',
    enableGrouping: true,
    filter: 'exact',
  },
  {
    meta: { kind: 'string', name: 'firstName' },
    id: 'firstName',
    accessorKey: 'firstName',
  },
  {
    meta: {
      kind: 'rating',
      name: 'Rating',
      enableEditing: true,
    },
    id: 'rating',
    accessorKey: 'rating',
    enableGrouping: true,
  },
  {
    meta: {
      kind: 'string',
      name: 'Donation Campaign',
    },
    id: 'donationCampaign',
    accessorKey: 'donationCampaign',

    enableGrouping: true,
    accessorFn: (data) => data.donationCampaign.name,
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
    meta: {
      kind: 'phone',
      name: 'Telefono',
    },
    id: 'phone',
    accessorKey: 'phone',
  },
  {
    meta: {
      kind: 'text',
      name: 'Long text',
    },
    id: 'text',
    accessorKey: 'text',
  },
  {
    meta: {
      kind: 'paymentMethod',
      options: [
        {
          id: 1,
          name: 'Cash',
        },
        { id: 2, name: 'Transfer' },
        { id: 3, name: 'Credit Card' },
      ],
      name: 'Payment Method',
    },

    id: 'paymentMethod',
    accessorKey: 'paymentMethod',
    enableGrouping: true,
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
          avatar: `https://i.pravatar.cc/150?img=${i}`,
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
          rating: faker.datatype.number({
            min: 1,
            max: 5,
          }),
          percent: faker.datatype.number(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: `${faker.date.recent().toISOString()}`,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.datatype.number(),
          gender: ['male', 'female', null][Math.floor(Math.random() * 3)],
          role: 'admin',
          paymentMethod: Math.floor(Math.random() * 3) + 1,
          member: {
            avatar: faker.image.avatar(),
            name: faker.name.findName(),
            email: faker.internet.email(),
          },
          phone: faker.phone.number(),
          progress: Math.random(),
        })),
      );
    }, 300);
  });
};
