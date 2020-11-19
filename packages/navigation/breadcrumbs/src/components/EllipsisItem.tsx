import React from 'react';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Button from '../styled/Button';
import Separator from '../styled/Separator';

interface IProps {
  hasSeparator?: boolean;
  onClick?: (event: React.MouseEvent) => any;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
}

export default function EllipsisItem({
  hasSeparator = false,
  onClick = () => {},
  testId,
}: IProps) {
  return (
    <ItemWrapper>
      <Button
        appearance="subtle-link"
        spacing="none"
        testId={testId}
        onClick={onClick}
      >
        &hellip;
      </Button>
      {hasSeparator ? <Separator>/</Separator> : null}
    </ItemWrapper>
  );
}
