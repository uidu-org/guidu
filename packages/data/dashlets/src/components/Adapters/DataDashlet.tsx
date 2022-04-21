import React from 'react';
import { Card } from '../../styled';
import { DashletProps } from '../../types';
import DashletHeader from '../DashletHeader';

export default function DataDashlet({
  dashlet,
  component: DashletContent,
  showHeader = true,
  isCard = true,
  ...rest
}: {
  dashlet: DashletProps;
  component: React.ComponentType<any>;
  showHeader?: boolean;
  isCard?: boolean;
}) {
  // this dashlet passes data without query
  const { data } = dashlet;
  return (
    <Card>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <DashletContent {...rest} {...dashlet} data={data} />
    </Card>
  );
}
