import Lozenge from '@uidu/lozenge';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import React from 'react';
import { ArrowRight } from 'react-feather';
import styled from 'styled-components';
import DropdownMenu from '../src';

const JiraItem = styled.div`
  align-items: center;
  display: flex;
  width: 105px;
`;

export default () => (
  <DropdownMenu defaultOpen trigger="To do">
    <MenuGroup>
      <ButtonItem
        elemAfter={
          <JiraItem>
            <ArrowRight label="" size="small" />
            <Lozenge appearance="inprogress">in progress</Lozenge>
          </JiraItem>
        }
      >
        Status project
      </ButtonItem>
      <ButtonItem
        elemAfter={
          <JiraItem>
            <ArrowRight label="" size="small" />
            <Lozenge appearance="success">Done</Lozenge>
          </JiraItem>
        }
      >
        Move to done
      </ButtonItem>
      <ButtonItem>View workflow</ButtonItem>
    </MenuGroup>
  </DropdownMenu>
);
