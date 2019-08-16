import faker from 'faker';

export const defaultUsers = Array.from(Array(10)).map(x => ({
  ...faker.helpers.userCard(),
}));

export const defaultOptions = Array.from(Array(10)).map(x => ({
  id: faker.random.uuid(),
  name: faker.lorem.word(),
}));

export const selectDefaultProps = {
  options: defaultOptions,
  // labelField: 'name',
  // valueField: 'id',
  isOptionDisabled: option => option.disabled,
  getOptionLabel: ({ name }) => name,
  getOptionValue: ({ id }) => id,
};
