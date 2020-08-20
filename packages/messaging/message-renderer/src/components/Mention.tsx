import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React from 'react';
import { AtSign } from 'react-feather';
import styled from 'styled-components';
import StyledMention from '../styled/Mention';

const StyledMentionWrapper = styled.div`
  display: inline-block;
`;

export interface MentionProps {
  mentionLinks: Array<any>;
}

export default (props) => {
  return (
    <StyledMentionWrapper>
      <Dropdown
        // className="align-text-top"
        boundariesElement="scrollParent"
        trigger={
          <StyledMention>
            <AtSign size={'.8rem'} className="mr-1" />
            {props.display}
          </StyledMention>
        }
      >
        <DropdownItemGroup>
          {props.mentionLinks(props).map((link, index) => (
            <DropdownItem key={index} href={link.link}>
              {link.name}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </Dropdown>
    </StyledMentionWrapper>
  );
};
