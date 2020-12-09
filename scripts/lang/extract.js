const formatjs = require('@formatjs/cli');
const globby = require('globby');

const getPackages = require('@manypkg/get-packages');
const path = require('path');

async function extractTranslation() {
  const { packages, root } = await getPackages.getPackages();
  packages.map(async (pkg) => {
    const { packageJson, dir } = pkg;
    const relativePath = path.relative(root.dir, dir);
    const PATTERN = `${relativePath}/src/**/*.ts*`;
    const files = await globby(PATTERN);
    if (
      packageJson.supportedLocales &&
      packageJson.supportedLocales.length > 0
    ) {
      packageJson.supportedLocales.map(async (locale) => {
        await formatjs.extractAndWrite(files, {
          outFile: `${relativePath}/lang/${locale}.json`,
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          extractFromFormatMessageCall: true,
        });
      });
    }
  });
}

extractTranslation();
