import pkg from './version.json';

const { name, version } = pkg;

const nextMajorVersion = () => {
  return [Number(version.split('.')[0]) + 1, 0, 0].join('.');
};

export { name, version, nextMajorVersion };
