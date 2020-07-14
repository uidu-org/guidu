import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';
import TaskDecisionExample from '../examples/00-decision-item';

const TaskDecisionSource = require('!!raw-loader!../examples/00-decision-item')
  .default;

const TaskDecisionProps = require('!!extract-react-types-loader!../src/components/DecisionItem');

export default md`

  ## Usage

  Use the component in your React app as follows:

  ${code`
  import { DecisionList, DecisionItem } from '@uidu/task-decision';
  ReactDOM.render(<DecisionItem>A decision</DecisionItem>, container);
  ReactDOM.render(
    <DecisionList>
      <DecisionItem>A decision</DecisionItem>
      <DecisionItem>Another decision</DecisionItem>
    </DecisionList>,
    container,
  );
   };`}

   ${(
     <Example
       packageName="@uidu/status"
       Component={TaskDecisionExample}
       title="Status Picker"
       source={TaskDecisionSource}
     />
   )}

  ${(<Props heading="Decision Props" props={TaskDecisionProps} />)}
`;
// TODO: Add more information for task.
