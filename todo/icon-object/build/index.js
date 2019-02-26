// @flow
const path = require('path');
const iconBuild = require('@atlaskit/icon-build-process');
const pkgDir = require('pkg-dir');
const fs = require('fs-extra');

const root = pkgDir.sync();

const { tidy, build, createIconDocs } = iconBuild;

const config16 = {
  srcDir: path.resolve(root, 'svgs_raw'),
  processedDir: path.resolve(root, 'svgs'),
  destDir: path.resolve(root, 'glyph'),
  maxWidth: 16,
  maxHeight: 16,
  glob: '**/16.svg',
  size: 'small',
};
const config24 = {
  srcDir: path.resolve(root, 'svgs_raw'),
  processedDir: path.resolve(root, 'svgs'),
  destDir: path.resolve(root, 'glyph'),
  maxWidth: 24,
  maxHeight: 24,
  glob: '**/24.svg',
  size: 'medium',
};

tidy(config16)
  .then(() => Promise.all([build(config16), build(config24)]))
  .then(([sixteen, twentyfour, fourtyeight]) => {
    let allIcons = [...sixteen, ...twentyfour];
    const iconDocs = createIconDocs(allIcons, '@atlaskit/icon-object', {}, [
      'object',
      'icon-object',
    ]);
    console.log('@atlaskit-icon-object built');
    return fs.outputFile(path.resolve(root, 'src/metadata.js'), iconDocs);
  });
