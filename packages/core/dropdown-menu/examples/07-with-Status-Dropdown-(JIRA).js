// @flow

import Lozenge from '@uidu/lozenge';
import React from 'react';
import { ArrowRight } from 'react-feather';
import styled from 'styled-components';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

const JiraItem = styled.div`
  align-items: center;
  display: flex;
  width: 105px;
`;

export default () => (
  <DropdownMenu
    defaultOpen
    triggerType="button"
    trigger="To do"
    onItemActivated={item => {
      // you can do allthethings here!
      console.log(item);
    }}
  >
    <DropdownItemGroup>
      <DropdownItem
        elemAfter={
          <JiraItem>
            <ArrowRight label="" size="small" />
            <Lozenge appearance="inprogress">in progress</Lozenge>
          </JiraItem>
        }
      >
        Status project
      </DropdownItem>
      <DropdownItem
        elemAfter={
          <JiraItem>
            <ArrowRight label="" size="small" />
            <Lozenge appearance="success">Done</Lozenge>
          </JiraItem>
        }
      >
        Move to done
      </DropdownItem>
      <DropdownItem>View workflow</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
);
