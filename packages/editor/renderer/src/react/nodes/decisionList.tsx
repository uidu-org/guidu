import { DecisionList as AkDecisionList } from '@uidu/task-decision';
import * as React from 'react';
import { Children, PureComponent } from 'react';

export interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default class DecisionList extends PureComponent<Props, {}> {
  render() {
    const { children } = this.props;

    if (Children.count(children) === 0) {
      return null;
    }

    return <AkDecisionList>{children}</AkDecisionList>;
  }
}
