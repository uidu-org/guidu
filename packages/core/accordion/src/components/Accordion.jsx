// @flow

import React, { PureComponent } from 'react';
import { AccordionItem } from 'react-accessible-accordion';

import StyledAccordion from '../styled/Accordion';
import StyledAccordionItemTitle from '../styled/AccordionItemTitle';
import StyledAccordionItemBody from '../styled/AccordionItemBody';
import StyledAccordionItemTitleArrow from '../styled/AccordionItemTitleArrow';

import type { AccordionPropTypes } from '../types';

export default class Accordion extends PureComponent<AccordionPropTypes> {
  static defaultProps = {
    arrow: StyledAccordionItemTitleArrow,
    accordion: true,
    items: [],
    enableTooltip: true,
  };

  render() {
    const { items, arrow: Arrow } = this.props;

    return (
      <StyledAccordion {...this.props}>
        {items.map(item => (
          <AccordionItem {...item.props}>
            <StyledAccordionItemTitle {...item.titleProps}>
              {item.title}
              <Arrow />
            </StyledAccordionItemTitle>
            <StyledAccordionItemBody {...item.bodyProps}>
              {item.body}
            </StyledAccordionItemBody>
          </AccordionItem>
        ))}
      </StyledAccordion>
    );
  }
}
