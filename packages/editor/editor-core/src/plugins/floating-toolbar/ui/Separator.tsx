import { colors } from '@uidu/theme';
import React from 'react';
import styled from 'styled-components';

const Separator = styled.div`
  background: ${colors.N30};
  width: 1px;
  height: 20px;
`;

export default () => <Separator className="separator" />;
