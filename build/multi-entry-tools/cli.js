#!/usr/bin/env node

const getAlternativeEntryPointAliasMap = require('./module-resolve-map-builder');

async function main() {
  console.log(JSON.stringify(await getAlternativeEntryPointAliasMap()));
}

main();
