// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { Link } from '../../components/WrappedLink';

import Btn from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Icon from '@atlaskit/icon/glyph/bullet-list';

import { colors, gridSize, math, themed } from '@atlaskit/theme';

import Changelog, { type Logs } from '../../components/ChangeLog';

const LatestChange = ({
  changelog,
  pkgId,
  groupId,
}: {
  changelog: Logs,
  pkgId: string,
  groupId: string,
}) => {
  if (!changelog || !changelog[0] || !changelog[0].version) return null;

  return (
    <LogWrapper>
      <Latest />
      <Changelog
        changelog={changelog}
        range={changelog[0].version}
        packageName={pkgId}
      />
      <Button
        component={Link}
        iconBefore={<Icon label="List icon" />}
        to={`/packages/${groupId}/${pkgId}/changelog`}
      >
        Changelog
      </Button>
    </LogWrapper>
  );
};

const LogWrapper = styled.div`
  border-top: 2px solid ${themed({ light: colors.N30, dark: colors.DN60 })};
  margin-bottom: 2em;
  padding-top: ${math.multiply(gridSize, 3)}px;
  position: relative;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  ul {
    padding-left: ${math.multiply(gridSize, 4)}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const Button = styled(Btn)`
  position: absolute;
  right: 0;
  top: ${math.multiply(gridSize, 3)}px;
`;
const Latest = ({ children, ...rest }: { children?: Node | string }) => (
  <span style={{ position: 'relative', top: -3 }}>
    <Lozenge appearance="new" {...rest}>
      {children || 'Latest'}
    </Lozenge>
  </span>
);

export default LatestChange;
