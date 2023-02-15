import type { IntlShape } from 'react-intl';

import type { UIAnalyticsEventHandler } from '@uidu/analytics';

export type EditorReactContext = {
  getAtlaskitAnalyticsEventHandlers: () => UIAnalyticsEventHandler[];
  intl: IntlShape;
};
