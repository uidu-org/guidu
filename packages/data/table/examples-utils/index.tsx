import faker from 'faker';
import numeral from 'numeral';

export const availableColumns = [
  {
    dataField: 'uid',
    colId: 'id',
    field: 'id',
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
  },
  {
    dataField: 'member',
    dataFieldParams: { avatar: data => data.avatar },
    colId: 'member',
    primary: true,
    headerName: 'Donor',
    valueGetter: ({ data }) => {
      return data.member.email;
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
    valueGetter: ({ data }) => numeral(data.amount).format('$ 0,0.00'),
  },
  // {
  //   colId: 'value',
  //   field: 'value',
  //   headerName: 'Valore',
  //   ...defaultColumn(),
  //   ...currencyColumn(),
  //   valueFormatter: ({ value }) => `€ ${value}`,
  // },
  {
    dataField: 'percent',
    colId: 'percent',
    headerName: 'Percentuale',
    valueGetter: ({ data }) => numeral(data.percent / 100).format('% 0'),
  },
  {
    dataField: 'date',
    colId: 'createdAt',
    field: 'createdAt',
    headerName: 'Data creazione',
  },
  {
    dataField: 'date',
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
        { id: null, name: 'Unknown', },
      ],
    },
    colId: 'gender',
    field: 'gender',
    headerName: 'Genere',
  },
  {
    dataField: 'string',
    colId: 'firstName',
    field: 'firstName',
    headerName: 'firstName',
  },
  // {
  //   colId: 'lastName',
  //   field: 'lastName',
  //   headerName: 'lastName',
  //   ...defaultColumn(),
  //   ...stringColumn(),
  // },
  // {
  //   colId: 'age',
  //   field: 'age',
  //   headerName: 'Età',
  //   ...defaultColumn(),
  //   ...numberColumn(),
  // },
  // {
  //   colId: 'role',
  //   field: 'role',
  //   headerName: 'Admin',
  //   ...defaultColumn(),
  //   ...checkboxColumn(),
  // },
  // {
  //   colId: 'multiple-select',
  //   field: 'scope',
  //   headerName: 'Tags',
  //   ...defaultColumn(),
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

  //   ...defaultColumn(),
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
  //   ...defaultColumn(),
  //   ...addressColumn(),
  // },
  {
    dataField: 'phone',
    colId: 'phone',
    field: 'phone',
    headerName: 'Telefono',
  },
  // {
  //   colId: 'progress',
  //   field: 'progress',
  //   headerName: 'Progress',
  //   ...defaultColumn(),
  //   ...progressColumn(),
  // },
  // {
  //   colId: 'files',
  //   field: 'uid',
  //   headerName: 'Files',
  //   ...defaultColumn(),
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
  //   ...defaultColumn(),
  //   ...ratingColumn(),
  // },
  // {
  //   colId: 'assignee',
  //   field: 'uid',
  //   headerName: 'Assignee',
  //   ...defaultColumn(),
  //   ...urlColumn(),
  // },
];

export const fetchContacts = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(100).keys()).map(i => ({
          id: faker.random.uuid(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          cover:
            'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          amount: faker.commerce.price(),
          percent: faker.random.number(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.random.number(),
          gender: ['male', 'female', null][Math.floor(Math.random() * 3)],
          role: 'admin',
          member: faker.helpers.userCard(),
          phone: faker.phone.phoneNumber(),
          progress: Math.random(),
        })),
      );
    }, 3000);
  });
};
