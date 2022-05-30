import { faker } from '@faker-js/faker';

const value = () => ({
  address: `${faker.address.streetAddress()} ${faker.address.cityName()}`,
  latitude: faker.address.latitude(),
  longitude: faker.address.longitude(),
});

const mocks = {
  value: value(),
  values: Array.from(Array(10)).map((x) => ({
    ...value(),
  })),
};

export default mocks;
