import { allCountries } from '@uidu/select';
import faker from 'faker';

const value = () => faker.address.countryCode();

const mocks = {
  value: value(),
  values: Array.from(Array(10)).map((x) => value()),
  options: allCountries,
};

export default mocks;
