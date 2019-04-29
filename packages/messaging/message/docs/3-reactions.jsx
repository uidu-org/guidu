// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  Add reactions to a Message.

  ## Usage

  ${code`import Message, {
  MessageActions,
  MessageActionReactions,
  MessageReactions,
} from '@uidu/message';`}

  ${(
    <Example
      packageName="@uidu/message"
      Component={require('../examples/03-with-reactions').default}
      title="Message"
      source={require('!!raw-loader!../examples/03-with-reactions')}
    />
  )}

  ${(
    <Props
      heading="Message Reactions Props"
      props={require('!!extract-react-types-loader!../src/components/MessageReactions')}
    />
  )}

  ${(
    <Props
      heading="Message Action Reactions Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/Reactions')}
    />
  )}
`;
