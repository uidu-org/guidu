import { QueryBuilder } from '@cubejs-client/react';
import { Groupers, TimeFrame, TimeFrameGrouper } from '@uidu/dashlet-controls';
import React from 'react';
import DashletHeader from './DashletHeader';

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

const availableGroupers: Array<Groupers> = [
  { name: 'day', title: 'Giornaliero' },
  { name: 'week', title: 'Settimanale' },
  { name: 'month', title: 'Mensile' },
  { name: 'year', title: 'Annuale' },
];

export default function Dashlet({
  dashlet,
  component: DashletContent,
  showHeader = true,
  isCard = true,
  rowData,
  ...rest
}: any) {
  return (
    <QueryBuilder
      query={
        dashlet.query || {
          measures: ['Donations.amount'],
          timeDimensions: [
            {
              dimension: 'Donations.createdAt',
              granularity: 'month',
            },
          ],
          filters: [],
        }
      }
      render={(cubejsQueryProps) => {
        const { timeDimensions, updateTimeDimensions } = cubejsQueryProps;
        let timeDimension;
        if (timeDimensions.length > 0) {
          timeDimension = timeDimensions[0];
        }

        return (
          <div className={`h-100${isCard ? ' card' : ' d-flex flex-column'}`}>
            {showHeader && (
              <DashletHeader
                name={dashlet.label}
                description={dashlet.description}
                isCard={isCard}
              >
                <div className="">
                  {timeDimension && (
                    <TimeFrame
                      activeTimeFrame={timeDimension.dateRange}
                      onChange={(name) => {
                        updateTimeDimensions.update(timeDimension, {
                          ...timeDimension,
                          dateRange: name,
                        });
                      }}
                      timeframes={DateRanges}
                    />
                  )}
                  {timeDimension && (
                    <TimeFrameGrouper
                      groupers={timeDimension.dimension.granularities}
                      activeGrouper={timeDimension.granularity}
                      onChange={(name) => {
                        updateTimeDimensions.update(timeDimension, {
                          ...timeDimension,
                          granularity: name,
                        });
                      }}
                    />
                  )}
                </div>
              </DashletHeader>
            )}
            <DashletContent {...rest} {...dashlet} {...cubejsQueryProps} />
          </div>
        );
      }}
    />
  );
}
