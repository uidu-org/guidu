import faker from 'faker';
import numeral from 'numeral';
import React from 'react';
import {
  coverColumn,
  currencyColumn,
  dateColumn,
  defaultColumn,
  memberColumn,
  percentColumn,
  primaryColumn,
  stringColumn,
  textColumn,
  uidColumn,
} from '../src';

export const availableColumns = [
  {
    colId: 'id',
    field: 'id',
    ...uidColumn(),
  },
  {
    colId: 'cover',
    field: 'cover',
    headerName: 'Cover',
    ...defaultColumn(),
    ...coverColumn(),
  },
  // {
  //   colId: 'avatar',
  //   field: 'avatar',
  //   headerName: 'Avatar',
  //   ...defaultColumn(),
  //   ...avatarColumn(),
  // },
  {
    colId: 'member',
    field: 'member',
    ...defaultColumn(),
    ...memberColumn({ avatar: data => data.avatar }),
    ...primaryColumn(),
    headerName: 'Donor',
    valueGetter: ({ data }) => {
      return data.member.email;
    },
  },
  {
    colId: 'displayName',
    field: 'displayName',
    headerName: 'FullName',
    ...defaultColumn(),
    ...textColumn(),
    cellRendererFramework: props => {
      return <div>{props.value}</div>;
    },
  },
  {
    colId: 'amount',
    field: 'amount',
    ...defaultColumn(),
    ...currencyColumn(),
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
    colId: 'percent',
    field: 'percent',
    headerName: 'Percentuale',
    ...defaultColumn(),
    ...percentColumn(),
  },
  {
    colId: 'createdAt',
    field: 'createdAt',
    headerName: 'Data creazione',
    ...defaultColumn(),
    ...dateColumn({}),
  },
  {
    colId: 'updatedAt',
    field: 'updatedAt',
    headerName: 'Ultimo aggiornamento',
    ...defaultColumn(),
    ...dateColumn({}),
  },
  {
    colId: 'firstName',
    field: 'firstName',
    headerName: 'firstName',
    ...defaultColumn(),
    ...stringColumn(),
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
  //   colId: 'gender',
  //   field: 'gender',
  //   headerName: 'Genere',
  //   ...defaultColumn(),
  //   ...singleSelectColumn({
  //     options: [
  //       { id: 'male', name: 'Maschio' },
  //       { id: 'female', name: 'Femmina' },
  //     ],
  //   }),
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
  // {
  //   colId: 'phone',
  //   field: 'phone',
  //   headerName: 'Telefono',
  //   ...defaultColumn(),
  //   ...phoneColumn(),
  // },
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
          gender: 'female',
          role: 'admin',
          member: faker.helpers.userCard(),
          progress: Math.random(),
        })),
      );
    }, 3000);
  });
};
