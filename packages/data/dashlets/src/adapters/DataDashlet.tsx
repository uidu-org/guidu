import React from 'react';
import DashletCard from '../components/DashletCard';
import DashletHeader from '../components/DashletHeader';
import { DashletProps } from '../types';

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
    <DashletCard>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <DashletContent {...rest} {...dashlet} data={data} />
    </DashletCard>
  );
}
