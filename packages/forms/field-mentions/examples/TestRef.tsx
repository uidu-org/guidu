import React from 'react';
import {
  FieldExampleRefs,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import { users } from '../examples-utils';
import FieldMentions from '../src';

export default function TestRef() {
  return (
    <FieldExampleRefs
      {...inputDefaultProps}
      component={FieldMentions}
      items={[
        {
          trigger: '@',
          data: users,
          // style: {
          //   ...mentionDefaultStyles,
          // },
          // renderSuggestion: renderContactSuggestion
        },
      ]}
    />
  );
}
