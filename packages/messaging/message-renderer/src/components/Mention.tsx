import React from 'react';
import Dropdown, { DropdownItemGroup, DropdownItem } from '@uidu/dropdown-menu';
import { AtSign } from 'react-feather';
import StyledMention from '../styled/Mention';

export interface MentionProps {
  mentionLinks: Array<any>;
}

export default props => {
  return (
    <Dropdown
      className="align-middle"
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
  );
};
