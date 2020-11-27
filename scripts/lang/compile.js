const formatjs = require('@formatjs/cli');
const globby = require('globby');

const getPackages = require('@manypkg/get-packages');
const path = require('path');

// const resultAsString: Promise<string> = extract(files, {
//   idInterpolationPattern: '[sha512:contenthash:base64:6]',
// });

async function compileTranslation() {
  const { packages, root } = await getPackages.getPackages();
  packages.map(async (pkg) => {
    const { packageJson, dir } = pkg;
    const relativePath = path.relative(root.dir, dir);
    if (
      packageJson.supportedLocales &&
      packageJson.supportedLocales.length > 0
    ) {
      packageJson.supportedLocales.map(async (locale) => {
        const PATTERN = `${relativePath}/lang/${locale}.json`;
        const files = await globby(PATTERN);
        await formatjs.compileAndWrite(files, {
          outFile: `${relativePath}/dist/lang/${locale}.json`,
        });
      });
    }
  });
}

compileTranslation();
