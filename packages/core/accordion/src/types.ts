export type AccordionPropTypesBase = {
  arrows: any;
  /** Open only one item at a time or not */
  reverse?: boolean;
  /** Open only one item at a time or not */
  allowMultipleExpanded?: boolean;
  /** Allow accordion to close on click */
  allowZeroExpanded?: boolean;
  /** Open only one item at a time or not */
  items: Array<any>;
  /** Display a tooltip on hover */
  enableTooltip?: boolean;
  /** Assign specific tabIndex order to the underlying node. */
  tabIndex?: number;
  /** Assign specific tabIndex order to the underlying node. */
  preExpanded?: Array<any>;
};

export type AccordionPropTypes = AccordionPropTypesBase & {
  onChange?: (expanded: string[]) => void;
  /** Handler to be called on click. */
  onClick?: ({
    event,
    item,
  }: {
    event: KeyboardEvent | MouseEvent;
    item: any;
  }) => void;
};
