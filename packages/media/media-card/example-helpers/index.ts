import faker from 'faker';

export const fakeImage = () => ({
  type: 'image',
  id: faker.random.uuid(),
  src: faker.image.business(),
  alt: faker.finance.accountName(),
  caption: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
});

export const fakeVideo = () => ({
  type: 'video',
  id: faker.random.uuid(),
  src: faker.image.business(),
  alt: faker.finance.accountName(),
  caption: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  poster: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
  sources: [
    {
      type: 'video/mp4',
      url: 'https://download.blender.org/peach/trailer/trailer_480p.mov',
    },
    {
      type: 'video/ogg',
      url: 'https://download.blender.org/peach/trailer/trailer_400p.ogg',
    },
  ],
});

export const fakeFile = () => ({
  type: 'file',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
  caption: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
});

export const fakeLink = () => ({
  type: 'link',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  alt: faker.finance.accountName(),
  caption: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
});

export const fetchAttachments = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve([
        ...Array.from(Array(10).keys()).map(i => fakeImage()),
        ...Array.from(Array(10).keys()).map(i => fakeVideo()),
      ]);
    }, 3000);
  });
};
