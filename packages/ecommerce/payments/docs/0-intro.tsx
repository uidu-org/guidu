import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Payments
  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import { Payments, Subscription, PayWithCard, PayWithBank } from '@uidu/payments';`}

  ${(
    <Example
      packageName="@uidu/payments"
      Component={require('../examples/Elements').default}
      title="Elements"
      source={require('!!raw-loader!../examples/Elements').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/payments"
      Component={require('../examples/SinglePayment').default}
      title="SinglePayment"
      source={require('!!raw-loader!../examples/SinglePayment').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/payments"
      Component={require('../examples/Subscription').default}
      title="Subscription"
      source={require('!!raw-loader!../examples/Subscription').default}
    />
  )}


  ${(
    <Props
      heading="PaymentProps"
      props={require('!!extract-react-types-loader!../src/components/Payments')}
    />
  )}

  ${(
    <Props
      heading="SubscriptionProps"
      props={require('!!extract-react-types-loader!../src/components/Subscription')}
    />
  )}
`;

// ${(
//   <Example
//     packageName="@uidu/stepper"
//     Component={require('../examples/MultipleProviders').default}
//     title="Multiple providers"
//     source={require('!!raw-loader!../examples/MultipleProviders').default}
//   />
// )}
