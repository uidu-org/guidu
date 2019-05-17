import { checkboxColumn, dateColumn, numberColumn, singleSelectColumn } from '../src/components/columns';

export const availableColumns = [
  {
    colId: 'email',
    field: 'email',
    headerName: 'Email',
    filter: 'TextFilter',
    pinned: true,
    lockVisible: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    colId: 'displayName',
    field: 'displayName',
    headerName: 'FullName',
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
  },
  {
    colId: 'lastName',
    field: 'lastName',
    headerName: 'lastName',
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
