import faker from 'faker';

export const fakeImage = () => ({
  type: 'image',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
});

export const fakeVideo = () => ({
  type: 'video',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
});

export const fakeFile = () => ({
  type: 'file',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
});

export const fakeLink = () => ({
  type: 'link',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
});

export const fetchAttachments = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(Array.from(Array(10).keys()).map(i => fakeImage()));
    }, 3000);
  });
};
