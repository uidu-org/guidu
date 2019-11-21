// @flow
const glob = require('glob');
const bolt = require('bolt');
const path = require('path');
const fromEntries = require('./utils/fromEntries');

// Array.prototype.flat polyfill, remove when upgraded to node 10
function flatten(array) {
  return array.reduce((acc, a) => [...acc, ...a], []);
}

function getAliasesForWorkspace({ name: packageName, dir }) {
  return new Promise((resolve, reject) => {
    glob(`${dir}/src/*`, (err, paths) => {
      if (err) {
        reject(err);
      }
      const tsxOrJsRegex = /^.*\.(js|ts(x)?)$/;
      resolve(
        paths
          .filter(pathName => pathName.match(tsxOrJsRegex))
          .map(pathName => {
            const { name: entryName } = path.parse(pathName);

            return [`${packageName}/${entryName}`, pathName];
          }),
      );
    });
  });
}

module.exports = async function getAlternativeEntryPointAliasMap() {
  const workspaces = await bolt.getWorkspaces();

  const aliasPromises = workspaces.map(workspace =>
    getAliasesForWorkspace(workspace),
  );
  const aliases = fromEntries(
    flatten(
      (await Promise.all(aliasPromises)).filter(
        aliasesP => aliasesP.length > 0,
      ),
    ),
  );

  return aliases;
};
