// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

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
      Component={require('../examples/02-with-actions')}
      title="Message"
      source={require('!!raw-loader!../examples/02-with-actions')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/Pin')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/Pin')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/Reply')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/Reactions')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/MessageActions/More')}
    />
  )}
`;
