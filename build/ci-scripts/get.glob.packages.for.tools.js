const {
  getPackagesInfo,
  TOOL_NAME_TO_FILTERS,
} = require('@uidu/build-utils/tools');

(async () => {
  let cwd = process.cwd();
  let toolNames = process.argv.slice(2);

  if (!toolNames.length) {
    console.error(
      `Please pass one or more tool names (${Object.keys(
        TOOL_NAME_TO_FILTERS,
      ).join(', ')})`,
    );
    throw process.exit(1);
  }

  let filters = toolNames.map((toolName) => {
    let filterFn = TOOL_NAME_TO_FILTERS[toolName];

    if (!filterFn) {
      console.error(
        `Invalid tool name: "${toolName}" (${Object.keys(
          TOOL_NAME_TO_FILTERS,
        ).join(', ')})`,
      );
      throw process.exit(1);
    }

    return filterFn;
  });

  let packages = await getPackagesInfo(cwd);
  let relativePaths = packages
    .filter((pkg) => filters.every((filter) => filter(pkg)))
    .map((pkg) => pkg.relativeDir);

  console.log(
    relativePaths.length > 1 ? `{${relativePaths.join()}}` : relativePaths[0],
  );
})();
