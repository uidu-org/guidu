const fetch = require('node-fetch');

const stats = require('../dist/stats.json');

// These are the known splits in the repo that we can look for.
// Once the chunk splitting in the website is more sane, we can definitely look at adding more
const knownSplits = [
  '@atlaskit-internal_editor-core_picker-facade.js',
  '@atlaskit-internal_editor-core-async.js',
  '@atlaskit-internal_media-editor-view.js',
  '@atlaskit-internal_media-viewer-pdf-viewer.js',
];

const knownSplitsAssets = stats.assets
  .filter(asset => knownSplits.includes(asset.name))
  .map(asset => ({ ...asset, sizeInKb: (asset.size / 1000).toFixed(2) }));

console.log(knownSplitsAssets);

console.log('Sending analytics events...');

const events = knownSplitsAssets.map(asset => ({
  name: 'atlaskit.build.website.bundle.chunkSizeKb',
  properties: {
    chunkName: asset.name,
    chunkSizeKb: parseFloat(asset.sizeInKb),
  },
}));

sendAnalyticsEvents(events)
  .then(() => console.log('Success!'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

function sendAnalyticsEvents(events) {
  return fetch('https://analytics.atlassian.com/analytics/events', {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      events: events.map(event => ({
        name: event.name,
        properties: event.properties,
        server: 'dev',
        product: 'atlaskit',
        subproduct: 'website-bundle-splits',
        user: '-',
        serverTime: Date.now(),
      })),
    }),
  });
}
