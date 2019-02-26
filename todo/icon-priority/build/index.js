// @flow
const path = require('path');
const buildIcons = require('@atlaskit/icon-build-process');
const pkgDir = require('pkg-dir');
const fs = require('fs-extra');

const root = pkgDir.sync();

const config = {
  srcDir: path.resolve(root, 'svgs_raw'),
  processedDir: path.resolve(root, 'svgs'),
  destDir: path.resolve(root, 'glyph'),
  maxWidth: 24,
  maxHeight: 24,
  glob: '**/*.svg',
};

buildIcons(config).then(icons => {
  const iconDocs = buildIcons.createIconDocs(
    icons,
    '@atlaskit/icon-priority',
    {},
    ['priority', 'icon-priority'],
  );
  return fs.outputFile(path.resolve(root, 'src/metadata.js'), iconDocs);
});
