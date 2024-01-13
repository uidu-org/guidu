import { faker } from '@faker-js/faker';
import { ColumnDef, Row } from '@tanstack/react-table';
import numeral from 'numeral';
import { HeaderSelection, RowSelection } from '../src';

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
  {
    accessorKey: 'id',
    id: 'id',
    meta: {
      pinned: 'left',
      cellProps: {
        style: {
          padding: 0,
        },
      },
    },
    cell: RowSelection,
    header: HeaderSelection,
    maxSize: 56,
    size: 56,
  },
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
    footer: (params) => {
      console.log(params);
      return <div>Footer</div>;
    },
    size: 340,
  },
  {
    id: 'displayName',
    meta: {
      kind: 'string',
      name: 'FullName',
    },
    accessorKey: 'displayName',
    footer: (params) => {
      console.log(params);
      return <div>Footer</div>;
    },
  },
  {
    id: 'amount.cu',
    meta: {
      name: 'Donation amount',
      kind: 'currency',
      aggFunc: 'sum',
      valueFormatter: (value) => {
        return numeral(value).format('$ 0,0.00');
      },
    },
    footer: (params) => {
      console.log(params);
      return <div>Footer</div>;
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
      kind: 'datetime',
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

export const fetchContacts = (timeout = 300) => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(100).keys()).map((i) => ({
          id: faker.string.uuid(),
          avatar: `https://i.pravatar.cc/150?img=${i}`,
          email: faker.internet.email(),
          displayName: faker.person.fullName(),
          cover: faker.image.url(),
          donationCampaign: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            path: '/foo/bar',
            scope: 'donations',
          },
          text: faker.lorem.paragraphs(),
          amount: parseInt(faker.commerce.price(), 10),
          country: faker.location.countryCode(),
          rating: faker.number.int({
            min: 1,
            max: 5,
          }),
          percent: faker.number.int(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: `${faker.date.recent().toISOString()}`,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          age: faker.number.int(),
          gender: ['male', 'female', null][Math.floor(Math.random() * 3)],
          role: 'admin',
          paymentMethod: Math.floor(Math.random() * 3) + 1,
          member: {
            avatar: faker.image.avatar(),
            name: faker.name.fullName(),
            email: faker.internet.email(),
          },
          phone: faker.phone.number(),
          progress: Math.random(),
        })),
      );
    }, timeout);
  });
};
