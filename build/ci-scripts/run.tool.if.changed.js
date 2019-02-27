// @flow
const { getChangedPackagesSinceMaster } = require('../utils/packages');
const spawndamnit = require('spawndamnit');
const { getPackagesWithKarmaTests } = require('../karma-config');
const {
  getPackagesInfo,
  TOOL_NAME_TO_FILTERS,
} = require('@atlaskit/build-utils/tools');

/**
 * This is a helper script to return whether or not a certain tool should be run.
 * It works by returning a zero code if a tool should be run, so that the normal usage becomes:
 *
 * `node build/ci-scripts/run.tool.if.changed.js toolName -- yarn toolName`.
 */
(async () => {
  let cwd = process.cwd();
  let args = process.argv.slice(2);

  let dashdashIndex = args.indexOf('--');
  let command = args.slice(dashdashIndex + 1);
  let toolNames = args.slice(0, dashdashIndex);

  if (dashdashIndex < 0 || command.length === 0) {
    console.error('Incorrect usage, run it like this:\n');
    console.error(
      '  $ node build/ci-scripts/run.tool.if.changed.js [...tools] -- <...command>\n',
    );
    console.error(`Tools: ${Object.keys(TOOL_NAME_TO_FILTERS).join(', ')}`);
    throw process.exit(1);
  }

  let filters = toolNames.map(toolName => {
    let filterFn = TOOL_NAME_TO_FILTERS[toolName];

    if (!filterFn) {
      console.error(
        `Invalid tool name: "${toolName}" (${Object.keys(
          TOOL_NAME_TO_FILTERS,
        ).join(', ')})`,
      );
      throw process.exit(1);
    }

    return filterFn;
  });

  let [packages, changedPackages] = await Promise.all([
    getPackagesInfo(cwd),
    getChangedPackagesSinceMaster(),
  ]);

  let changedPackageDirs = changedPackages.map(pkg => pkg.dir);

  filters.push(pkg => changedPackageDirs.includes(pkg.dir));

  let matched = !!packages.find(pkg => filters.every(filter => filter(pkg)));

  if (!matched) {
    throw process.exit(0);
  }

  try {
    let res = await spawndamnit(command[0], command.slice(1), {
      stdio: 'inherit',
      tty: (process.stdout && process.stdout.isTTY) || false,
    });

    throw process.exit(res.code);
  } catch (err) {
    if (err instanceof spawndamnit.ChildProcessError) {
      throw process.exit(err.code);
    } else {
      throw process.exit(1);
    }
  }
})();
