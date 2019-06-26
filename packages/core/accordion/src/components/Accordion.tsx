import React, { PureComponent } from 'react';
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

export default class Accordion extends PureComponent<AccordionPropTypes> {
  static defaultProps = {
    arrows: {
      default: {
        default: ChevronLeft,
        expanded: ChevronDown,
      },
      reverse: {
        default: ChevronRight,
        expanded: ChevronDown,
      },
    },
    accordion: true,
    items: [],
    allowMultipleExpanded: true,
    allowZeroExpanded: true,
    // enableTooltip: true,
  };

  renderTitle = (item, expanded) => {
    const { reverse, arrows } = this.props;
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

  render() {
    const { items, allowMultipleExpanded, allowZeroExpanded } = this.props;

    return (
      <StyledAccordion
        allowMultipleExpanded={allowMultipleExpanded}
        allowZeroExpanded={allowZeroExpanded}
      >
        {items.map((item, index) => (
          <AccordionItem uuid={item.uuid} key={index} {...item.props}>
            <AccordionItemHeading>
              <AccordionItemState>
                {({ expanded }) => this.renderTitle(item, expanded)}
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
