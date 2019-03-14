import { IntlProvider, intlShape } from 'react-intl';
import { mount, ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';

export const mountWithIntlContext = <P, S>(
  node: ReactElement<P>,
  reactContext?: Object,
  childContextTypes?: Object,
): ReactWrapper<P, S> => {
  const intlProvider = new IntlProvider({
    locale: 'en',
    messages: {},
  });
  const intl = intlProvider.getChildContext().intl;

  return mount<P, S>(node, {
    context: { intl, ...reactContext },
    childContextTypes: { intl: intlShape, ...childContextTypes },
  });
};
