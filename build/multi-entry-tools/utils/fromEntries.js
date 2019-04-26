// Object.fromEntries polyfill, remove when upgraded to node 10
module.exports = function fromEntries(iterable) {
  return [...iterable].reduce(
    (obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }),
    {},
  );
};
