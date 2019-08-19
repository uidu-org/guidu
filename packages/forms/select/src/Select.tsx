import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Select from 'react-select';
import createSelect from './createSelect';
import { name as packageName, version as packageVersion } from './version.json';

export const SelectWithoutAnalytics = createSelect(Select);
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'select',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onChange: createAndFireEventOnGuidu({
      action: 'changed',
      actionSubject: 'option',

      attributes: {
        componentName: 'select',
        packageName,
        packageVersion,
      },
    }),
  })(SelectWithoutAnalytics),
);
