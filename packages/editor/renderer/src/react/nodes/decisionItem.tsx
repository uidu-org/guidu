import { DecisionItem as AkDecisionItem } from '@uidu/task-decision';
import React from 'react';

const DecisionItem = ({ children }) => {
  return <AkDecisionItem>{children}</AkDecisionItem>;
};

export default DecisionItem;
