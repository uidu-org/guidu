// @flow

import React, { PureComponent } from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemState,
} from 'react-accessible-accordion';
import StyledAccordion from '../styled/Accordion';
import StyledAccordionItemButton from '../styled/AccordionItemButton';
import StyledAccordionItemBody from '../styled/AccordionItemBody';
import StyledAccordionItemTitleArrow from '../styled/AccordionItemTitleArrow';

import { ChevronLeft, ChevronDown } from 'react-feather';

import type { AccordionPropTypes } from '../types';

export default class Accordion extends PureComponent<AccordionPropTypes> {
  static defaultProps = {
    arrow: StyledAccordionItemTitleArrow,
    accordion: true,
    items: [],
    allowMultipleExpanded: true,
    allowZeroExpanded: true,
    // enableTooltip: true,
  };

  render() {
    const { items } = this.props;

    return (
      <StyledAccordion {...this.props}>
        {items.map((item, index) => (
          <AccordionItem key={index} {...item.props}>
            <AccordionItemHeading>
              <AccordionItemState>
                {({ expanded }) => (
                  <StyledAccordionItemButton {...item.titleProps}>
                    {item.title}
                    {expanded ? <ChevronDown /> : <ChevronLeft />}
                  </StyledAccordionItemButton>
                )}
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
}
