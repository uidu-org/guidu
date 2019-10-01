/**
 * Largely taken from analytics-web-react
 */
import merge from 'lodash.merge';
import { NAVIGATION_CONTEXT } from '@uidu/analytics-namespaced-context';
import { UIAnalyticsEvent } from '@uidu/analytics';

const extractFromEventContext = (
  propertyNames: string[],
  event: UIAnalyticsEvent,
  namespacedContextOnly = true,
): any[] =>
  event.context
    .reduce((acc, contextItem) => {
      propertyNames.forEach(propertyName => {
        const navContext = contextItem[NAVIGATION_CONTEXT];
        const navContextProp = navContext ? navContext[propertyName] : null;
        acc.push(
          namespacedContextOnly
            ? navContextProp
            : navContextProp || contextItem[propertyName],
        );
      });
      return acc;
    }, [])
    .filter(Boolean);

export const getSources = (event: UIAnalyticsEvent) =>
  extractFromEventContext(['source'], event, false);

export const getComponents = (event: UIAnalyticsEvent) =>
  extractFromEventContext(['component', 'componentName'], event, false);

export const getExtraAttributes = (event: UIAnalyticsEvent) =>
  extractFromEventContext(['attributes'], event).reduce(
    (result, extraAttributes) => merge(result, extraAttributes),
    {},
  );

export const getPackageInfo = (event: UIAnalyticsEvent) =>
  event.context
    .map(contextItem => {
      const navContext = contextItem[NAVIGATION_CONTEXT];
      const item = navContext ? navContext : contextItem;
      return {
        packageName: item.packageName,
        packageVersion: item.packageVersion,
      };
    })
    .filter(p => p.packageName);

export const getPackageVersion = (event: UIAnalyticsEvent) =>
  extractFromEventContext(['packageVersion'], event);
