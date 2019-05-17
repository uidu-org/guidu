import { checkboxColumn, dateColumn, numberColumn, singleSelectColumn, textColumn } from '../src';

export const availableColumns = [
  {
    colId: 'id',
    field: 'id',
    headerName: '',
    pinned: true,
    lockVisible: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 80,
    suppressMenu: true,
  },
  {
    colId: 'email',
    field: 'email',
    headerName: 'Email',
    ...textColumn(),
    pinned: true,
    lockVisible: true,
  },
  {
    colId: 'displayName',
    field: 'displayName',
    headerName: 'FullName',
    ...textColumn()
  },
  {
    colId: 'createdAt',
    field: 'createdAt',
    headerName: 'Data creazione',
    ...dateColumn()
  },
  {
    colId: 'updatedAt',
    field: 'updatedAt',
    headerName: 'Ultimo aggiornamento',
    ...dateColumn()
  },
  {
    colId: 'firstName',
    field: 'firstName',
    headerName: 'firstName',
    ...textColumn()
  },
  {
    colId: 'lastName',
    field: 'lastName',
    headerName: 'lastName',
    ...textColumn()
  },
  {
    colId: 'age',
    field: 'age',
    headerName: 'Età',
    ...numberColumn()
  },
  {
    colId: 'gender',
    field: 'gender',
    headerName: 'Genere',
    ...singleSelectColumn({ options: [{ id: 'male', name: 'Maschio' }, { id: 'female', name: 'Femmina' }] })
  },
  {
    colId: 'role',
    field: 'role',
    headerName: 'Admin',
    ...checkboxColumn()
  },
];

export const fetchContacts = () => {
  return fetch(
    'https://uidufundraising.uidu.local:8443/dashboard/apps/contacts.json',
  )
    .then(result => result.json())
    .then(rowData => rowData)
}
