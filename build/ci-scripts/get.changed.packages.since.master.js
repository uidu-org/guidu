const bolt = require('bolt');
const path = require('path');
const meow = require('meow');
const packages = require('../utils/packages');
const flattenDeep = require('lodash.flattendeep');

// /**
//  * NOTE: This prints the list of changed packages and dependent packages since master ONLY if they have been commited.
//  * It will print them all out as a json array of relative paths
//  * i.e: $ node build/ci-scripts/get.changed.packages.since.master.js
//  *        ["packages/core/avatar", "packages/core/badge"]
//  * */

const cli = meow(
  `
    Usage
      $ node build/ci-scripts/get.changed.packages.since.master.js

    Options
      --dependents='direct' Include "direct" dependent packages

      --spaceDelimited      Change the output of changed packages script from an array to a space delimited output

      --only='packages'     Target only 'packages' folder name

    Examples
      $ node build/ci-scripts/get.changed.packages.since.master.js --dependents='direct'

      $ node build/ci-scripts/get.changed.packages.since.master.js --spaceDelimited --only='packages'
`,
  {
    description: 'Display an array of changed packages since master',
    flags: {
      dependents: {
        type: 'string',
      },
      spaceDelimited: {
        type: 'boolean',
      },
      only: {
        type: 'string',
      },
    },
  },
);

const displayChangedPackagesSinceMaster = async () => {
  const cwd = process.cwd();
  const allPackages = await bolt.getWorkspaces({ cwd });
  // Changed packages that have been worked on since master.
  const changedPackages = await packages.getChangedPackagesSinceMaster();
  let changedPackagesRelativePaths = changedPackages.map(
    pkg => pkg.relativeDir,
  );
  // Packages that are dependent on the changed packages.
  // If dependencies flag is passed, CHANGED_PACKAGES will return packages that are dependent on the changed packages.
  if (cli.flags.dependents) {
    const dependencyGraph = await bolt.getDependentsGraph({ cwd });
    // 1. Match with changed packages.
    // 2. Get the package.json from those packages.
    // 3. Map and filter the changed packages with its own dependent packages.
    // 4. Based on the argument passed, it will return the direct dependencies.
    // 4. Return a flatten array of changed packages relative path.
    const getPackageJSON = pkgName =>
      allPackages.find(({ name }) => name === pkgName);
    const changedPackagesWithDependent = flattenDeep(
      changedPackages.map(({ name: changedPkgName }) =>
        dependencyGraph
          .get(changedPkgName)
          .filter(dependent => {
            const dependentPkgJSON = getPackageJSON(dependent).config;
            // --dependents='direct' flag will return packages with direct dependencies on the changed packages.
            // When a package does not have dependent or not required such as the build script.
            if (cli.flags.dependents === 'direct')
              return (
                dependentPkgJSON.dependencies[changedPkgName] !== undefined
              );
            else
              throw new Error(
                `The parsed flag is not recognised ${process.argv}`,
              );
          })
          .map(pkg => getPackageJSON(pkg).dir)
          .map(pkg => path.relative(cwd, pkg)),
      ),
    );
    // Set is used to avoid the case of multiple changed packages with the same dependent packages.
    changedPackagesRelativePaths = [
      ...new Set(
        changedPackagesRelativePaths.concat(changedPackagesWithDependent),
      ),
    ];
  }

  // Those exceptions scripts are related to the measure of the bundle size.
  // This check if the `--only='folderName'` flag is set when using the measure tool.
  if (cli.flags.only) {
    const includedPattern = cli.flags.only;
    // For example, if we need to `only` include the component 'packages' when measuring the package bundle size.
    changedPackagesRelativePaths = changedPackagesRelativePaths.filter(pkg =>
      pkg.includes(includedPattern),
    );
  }

  // This check is only for the way of changed packages output is displayed:
  // '--spaceDelimited' - using the measure tool, will return the changedPackages
  // like 'packages/core/button packages/editor/editor-core ...'.
  // Otherwise, the standard output will be ["packages/core/button", "packages/editor/editor-core", ...].
  if (cli.flags.spaceDelimited) {
    console.log(changedPackagesRelativePaths.join(' '));
  } else {
    console.log(JSON.stringify(changedPackagesRelativePaths));
  }
};

(() => displayChangedPackagesSinceMaster(cli.input, cli.flags))();
