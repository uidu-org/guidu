import { useCubeQuery } from '@cubejs-client/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import DashletCard from '../components/DashletCard';
import DashletHeader from '../components/DashletHeader';
import DashletLoader from '../components/DashletLoader';
import { DashletProps } from '../types';

export default function CubeDashlet({
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
  const { resultSet, isLoading, error } = useCubeQuery(dashlet.query);

  if (isLoading) {
    return (
      <DashletCard>
        <DashletLoader />
      </DashletCard>
    );
  }

  if (error) {
    return (
      <DashletCard>
        <FormattedMessage
          defaultMessage="Error loading {name}"
          values={{ name: dashlet.label }}
        />
      </DashletCard>
    );
  }

  return (
    <DashletCard>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <DashletContent {...rest} {...dashlet} resultSet={resultSet} />
    </DashletCard>
  );
}
