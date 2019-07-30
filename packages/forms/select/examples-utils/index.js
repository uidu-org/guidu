import faker from 'faker';

const defaultUsers = Array.from(Array(10)).map(x => ({
  ...faker.helpers.userCard(),
}));

const defaultOptions = Array.from(Array(10)).map(x => ({
  id: faker.lorem.word(),
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
