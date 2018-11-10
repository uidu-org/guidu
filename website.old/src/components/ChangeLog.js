// @flow

import React, { Children, Component, type Node } from 'react';
import ReactMarkdown from 'react-markdown';
import semver from 'semver';
import styled, { css } from 'styled-components';
import { math, gridSize, colors, borderRadius } from '@atlaskit/theme';

const gutter = math.multiply(gridSize, 3);

const H3 = styled.h3`
  color: ${colors.N200};
  font-size: 18px;
  font-weight: normal;
`;
function getVersion(str: string) {
  return str.match(/^(\d+\.\d+\.\d+)/);
}
const Heading = ({
  children,
  packageName,
  href,
}: {
  children: Node,
  level: number,
  packageName: string,
  href: string,
}) => {
  const childrenArray = Children.toArray(children);
  const title = childrenArray[0];
  const version = getVersion(title.toString());

  // wrap children if they can't be rendered e.g. array
  if (childrenArray.length !== 1) return <div>{children}</div>;
  if (typeof title !== 'string') return <div>{children}</div>;
  if (!version) return <div>{children}</div>;

  const versionNumber = version[1];
  const versionDate = version[2];
  const anchorProps = {
    href,
    rel: 'noopener noreferrer',
    style: { fontWeight: 500 },
    target: '_blank',
  };
  return (
    <H3>
      <a {...anchorProps}>{versionNumber}</a>
      {versionDate ? <small> &mdash; {versionDate}</small> : null}
    </H3>
  );
};

const LogItem = styled.div`
  margin-bottom: 1em;

  ${p =>
    p.major
      ? css`
          &:not(:first-child) {
            border-top: 2px solid ${colors.N30};
            margin-top: ${gutter}px;
            padding-top: ${gutter}px;
          }
        `
      : null};
`;

export const NoMatch = styled.div`
  align-items: center;
  background-color: ${colors.N20};
  border-radius: ${borderRadius}px;
  color: ${colors.N200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${gutter}px;
  min-height: 120px;
`;

export type Log = { md: string, version: string };
export type Logs = Array<Log>;

type Props = {
  changelog: Logs,
  range?: string,
  packageName: string,
};

export default class ChangeLog extends Component<Props> {
  props: Props; // eslint-disable-line react/sort-comp
  render() {
    const { changelog, packageName, range } = this.props;
    const logs = range
      ? changelog.filter(e => semver.satisfies(e.version, range))
      : changelog;

    let currentMajor = 0;

    return (
      <div>
        {!logs.length ? (
          <NoMatch>No matching versions &mdash; please try again.</NoMatch>
        ) : (
          logs.map((v, i) => {
            const major = v.version.substr(0, 1);
            const majorHasChanged = currentMajor !== major;
            currentMajor = major;
            // In case of blank / empty changelogs, the default commit points to mk-2
            const href = `https://bitbucket.org/atlassian/${
              v.repository
            }/commits/tag/%40atlaskit%2F${packageName}%40${v.version}`;
            return (
              // Version is not unique enough due to untidy changelogs.
              /* eslint-disable react/no-array-index-key */
              <LogItem key={`${v.version}-${i}`} major={majorHasChanged}>
                <ReactMarkdown
                  escapeHtml
                  source={v.md}
                  renderers={{
                    Heading: props => (
                      <Heading
                        packageName={packageName}
                        href={href}
                        {...props}
                      />
                    ),
                  }}
                />
              </LogItem>
            );
          })
        )}
      </div>
    );
  }
}
