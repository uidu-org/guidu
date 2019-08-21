import React from 'react';
import AnalyticsContext from './AnalyticsContext';

export interface WithContextProps {
  analyticsContext?: Record<string, any>;
}

const withAnalyticsContext = (defaultData?: any) => <TOriginalProps extends {}>(
  Component:
    | React.ComponentClass<TOriginalProps>
    | React.FunctionComponent<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps & WithContextProps;

  const WithAnalyticsContext = React.forwardRef<any, ResultProps>(
    (props, ref) => {
      // @ts-ignore
      const { analyticsContext = {}, ...rest } = props;
      const analyticsData = {
        ...defaultData,
        ...analyticsContext,
      };

      return (
        <AnalyticsContext data={analyticsData}>
          <Component {...(rest as ResultProps)} ref={ref} />
        </AnalyticsContext>
      );
    },
  );

  // @ts-ignore
  WithAnalyticsContext.displayName = `WithAnalyticsContext(${Component.displayName ||
    Component.name})`;

  return WithAnalyticsContext;
};

export default withAnalyticsContext;
