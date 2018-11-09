import sentenceCase from 'sentence-case';
export function getDirectories(items) {
  var dirs = [];
  console.log(items);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.type === 'dir') {
        dirs.push(item);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return dirs;
}
export function getFiles(items) {
  var files = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item.type === 'file') {
        files.push(item);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return files;
}
export function maybeGetById(items, id) {
  return items.find(function (item) {
    return item.id === id;
  }) || null;
}
export function getById(items, id) {
  var match = maybeGetById(items, id);

  if (!match) {
    throw new Error("Missing ".concat(id, " in file system"));
  }

  return match;
}
export function flatMap(dir, iteratee) {
  var result = [];

  function visit(dir, filePath) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = dir.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var item = _step3.value;
        var currPath = "".concat(filePath, "/").concat(item.id);

        if (item.type === 'dir') {
          visit(item, currPath);
        } else {
          result.push(iteratee(item, currPath));
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  visit(dir, dir.id);
  return result;
}
export function find(dir, iteratee) {
  function visit(dir, filePath) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = dir.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var item = _step4.value;
        var currPath = "".concat(filePath, "/").concat(item.id);

        if (item.type === 'dir') {
          var result = visit(item, currPath);
          if (result) return result;
        } else if (iteratee(item, currPath)) return item;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  return visit(dir, dir.id) || null;
}
export function findNormalized(dir, filePath) {
  return find(dir, function (file, currPath) {
    return normalize(currPath) === filePath;
  });
}
export function normalize(filePath) {
  return filePath.split('/').map(function (part) {
    return part.replace(/^[\d]+-/, '');
  }).join('/').replace(/\..*/, '');
}
export function titleize(filePath) {
  return sentenceCase(normalize(filePath));
}