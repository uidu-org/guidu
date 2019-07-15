import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { externalPackages as packages, getConfig } from '../site';
import * as fs from '../utils/fs';

const renderRow = (
  { name: packageName, description, maintainers, version },
  { id },
  groupId,
) => {
  return {
    id,
    url: `/packages/${groupId}/${id}`,
    name: fs.titleize(id),
    description,
    version,
    package: `https://www.npmjs.com/package/${packageName}`,
  };
};

const StatRows = () =>
  fs
    .getDirectories(packages.children)
    .reduce<Array<ReturnType<typeof renderRow>>>(
      (acc, team) =>
        acc.concat(
          fs.getDirectories(team.children).map(pkg => {
            const pkgJSON = getConfig(team.id, pkg.id).config;
            return renderRow(pkgJSON, pkg, team.id);
          }),
        ),
      [],
    );

export default function PackagesList() {
  return (
    <Fragment>
      <Helmet>
        <title>{`Browse all packages - ${BASE_TITLE}`}</title>
      </Helmet>
      <ShellHeader className="px-3 px-xl-4">Packages</ShellHeader>
      <ShellBody scrollable>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {StatRows().map(row => (
              <tr>
                <td>
                  <a href={row.url}>{row.name}</a>
                </td>
                <td>{row.description}</td>
                <td>
                  <a href={row.package}>{row.version}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ShellBody>
    </Fragment>
  );
}
