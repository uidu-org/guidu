import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Select from 'react-select';
import createSelect from './createSelect';
import pkg from './version.json';

export const SelectWithoutAnalytics = createSelect(Select);
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default (withAnalyticsContext({
  componentName: 'select',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onChange: createAndFireEventOnGuidu({
      action: 'changed',
      actionSubject: 'option',
      attributes: {
        componentName: 'select',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(SelectWithoutAnalytics),
) as unknown) as ReturnType<typeof createSelect>;
