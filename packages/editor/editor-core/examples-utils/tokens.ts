import { faker } from '@faker-js/faker';
import { Token } from '@uidu/editor-common/provider-factory';

export const getItems = (count: number = 20): Token[] =>
  Array.from(Array(count)).map((x) => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  }));

export default getItems();
