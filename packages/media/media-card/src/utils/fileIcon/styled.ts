/* tslint:disable:variable-name */
import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { size } from '@uidu/media-ui';

export const FileTypeIcon: ComponentClass<HTMLAttributes<{}>> = styled.div`
  float: left;
  margin-right: 6px;
  position: relative;
  top: 1px;
  img {
    ${size('12px !important')};
  }
`;
