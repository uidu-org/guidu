const getLinkMD = commit =>
  `[${commit}](https://github.org/uidu-org/guidu/commits/${commit})`;

export const getReleaseLine = async (changeset, versionType) => {
  const indentedSummary = changeset.summary
    .split('\n')
    .map(l => `  ${l}`.trimRight())
    .join('\n');

  return `- [${versionType}] ${getLinkMD(
    changeset.commit,
  )}:\n\n${indentedSummary}`;
};

export const getDependencyReleaseLine = async (
  changesets,
  dependenciesUpdated,
) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    changeset => `- Updated dependencies ${getLinkMD(changeset.commit)}:`,
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`,
  );

  return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};
