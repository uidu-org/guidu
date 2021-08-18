import { useCubeQuery } from '@cubejs-client/react';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import tw from 'twin.macro';
import DashletHeader from './DashletHeader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    style={{
      width: '100%',
      height: '100%',
    }}
    backgroundColor="#F5F7F8"
    backgroundOpacity={1}
    foregroundColor="#F5F7F8"
    foregroundOpacity={0.6}
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
  </ContentLoader>
);

const DateRanges = [
  { name: undefined, title: 'All time' },
  { name: 'Today', title: 'Today' },
  { name: 'Yesterday', title: 'Yesterday' },
  { name: 'This week', title: 'This week' },
  { name: 'This month', title: 'This month' },
  { name: 'This quarter', title: 'This quarter' },
  { name: 'This year', title: 'This year' },
  { name: 'Last 7 days', title: 'Last 7 days' },
  { name: 'Last 30 days', title: 'Last 30 days' },
  { name: 'Last week', title: 'Last week' },
  { name: 'Last month', title: 'Last month' },
  { name: 'Last quarter', title: 'Last quarter' },
  { name: 'Last year', title: 'Last year' },
];

// const availableGroupers: Array<Groupers> = [
//   { name: 'day', title: 'Giornaliero' },
//   { name: 'week', title: 'Settimanale' },
//   { name: 'month', title: 'Mensile' },
//   { name: 'year', title: 'Annuale' },
// ];

export const Card = styled.div`
  ${tw`background[rgb(var(--body-on-primary-bg))] border rounded overflow-hidden h-full flex-col flex`}
`;

export default function Dashlet({
  dashlet,
  component: DashletContent,
  showHeader = true,
  isCard = true,
  ...rest
}: any) {
  // this dashlet passes data without query
  const { data } = dashlet;
  if (data) {
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
  } else {
    const { resultSet, isLoading, error } = useCubeQuery(dashlet.query);

    if (isLoading) {
      return (
        <Card>
          <MyLoader />
        </Card>
      );
    }

    if (error) {
      console.log(error);
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
}
