const fs = require('fs');
const getPackages = require('@manypkg/get-packages');
const path = require('path');

// const resultAsString: Promise<string> = extract(files, {
//   idInterpolationPattern: '[sha512:contenthash:base64:6]',
// });

async function compileTranslation() {
  const { packages, root } = await getPackages.getPackages();
  console.log(packages);
  packages.map(async (pkg) => {
    const { dir } = pkg;
    const relativePath = path.relative(root.dir, dir);
    await fs.copyFile(
      './scripts/npmignore/.npmignore',
      `${relativePath}/.npmignore`,
      (error) => console.log(error),
    );
  });
}

compileTranslation();
