var toObject = function toObject(keys) {
  return keys.reduce(function (object, key) {
    var o = object;
    o[key] = undefined;
    return object;
  }, {});
}; // Pick certain keys from an existing object
// Taken from https://github.com/facebook/flow/issues/3367#issuecomment-414503215