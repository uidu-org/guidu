import React from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemState,
} from 'react-accessible-accordion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather';
import StyledAccordion from '../styled/Accordion';
import StyledAccordionItemBody from '../styled/AccordionItemBody';
import StyledAccordionItemButton from '../styled/AccordionItemButton';
import { AccordionPropTypes } from '../types';

export default function Accordion({
  arrows = {
    default: {
      default: ChevronLeft,
      expanded: ChevronDown,
    },
    reverse: {
      default: ChevronRight,
      expanded: ChevronDown,
    },
  },
  items = [],
  allowMultipleExpanded = true,
  allowZeroExpanded = true,
  reverse,
  preExpanded,
  onChange,
}: // enableTooltip: true,
AccordionPropTypes) {
  const renderTitle = (item, expanded) => {
    if (reverse) {
      const {
        reverse: { default: Default, expanded: Expanded },
      } = arrows;
      return (
        <StyledAccordionItemButton reverse {...item.titleProps}>
          {expanded ? (
            <Expanded className="mr-2" />
          ) : (
            <Default className="mr-2" />
          )}
          {item.title(expanded)}
        </StyledAccordionItemButton>
      );
    }

    const {
      default: { default: Default, expanded: Expanded },
    } = arrows;

    return (
      <StyledAccordionItemButton {...item.titleProps}>
        {item.title(expanded)}
        {expanded ? <Expanded /> : <Default />}
      </StyledAccordionItemButton>
    );
  };

  return (
    <StyledAccordion
      allowMultipleExpanded={allowMultipleExpanded}
      allowZeroExpanded={allowZeroExpanded}
      preExpanded={preExpanded}
      onChange={onChange}
    >
      {items.map((item, index) => (
        <AccordionItem uuid={item.uuid} key={index} {...item.props}>
          <AccordionItemHeading>
            <AccordionItemState>
              {({ expanded }) => renderTitle(item, expanded)}
            </AccordionItemState>
          </AccordionItemHeading>
          <StyledAccordionItemBody {...item.bodyProps}>
            {item.body}
          </StyledAccordionItemBody>
        </AccordionItem>
      ))}
    </StyledAccordion>
  );
}
