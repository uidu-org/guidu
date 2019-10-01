import * as React from 'react';
import { StatelessComponent } from 'react';

import { DecisionItem as AkDecisionItem } from '@uidu/task-decision';

const DecisionItem: StatelessComponent = ({ children }) => {
  return <AkDecisionItem>{children}</AkDecisionItem>;
};

export default DecisionItem;
