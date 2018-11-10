// @flow
const path = require('path');
const loaderUtils = require('loader-utils');
const globby = require('globby');
const bolt = require('bolt');
const { dir, buildFs } = require('./buildFs');

/*::
import type { Directory, File, LoaderOptions } from './types';
*/

module.exports = async function boltNavLoader() {
  const opts /*: LoaderOptions */ = Object.assign(
    {
      include: [],
      exclude: [],
      debug: true,
      configProps: [],
    },
    loaderUtils.getOptions(this) || {},
  );

  let workspaces = await bolt.getWorkspaces({ cwd: process.cwd() });

  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;

  workspaces = workspaces.map(w =>
    Object.assign({}, w, { relativeDir: path.relative(projectRoot, w.dir) }),
  );

  const patterns = []
    .concat(opts.include)
    .concat((opts.exclude || []).map(p => `!${p}`));

  // Separate option for exclude is necessary since webpack treats ! as a sign of a loader
  // which blocks us from using it inside import statement
  const files /*: Array<string> */ = await globby(patterns, {
    cwd: projectRoot,
  });

  /*
    Packages will be an object containing the name in the file structure, and
    the team. Information from the package.json is placed in the config object.
    Only Requested fields are added to config.
    The name and team at root act as keys to look up information.
    The packages object has arrays of packages divided by team. Example:
    {
      elements: [
        {
          name: 'analytics',
          team: 'elements',
          config: { name: '@atlaskit/analytics', version: '2.5.0' },
        }
      ]
    }
    */
  let packages = {};

  for (let workspace of workspaces) {
    if (!files.includes(workspace.relativeDir)) continue;

    const [a, team, name] = workspace.relativeDir.split(path.sep);
    if (!packages[team]) packages[team] = [];

    let info = {
      name,
      team,
      config: {},
    };

    opts.configProps.forEach(p => {
      if (workspace.config[p]) info.config[p] = workspace.config[p];
    });

    packages[team].push(info);
  }

  return `module.exports = ${JSON.stringify(packages)};`;
};
