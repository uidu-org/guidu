const getLinkMD = commit =>
  `[${commit}](https://github.org/uidu-org/guidu/commits/${commit})`;

const getReleaseLine = async (changeset, versionType) => {
  const indentedSummary = changeset.summary
    .split('\n')
    .map(l => `  ${l}`.trimRight())
    .join('\n');

  return `- [${versionType}] ${getLinkMD(
    changeset.commit,
  )}:\n\n${indentedSummary}`;
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    changeset => `- Updated dependencies ${getLinkMD(changeset.commit)}:`,
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`,
  );

  return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};

const changesetOptions = {
  commit: true,
};
const versionOptions = {
  commit: true,
  skipCI: true,
  getReleaseLine,
  getDependencyReleaseLine,
};

const publishOptions = {
  public: true,
};

module.exports = {
  versionOptions,
  changesetOptions,
  publishOptions,
};
