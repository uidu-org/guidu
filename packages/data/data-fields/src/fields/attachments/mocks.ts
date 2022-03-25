import faker from '@faker-js/faker';

const value = () => ({
  id: faker.datatype.uuid(),
  url: faker.image.image(),
});

const mocks = {
  value: [value()],
  values: Array.from(Array(10)).map((x) => ({
    ...value(),
  })),
};

export default mocks;
