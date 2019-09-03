// @flow
/* This script creates the folder per entry point and add a package.json that maps the path to the entry point .*/
/**
 * Input:
 * packages/pkg/ 
 * └── src
 *     ├── index.ts
 *     ├── a.ts
 *     └── b.ts
 *
 * Output:
 * packages/pkg/
 * ├── dist
 * |   └── esm
 * |       ├── a.js
 * |       └── b.js
 * |   └── cjs
 * |       ├── a.js
 * |       └── b.js
 * ├── a
 * |   └── package.json
 * └── b
 *     └── package.json
 *
 * Folder a -> package.json:
 * {
 * "name": "@atlaskit/bagde",
   "main": "../../dist/esm/a.js",
   "modules": "../../dist/cjs/a.js",
   "types": "../../dist/cjs/a.d.ts",
 */
const { createEntryPointsDirWithPkgJson } = require('./createEntryPointsUtils');

createEntryPointsDirWithPkgJson();
