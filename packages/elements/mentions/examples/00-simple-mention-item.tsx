import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { generateMentionItem, onSelection } from '../examples-utils';
import { MentionItem } from '../src';

export default function Example() {
  const mention = {
    id: '666',
    name: 'Craig Petchell',
    mentionName: 'petch',
  };
  const description = 'Simple mention item with no nickname or avatar';
  const component = (
    <IntlProvider locale="en">
      <MentionItem mention={mention} onSelection={onSelection} />
    </IntlProvider>
  );

  return generateMentionItem(component, description);
}
