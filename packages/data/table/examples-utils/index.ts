import {
  addressColumn,
  attachmentsColumn,
  checkboxColumn,
  coverColumn,
  currencyColumn,
  dateColumn,
  defaultColumn,
  emailColumn,
  memberColumn,
  multipleSelectColumn,
  numberColumn,
  percentColumn,
  phoneColumn,
  primaryColumn,
  ratingColumn,
  singleSelectColumn,
  stringColumn,
  textColumn,
  uidColumn,
  urlColumn,
} from '../src';

export const availableColumns = [
  {
    colId: 'id',
    field: 'id',
    ...uidColumn(),
  },
  {
    colId: 'email',
    field: 'email',
    headerName: 'Cover',
    ...defaultColumn(),
    ...coverColumn(),
    valueGetter: ({ data }) =>
      'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    colId: 'email',
    field: 'email',
    headerName: 'Email',
    ...defaultColumn(),
    ...emailColumn(),
    ...primaryColumn(),
    minWidth: 300,
  },
  {
    colId: 'displayName',
    field: 'displayName',
    headerName: 'FullName',
    ...defaultColumn(),
    ...textColumn(),
  },
  {
    colId: 'createdAt',
    field: 'createdAt',
    headerName: 'Data creazione',
    ...defaultColumn(),
    ...dateColumn(),
  },
  {
    colId: 'updatedAt',
    field: 'updatedAt',
    headerName: 'Ultimo aggiornamento',
    ...defaultColumn(),
    ...dateColumn(),
  },
  {
    colId: 'firstName',
    field: 'firstName',
    headerName: 'firstName',
    ...defaultColumn(),
    ...stringColumn(),
  },
  {
    colId: 'lastName',
    field: 'lastName',
    headerName: 'lastName',
    ...defaultColumn(),
    ...stringColumn(),
  },
  {
    colId: 'age',
    field: 'age',
    headerName: 'Età',
    ...defaultColumn(),
    ...numberColumn(),
  },
  {
    colId: 'gender',
    field: 'gender',
    headerName: 'Genere',
    ...defaultColumn(),
    ...singleSelectColumn({
      options: [
        { id: 'male', name: 'Maschio' },
        { id: 'female', name: 'Femmina' },
      ],
    }),
  },
  {
    colId: 'role',
    field: 'role',
    headerName: 'Admin',
    ...defaultColumn(),
    ...checkboxColumn(),
  },
  {
    colId: 'multiple-select',
    field: 'scope',
    headerName: 'Tags',
    ...defaultColumn(),
    ...multipleSelectColumn({
      options: [
        { id: 'male', name: 'Maschio' },
        { id: 'female', name: 'Femmina' },
      ],
    }),
  },
  {
    colId: 'member',
    field: 'member',
    headerName: 'Assignee',
    ...defaultColumn(),
    ...memberColumn({
      options: [
        { id: 'male', name: 'Maschio' },
        { id: 'female', name: 'Femmina' },
      ],
    }),
  },
  {
    colId: 'address',
    field: 'uid',
    headerName: 'Indirizzo',
    ...defaultColumn(),
    ...addressColumn(),
  },
  {
    colId: 'phone',
    field: 'phone',
    headerName: 'Telefono',
    ...defaultColumn(),
    ...phoneColumn(),
  },
  {
    colId: 'files',
    field: 'uid',
    headerName: 'Files',
    ...defaultColumn(),
    ...attachmentsColumn({
      options: [
        { id: 'male', name: 'Maschio' },
        { id: 'female', name: 'Femmina' },
      ],
    }),
  },
  {
    colId: 'value',
    field: 'uid',
    headerName: 'Valore',
    ...defaultColumn(),
    ...currencyColumn(),
  },
  {
    colId: 'percent',
    field: 'uid',
    headerName: 'Percentuale',
    ...defaultColumn(),
    ...percentColumn(),
  },
  {
    colId: 'votes',
    field: 'uid',
    headerName: 'Voto',
    ...defaultColumn(),
    ...ratingColumn(),
  },
  {
    colId: 'assignee',
    field: 'uid',
    headerName: 'Assignee',
    ...defaultColumn(),
    ...urlColumn(),
  },
];

export const fetchContacts = () => {
  return fetch(
    'https://uidufundraising.uidu.local:8443/dashboard/apps/contacts.json',
  )
    .then(result => result.json())
    .then(rowData => rowData);
};
