/* eslint-disable flowtype/require-valid-file-annotation */
/* 
WIP This codemod was build during shipit it's changes should be carefully scrutinized before shipping ;)
*/

const themeIndexImports = [
  'themed',
  'withTheme',
  'AtlaskitThemeProvider',
  'getTheme',
  'createTheme',
];

const constants = [
  'gridSize',
  'FLATTENED',
  'CHANNEL',
  'DEFAULT_THEME_MODE',
  'THEME_MODES',
  'borderRadius',
  'gridSize',
  'fontSize',
  'fontSizeSmall',
  'fontFamily',
  'codeFontFamily',
  'focusRing',
  'noFocusRing',
  'layers',
  'assistive',
];

const akTheme = '@atlaskit/theme';

const constantsPredicate = specifier =>
  !specifier ||
  !specifier.imported ||
  constants.indexOf(specifier.imported.name) > -1;

function getConstantsImport(j, path) {
  const constantsSpecifierspath = path.value.specifiers.filter(
    constantsPredicate,
  );

  if (constantsSpecifierspath.length === 0) {
    return null;
  }

  return j.importDeclaration(
    constantsSpecifierspath,
    j.literal(`${akTheme}/constants`),
  );
}
const indexPredicate = specifier =>
  !specifier ||
  !specifier.imported ||
  themeIndexImports.indexOf(specifier.imported.name) > -1;

function getIndexImport(j, path) {
  const mainIndexSpecifierspath = path.value.specifiers.filter(indexPredicate);

  if (mainIndexSpecifierspath.length === 0) {
    return null;
  }

  return j.importDeclaration(
    mainIndexSpecifierspath,
    j.literal(`${akTheme}/components`),
  );
}

function getUsesOfImport(j, fileSource, importVarname) {
  return fileSource
    .find(j.MemberExpression)
    .filter(spec => spec.value.object.name === importVarname);
}

function getOtherImports(j, path, fileSource) {
  return path.value.specifiers
    .filter(
      specifier => !indexPredicate(specifier) && !constantsPredicate(specifier),
    )
    .map(specifier => {
      const usesOfImport = getUsesOfImport(j, fileSource, specifier.local.name);

      if (usesOfImport.size() > 0 && usesOfImport.size() < 7) {
        const importSpecifiers = [];
        const names = [];

        usesOfImport.forEach(lowerPath => {
          // Make stupid lint rule happy
          const propertyName = lowerPath.value.property.name;
          if (!names.includes(propertyName)) {
            names.push(propertyName);
          }

          j(lowerPath).replaceWith(j.identifier(lowerPath.value.property.name));
        });

        names.forEach(name => {
          importSpecifiers.push(j.importSpecifier(j.identifier(name)));
        });

        return j.importDeclaration(
          importSpecifiers,
          j.literal(`${akTheme}/${specifier.imported.name}`),
        );
      }

      return j.importDeclaration(
        [j.importNamespaceSpecifier(j.identifier(specifier.local.name))],
        j.literal(`${akTheme}/${specifier.imported.name}`),
      );
    });
}

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const fileSource = j(file.source);

  // Fixup imports
  fileSource
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === akTheme)
    .forEach(path => {
      const otherImports = getOtherImports(j, path, fileSource);
      const [firstImport, ...importsAfter] = [
        getIndexImport(j, path),
        getConstantsImport(j, path),
        ...otherImports,
      ].filter(importStat => importStat);

      if (!firstImport) {
        return;
      }

      firstImport.comments = path.value.comments;

      j(path)
        .replaceWith(firstImport)
        .insertAfter(importsAfter);
    });

  return fileSource.toSource();
}
