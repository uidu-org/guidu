import faker from 'faker';
import React from 'react';

export const defaultUsers = Array.from(Array(10)).map(x => ({
  ...faker.helpers.userCard(),
}));

export const defaultOptions = Array.from(Array(10)).map(x => {
  const id = faker.random.uuid();
  return {
    id: faker.random.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    before: (
      <img
        src={`https://api.adorable.io/avatars/22/${id}`}
        className="w-100 rounded-circle"
      />
    ),
  };
});

export const selectDefaultProps = {
  options: defaultOptions,
  // labelField: 'name',
  // valueField: 'id',
  isOptionDisabled: option => option.disabled,
  getOptionLabel: ({ name }) => name,
  getOptionValue: ({ id }) => id,
};
