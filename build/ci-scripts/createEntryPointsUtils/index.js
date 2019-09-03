// @flow
/* This helper creates the folder per entry point and add a package.json that maps the path to the entry point .*/
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const { getPackagesInfo } = require('@uidu/build-utils/tools');

const writeFile = promisify(fs.writeFile);

async function writeEntryPointsPathInPkgJson(
  isTs /*: boolean */,
  pkg /*: Object */,
  pkgFile /*: string */,
  entryPointDirName /*: string*/,
) {
  // Add a package.json
  const types = isTs ? `../dist/cjs/${pkgFile}.d.ts` : undefined;
  const entryPointJson = {
    name: `${pkg.name}/${pkgFile}`,
    main: `../dist/cjs/${pkgFile}.js`,
    module: `../dist/esm/${pkgFile}.js`,
    types,
  };
  return writeFile(
    `${entryPointDirName}/package.json`,
    JSON.stringify(entryPointJson, null, 2),
    err => {
      if (err) console.log(err);
    },
  );
}

async function createEntryPointsDirWithPkgJson() {
  const cwd = process.cwd();
  const packages = await getPackagesInfo(cwd);
  const pkgContents = packages
    .filter(pkg => pkg.dir.includes('/packages/core'))
    .map(pkg => {
      return {
        name: pkg.name,
        pkgDirPath: pkg.dir,
        files: fs
          .readdirSync(path.join(pkg.dir, 'src'))
          .filter(
            file =>
              file.includes('.') &&
              !file.includes('index') &&
              path.parse(file).name &&
              !file.includes('.d.ts') &&
              !file.includes('version.json'),
          ),
      };
    });
  for (let pkg of pkgContents) {
    for (let pkgFile of pkg.files) {
      const isTs = pkgFile.includes('.ts');
      pkgFile = path.parse(pkgFile).name;
      const entryPointDirName = path.join(pkg.pkgDirPath, pkgFile);
      try {
        if (!fs.existsSync(entryPointDirName)) {
          fs.mkdirSync(entryPointDirName);
        }
        const dirContents = fs.readdirSync(entryPointDirName);
        if (dirContents.length > 1 || dirContents[0] === 'package.json') {
          throw Error(
            `Directory:${entryPointDirName} outside of src has the same name: ${pkgFile} as a file in src/ this is not allowed`,
          );
        }
        await writeEntryPointsPathInPkgJson(
          isTs,
          pkg,
          pkgFile,
          entryPointDirName,
        );
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
  createEntryPointsDirWithPkgJson,
  writeEntryPointsPathInPkgJson,
};
