import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { MentionItem } from '../src';
import { generateMentionItem, onSelection } from '../example-helpers';

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
