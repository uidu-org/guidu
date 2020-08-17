import { code, Example, md } from '@uidu/docs';
import React from 'react';

export default md`
  ### Message
  <p class="lead">This package exports an number of different Message related components:</p>

  - Message (Default Export)
  - MessageLog
  - MessageActions
  - MessageAttachments
  - Skeleton


  Use the \`Message\` component to represent a message exhanged in teams and private messages.
  Optionally, a presence to indicate online status can also be displayed.

  You can use the \`Presence\` component independently for contexts where the
  profile picture is not required (e.g. next to a username).

  ## Usage

  ${code`import Message, {
  MessageActions,
  MessageAttachments,
  MessageLog,
} from '@uidu/message';`}

  ${(
    <Example
      packageName="@uidu/message"
      Component={require('../examples/00-basic').default}
      title="Message"
      source={require('!!raw-loader!../examples/00-basic').default}
    />
  )}
`;

// ${(
//     <Props
//       heading="Avatar Props"
//       props={require('!!extract-react-types-loader!../src/components/Avatar')}
//     />
//   )}
