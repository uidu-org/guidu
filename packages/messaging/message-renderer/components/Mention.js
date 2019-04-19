import React from 'react';
import Dropdown, { DropdownItemGroup, DropdownItem } from '@uidu/dropdown-menu';
import { AtSign } from 'react-feather';
import StyledMention from '../styled/Mention';
export default (function (props) {
    return (React.createElement(Dropdown, { className: "align-middle", boundariesElement: "scrollParent", trigger: React.createElement(StyledMention, null,
            React.createElement(AtSign, { size: '.8rem', className: "mr-1" }),
            props.display) },
        React.createElement(DropdownItemGroup, null, props.mentionLinks(props).map(function (link, index) { return (React.createElement(DropdownItem, { key: index, href: link.link }, link.name)); }))));
});
//# sourceMappingURL=Mention.js.map