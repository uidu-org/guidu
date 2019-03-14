import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import Button from '@uidu/button';

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;

  height: 80px;
  padding: 26px 15px 23px 18px;
`;

export const InsertButton: ComponentClass<any> = styled(Button)`
  margin-right: 5px;
`;

export const CancelButton: ComponentClass<any> = styled(Button)``;
