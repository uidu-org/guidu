import { faker } from '@faker-js/faker';

const value = () => faker.random.boolean();

const mocks = {
  value: true,
  values: Array.from(Array(10)).map((x) => value()),
};

export default mocks;
