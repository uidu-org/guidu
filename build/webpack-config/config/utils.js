const path = require('path');

function createGlob(glob /*: string */) /*: Array<string> */ {
  return [
    `${glob}/docs/**/*.+(js|jsx|ts|tsx)`,
    `${glob}/package.json`,
    `${glob}/CHANGELOG.md`,
    `${glob}/examples/*.+(js|jsx|ts|tsx)`,
  ];
}

const createDefaultGlob = () => createGlob('packages/**');

const createWorkspacesGlob = (
  workspaces /*: Array<{ dir: string }> */,
  projectRoot /*: string */,
) /*: string[] */ =>
  workspaces.reduce(
    (acc, ws) => acc.concat(...createGlob(path.relative(projectRoot, ws.dir))),
    [],
  );

module.exports = { createGlob, createDefaultGlob, createWorkspacesGlob };
