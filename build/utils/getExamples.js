//@flow
'use strict';
/*
 * Utilities helper to return all the examples and filter them by packages
 */
const boltQuery = require('bolt-query');
const glob = require('glob');
const path = require('path');

// Get all examples for a specified package using Bolt-Query
async function getExamplesFor(
  pkgName /*: string */,
) /*: Promise<Array<string>> */ {
  const project /*: any */ = await boltQuery({
    cwd: path.join(__dirname, '..'),
    workspaceFiles: {
      examples: 'examples/*.+(js|ts|tsx)',
    },
  });
  let examplesArr = [];
  project.workspaces.forEach(workspace => {
    if (workspace.pkg && workspace.pkg.name.split('/')[1] === pkgName) {
      examplesArr.push(...workspace.files.examples);
    }
  });
  return examplesArr;
}

module.exports = { getExamplesFor };
