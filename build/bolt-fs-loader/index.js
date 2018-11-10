// @flow

const path = require('path');
const loaderUtils = require('loader-utils');
const globby = require('globby');
const bolt = require('bolt');
const { dir, buildFs, isDirHasFiles } = require('./buildFs');
const { printDir } = require('./printFs');

/*::
import type { Directory, File, LoaderOptions } from './types';
*/

function createLoaderOutput(
  dir /*: Directory */,
  files /*: Array<string> */ = [],
  debug /*: boolean */ = false,
) {
  const output = `
    function dir(id, children) {
      return { type: 'dir', id: id, children: children };
    }

    function file(id, exports, contents) {
      return { type: 'file', id: id, exports: exports, contents: contents };
    }

    export default ${printDir(dir)};
  `;

  if (debug) {
    const groupName = 'Bolt FS Loader Debug Info';
    return `${output}
      console.groupCollapsed('${groupName}');
      console.log('Files: ', ${JSON.stringify(files)});
      console.log('Dir structure: ', ${JSON.stringify(dir)});
      console.groupEnd('${groupName}');
    `;
  }

  // We must ensure Windows paths are escaped, otherwise we will get errors
  // about octal literals (they're not allowed in strings in strict mode and
  // modules are implicitly strict).
  return output.replace(/\\/g, '\\\\');
}

function addWebpackDependencies(
  dir /*: Directory */,
  addContextDependency /* (path: string) => void */,
) {
  // Skipping top level directories and add only those that have files matching query inside.
  if (isDirHasFiles(dir)) {
    return addContextDependency(dir.path);
  }

  dir.children.forEach(
    // Making flow happy otherwise it doesn't understand that child here can only by a directory
    child =>
      child.type === 'dir' &&
      addWebpackDependencies(child, addContextDependency),
  );
}

module.exports = async function boltFsLoader() {
  const opts /*: LoaderOptions */ = Object.assign(
    { include: [], exclude: [], debug: false },
    loaderUtils.getOptions(this) || {},
  );
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;

  this.clearDependencies();

  if (!opts.include || !opts.include.length) {
    return createLoaderOutput(dir('root', projectRoot), [], opts.debug);
  }

  // Separate option for exclude is necessary since webpack treats ! as a sign of a loader
  // which blocks us from using it inside import statement
  let patterns = []
    .concat(opts.include)
    .concat((opts.exclude || []).map(p => `!${p}`));
  const files /*: Array<string> */ = await globby(patterns, {
    cwd: projectRoot,
  });
  const result /*: Directory */ = files.reduce((
    root /*: Directory */,
    file /*: string */,
  ) => {
    const pathSegments = file.split(path.sep);
    return buildFs(root, pathSegments, projectRoot);
  }, dir('root', projectRoot));

  addWebpackDependencies(result, this.addContextDependency.bind(this));

  return createLoaderOutput(result, files, opts.debug);
};
