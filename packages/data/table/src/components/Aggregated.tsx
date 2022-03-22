import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useCallback, useState } from 'react';

export default function Aggregated(params) {
  const { setAggregation, column, value } = params;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Content = useCallback(
    () => (
      <MenuGroup>
        <Section>
          <ButtonItem onClick={() => setAggregation(column, 'sum')}>
            Sum
          </ButtonItem>
          <ButtonItem onClick={() => setAggregation(column, 'average')}>
            Average
          </ButtonItem>
        </Section>
      </MenuGroup>
    ),
    [setAggregation, column],
  );

  const Trigger = useCallback(
    (triggerProps) => (
      <div
        {...triggerProps}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        {column.aggregate}:{' '}
        {column.valueFormatter ? (
          <>{column.valueFormatter({ value })}</>
        ) : (
          value || null
        )}
      </div>
    ),
    [column, value],
  );

  if (!column.aggregate) return null;

  return (
    <Popup
      isOpen={isOpen}
      placement="right-start"
      rootBoundary="document"
      trigger={Trigger}
      onClose={() => setIsOpen(false)}
      content={Content}
    />
  );
}
