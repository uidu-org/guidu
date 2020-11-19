import {
  createAndFireEvent,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
import AKTooltip from '@uidu/tooltip';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Button from '../styled/Button';
import Separator from '../styled/Separator';
import pkg from '../version.json';

interface IProps extends WithAnalyticsEventsProps {
  /** Whether this item will be followed by a separator. */
  hasSeparator?: boolean;
  /** The url or path which the breadcrumb should act as a link to. */
  href?: string;
  /** An icon to display before the breadcrumb. */
  iconBefore?: React.ReactChild;
  /** An icon to display after the breadcrumb. */
  iconAfter?: React.ReactChild;
  /** Handler to be called on click. **/
  onClick?: (event: React.MouseEvent) => void;
  /** The text to appear within the breadcrumb as a link. */
  text: string | ReactElement;
  /** The maximum width in pixels that an item can have before it is truncated.
  If this is not set, truncation will only occur when it cannot fit alone on a
  line. If there is no truncationWidth, tooltips are not provided on truncation. */
  truncationWidth?: number;
  target?: '_blank' | '_parent' | '_self' | '_top' | '';
  /** Provide a custom component to use instead of the default button.
   *  The custom component should accept a className prop so it can be styled
   *  and possibly all action handlers */
  component?: React.ClassType<any, any, any>;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
}

function BreadcrumbsItem({
  hasSeparator = false,
  href = '#',
  truncationWidth = 0,
  onClick = () => {},
  iconAfter,
  iconBefore,
  target,
  text,
  component,
  testId,
}: IProps) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    updateOverflow();
  }, []);

  const updateOverflow = () => {
    if (truncationWidth && button.current) {
      const overflow = button.current.clientWidth >= truncationWidth;
      if (overflow !== hasOverflow) {
        setHasOverflow(overflow);
      }
      return overflow;
    }
    return false;
  };

  const renderButton = () => {
    return (
      <Button
        truncationWidth={truncationWidth}
        appearance="subtle-link"
        iconAfter={truncationWidth && hasOverflow ? undefined : iconAfter}
        iconBefore={truncationWidth && hasOverflow ? undefined : iconBefore}
        onClick={onClick}
        spacing="none"
        href={href}
        target={target}
        ref={button}
        component={component}
        // @ts-ignore - 31052019 VBZ - this shouldn't exist right?
        analyticsContext={{
          componentName: 'breadcrumbsItem',
          packageName: pkg.name,
          packageVersion: pkg.version,
        }}
        testId={testId}
      >
        {text}
      </Button>
    );
  };

  const renderButtonWithTooltip = () => (
    <AKTooltip content={text} position="bottom">
      {renderButton()}
    </AKTooltip>
  );

  return (
    <ItemWrapper>
      {hasOverflow && truncationWidth
        ? renderButtonWithTooltip()
        : renderButton()}
      {hasSeparator ? <Separator>/</Separator> : null}
    </ItemWrapper>
  );
}

export { BreadcrumbsItem as BreadcrumbsItemWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsEvents({
  onClick: createAndFireEventOnGuidu({
    action: 'clicked',
    actionSubject: 'breadcrumbsItem',

    attributes: {
      componentName: 'breadcrumbsItem',
      packageName: pkg.name,
      packageVersion: pkg.version,
    },
  }),
})(BreadcrumbsItem);
