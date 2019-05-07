// @flow
import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

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
      props={
        require('!!extract-react-types-loader!../src/components/MessageReactions')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Message Action Reactions Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/Reactions')
          .default
      }
    />
  )}
`;
