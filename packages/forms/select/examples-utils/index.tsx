import faker from 'faker';
import React from 'react';
import 'twin.macro';

export const defaultUsers = Array.from(Array(10)).map((x) => ({
  ...faker.helpers.userCard(),
}));

export const defaultOptions = Array.from(Array(10)).map((x) => {
  const id = faker.random.uuid();
  return {
    id,
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    before: (
      <img
        src={`https://avatars.dicebear.com/api/human/${id}.svg`}
        // tw="w-full rounded-full"
      />
    ),
  };
});

export const selectDefaultProps = {
  options: defaultOptions,
  // labelField: 'name',
  // valueField: 'id',
  isOptionDisabled: (option) => option.disabled,
  getOptionLabel: ({ name }) => name,
  getOptionValue: ({ id }) => id,
};
