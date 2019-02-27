const bolt = require('bolt');
const fs = require('fs-extra');
const path = require('path');
const customFs = require('../utils/fs');

const CHANGED_PACKAGES = process.env.CHANGED_PACKAGES;
const changedPackages = JSON.parse(CHANGED_PACKAGES);

(async () => {
  const project = await bolt.getProject();
  const packages = await bolt.getWorkspaces();
  const relevantPackages = packages
    .map(pkg => ({
      ...pkg,
      relDir: path.relative(project.dir, pkg.dir),
    }))
    .filter(pkg => changedPackages.indexOf(pkg.relDir) !== -1);

  const manifest = {};

  // Copy the tgz's
  relevantPackages.forEach(pkg => {
    const tarFiles = fs
      .readdirSync(pkg.dir)
      .filter(file => file.endsWith('.tgz'));
    if (tarFiles.length !== 1) {
      console.error('Expected exactly 1 .tgz file, found: ', tarFiles.length);
      console.log(tarFiles);
      process.exit(1);
    }
    const fromFile = path.join(pkg.dir, tarFiles[0]);
    const toFile = path.join(project.dir, 'dists', tarFiles[0]);
    console.log('Copying tgz file: ', fromFile, toFile);
    fs.copyFileSync(fromFile, toFile);

    // add the manifest entry
    manifest[pkg.name] = { tarFile: tarFiles[0] };
  });

  // Write manifest.json file
  const metaDataFilePath = path.join(project.dir, 'dists', 'manifest.json');
  console.log('Writing manifest.json file', metaDataFilePath);
  fs.writeFileSync(metaDataFilePath, JSON.stringify(manifest, null, 2));

  console.log('DONE!');
})();
