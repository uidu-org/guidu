import faker from 'faker';

const value = () => faker.lorem.paragraphs();

const mocks = {
  value: value(),
  values: Array.from(Array(10)).map((x) => value()),
};

export default mocks;
