// @flow
import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Available Message Actions

  - MessageActions (Default Export)
  - MessageActionPin (to pin message)
  - MessageActionReply (to reply to message)
  - MessageActionReactions (to add reactions to message)
  - MessageActionMore (to show more options)

  ## Usage

  ${code`import Message, {
  MessageActions,
  MessageActionPin,
  MessageActionReply,
  MessageActionReactions,
  MessageActionMore,
} from '@uidu/message';`}

  ${(
    <Example
      packageName="@uidu/message"
      Component={require('../examples/02-with-actions').default}
      title="Message"
      source={require('!!raw-loader!../examples/02-with-actions')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/Pin')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/Pin')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/Reply')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/Reactions')
          .default
      }
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={
        require('!!extract-react-types-loader!../src/components/MessageActions/More')
          .default
      }
    />
  )}
`;
