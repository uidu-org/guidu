const fs = require('fs');
const util = require('util');

function writeFile(filePath, fileContents) {
  return util.promisify(cb => fs.writeFile(filePath, fileContents, cb))();
}

function readFile(filePath) {
  return util.promisify(cb => fs.readFile(filePath, cb))();
}

function rename(oldPath, newPath) {
  return util.promisify(cb => fs.rename(oldPath, newPath, cb))();
}

function mkdtemp(prefix) {
  return util.promisify(cb => fs.mkdtemp(prefix, cb))();
}

function stat(filePath) {
  return util.promisify(cb => fs.stat(filePath, cb))();
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}

module.exports = {
  writeFile,
  readFile,
  rename,
  mkdtemp,
  stat,
  exists,
};
