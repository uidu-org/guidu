import * as React from 'react';
import { IntlProvider } from 'react-intl';
import ManagedStatusPicker from '../examples-utils/ManagedStatusPicker';
import fr from '../src/i18n/fr';

export default () => (
  <IntlProvider locale="fr" messages={fr}>
    <ManagedStatusPicker
      initialSelectedColor={'green'}
      initialText={'In progress'}
    />
  </IntlProvider>
);
