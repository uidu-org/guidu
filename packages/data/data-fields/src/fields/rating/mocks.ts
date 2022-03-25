import faker from '@faker-js/faker';

const value = () =>
  faker.datatype.number({
    min: 1,
    max: 5,
  });

const mocks = {
  value: value(),
  values: Array.from(Array(10)).map((x) => value()),
  cellProps: {
    max: 5,
  },
};

export default mocks;
