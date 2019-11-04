export const cities: Array<{ name: string; id: any }> = [
  { name: 'Adelaide', id: 'adelaide', description: 'extra' },
  { name: 'Brisbane', id: 'brisbane' },
  { name: 'Canberra', id: 'canberra' },
  { name: 'Darwin', id: 'darwin' },
  { name: 'Hobart', id: 'hobart' },
  { name: 'Melbourne', id: 'melbourne' },
  { name: 'Perth', id: 'perth' },
  { name: 'Sydney', id: 'sydney' },
];

export const longFormValues: Array<{ name: string; id: any }> = [
  { name: 'foo@foo@foo@foo@test@test.com', id: 'silly' },
  {
    name: 'foo@foo@test@test@test@test@test@foo@test@foo.com',
    id: 'even sillier',
  },
  {
    name:
      'foo@foo@test@test@test@test@test@foo@test@foo.comfoo@foo@test@test@test@test@test@foo@test@foo.comfoo@foo@test@test@test@test@test@foo@test@foo.comfoo@foo@test@test@test@test@test@foo@test@foo.com',
    id: 'silliest',
  },
];
