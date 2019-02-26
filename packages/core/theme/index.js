// @flow
/*
WARNING - THIS FILE IS ODD - PLEASE READ WHY BELOW

THIS FILE SHOULD NOT BE ON NPM - either npm ignored OR not in the `files` field of the package.json

Currently we are using babel-node to run build scripts in the css-packs.
Since node will always resolve main and that doesn't exist on disk, it falls
back to the index file (this file) - which will get correct resolutions.

THIS IS OBVIOUSLY A HACK

There is an alternative hack below if you want to force the resolution
to `uidu:src`:

This relies on being able to resolve local files through `uidu:src`,
otherwise it will fail to find. If you want to resolve to `uidu:src`
you can see how to do that here: https://github.com/Noviny/snippets/blob/master/resolve-override.js
*/

export * from './src';
