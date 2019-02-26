// @flow
//
// This file is used in development with bolt to resolve the package (because it lives in `src/`) *without* building it.
//
// This file should be npm-ignored, so that it doesn't exist in the published package, and resolution
// falls through the `main` `package.json` field.
//
export { default } from './src';
