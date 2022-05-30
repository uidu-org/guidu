import { faker } from '@faker-js/faker';

const value = () => faker.datatype.number({ min: 0, max: 100 });

const mocks = {
  value: value() / 100,
  values: Array.from(Array(10)).map((x) => value() / 100),
};

export default mocks;
