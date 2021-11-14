const fs = require('fs');

const path = require('path');
const getPackages = require('@manypkg/get-packages');

async function writePackage(pkg, packageJson) {
  await fs.readFile(
    path.join(pkg.dir, 'package.json'),
    {
      encoding: 'utf-8',
    },
    (err, data) => {
      let indent = '  ';
      return fs.writeFile(
        path.join(pkg.dir, 'package.json'),
        JSON.stringify(packageJson, null, indent) +
          (data.endsWith('\n') ? '\n' : ''),
        (err) => {
          if (err) throw err;
        },
      );
    },
  );
}

async function syncExportMap() {
  const { packages, root } = await getPackages.getPackages();
  packages.map(async (pkg) => {
    const { packageJson, dir } = pkg;
    packageJson['exports'] = {
      ...(packageJson.module
        ? {
            default: `./${packageJson.module}`,
            import: `./${packageJson.module}`,
            require: `./${packageJson.main}`,
          }
        : {
            default: `./${packageJson.main}`,
            require: `./${packageJson.main}`,
          }),
    };
    console.log(packageJson);
    writePackage(pkg, packageJson);
  });
}

syncExportMap();
