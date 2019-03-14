const hackerNouns = [
  'system',
  'protocol',
  'microchip',
  'alarm',
  'protocol',
  'panel',
  'pixel',
];

export const getHackerNoun = () =>
  hackerNouns[Math.round(Math.random() * hackerNouns.length)];

const commonFileName = [
  'kwanza_industrial_neural',
  'quality',
  'timor_leste',
  'cambridgeshire_transmitting_e_business',
  'greens_unbranded_soft_shirt_manager',
  'music_moratorium',
];

export const imageFileTypes = ['.svgz', '.svg'];
export const textFileTypes = ['.txt', '.in', '.ini', '.text', '.conf', '.list'];
export const getTextFileType = () =>
  textFileTypes[Math.floor(Math.random() * textFileTypes.length)];

export const getFakeFileName = (
  ext = imageFileTypes[Math.round(Math.random())],
) =>
  `${commonFileName[Math.floor(Math.random() * commonFileName.length)]}${ext}`;

// This fake image was generated using faker. It never changes so we are just
// using the output exact call Faker.image.dataUri(320, 240)
export const fakeImage =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22320%22%20height%3D%22240%22%3E%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%20%20%3Ctext%20x%3D%220%22%20y%3D%2220%22%20font-size%3D%2220%22%20text-anchor%3D%22start%22%20fill%3D%22white%22%3E320x240%3C%2Ftext%3E%20%3C%2Fsvg%3E';

export const getDateWithOffset = (offset: number) => {
  let time = new Date();
  time.setTime(time.getTime() + offset);
  return time;
};

export const getPastDate = () => {
  let offset = 0 - Math.round(Math.random() * 10000);
  return getDateWithOffset(offset);
};
export const getFutureDate = () => {
  let offset = 100000 + Math.round(Math.random() * 10000);
  return getDateWithOffset(offset);
};

// This function is taken directly from Faker
export const mockDataUri = function(width: number, height: number) {
  const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
  const svgString =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' +
    width +
    '" height="' +
    height +
    '"> <rect width="100%" height="100%" fill="grey"/>  <text x="0" y="20" font-size="20" text-anchor="start" fill="white">' +
    width +
    'x' +
    height +
    '</text> </svg>';
  return rawPrefix + encodeURIComponent(svgString);
};
