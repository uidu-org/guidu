import React, { useState } from 'react';
import BreadcrumbsStateless from './BreadcrumbsStateless';

interface IProps {
  /** Set the maximum number of breadcrumbs to display. When there are more
  than the maximum number, only the first and last will be shown, with an
  ellipsis in between. */
  maxItems?: number;
  /** The items to be included inside the Breadcrumbs wrapper */
  children?: React.ReactNode;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
}

export default function Breadcrumbs(props: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => setIsExpanded(true);
  return (
    <BreadcrumbsStateless
      {...props}
      isExpanded={isExpanded}
      onExpand={expand}
    />
  );
}
