const getAlternativeEntryPointAliasMap = require('./module-resolve-map-builder');
const fromEntries = require('./utils/fromEntries');

async function main() {
  const isProjectLevel = process.argv[2] === '--project';

  const mapping = await getAlternativeEntryPointAliasMap();
  const cwd = process.cwd();
  const paths = fromEntries(
    Object.entries(mapping)
      .filter(([, path]) => path.includes('/packages/'))
      .map(([moduleName, modulePath]) => {
        const modulePathWithoutExtension = modulePath.replace(
          /(\.tsx?|\.js)$/,
          '',
        );

        return [
          [moduleName],
          [
            modulePathWithoutExtension.replace(`${cwd}/packages`, '../..'),
            modulePathWithoutExtension.replace(`${cwd}/`, './'),
          ],
        ];
      }),
  );

  paths['@atlaskit/analytics-next'] = [
    'node_modules/@atlaskit/analytics-next-types',
    'packages/elements/analytics-next-types',
  ];

  console.log(
    '/* This file is auto-generated to get multi entry points to type check correctly */',
  );
  console.log(
    '/* When you add a new entry point in src/ rebuild it by running:  bolt build:multi-entry-point-tsconfig */',
  );

  console.log(
    JSON.stringify(
      {
        compilerOptions: {
          paths,
        },
      },
      null,
      2,
    ),
  );
}

main();
