import { useDashboardManager } from '@uidu/dashboard-manager';
import { query } from 'gql-query-builder';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DashletCard from '../components/DashletCard';
import DashletHeader from '../components/DashletHeader';
import DashletLoader from '../components/DashletLoader';
import { DashletProps } from '../types';

export default function GQLDashlet({
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
  const { apiUrl } = useDashboardManager();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const taggedQuery = query(dashlet.gql);

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taggedQuery),
    })
      .then((response) =>
        response
          .json()
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch(setError),
      )
      .catch(setError);
  }, []);

  // fetch query

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

  const transformedData = dashlet.dataTransformer(data);

  return (
    <DashletCard>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <DashletContent {...rest} {...dashlet} data={transformedData} />
    </DashletCard>
  );
}
