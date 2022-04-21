import { useCubeQuery } from '@cubejs-client/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card } from '../../styled';
import { DashletProps } from '../../types';
import DashletHeader from '../DashletHeader';
import Loader from '../Loader';

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
      <Card>
        <Loader />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <FormattedMessage
          defaultMessage="Error loading {name}"
          values={{ name: dashlet.label }}
        />
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <DashletContent {...rest} {...dashlet} resultSet={resultSet} />
    </Card>
  );
}
