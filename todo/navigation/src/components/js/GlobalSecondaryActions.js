// @flow
import React, { PureComponent, type Element } from 'react';

export const maxSecondaryItems = 5;

function checkIfTooManySecondaryActions(actions = []) {
  if (actions.length > maxSecondaryItems) {
    // eslint-disable-next-line no-console
    console.warn(
      `AkGlobalNavigation will only render up to ${maxSecondaryItems} secondary actions.`,
    );
  }
}

type Props = {
  actions: Array<Element<any>>,
};

export default class GlobalSecondaryActions extends PureComponent<Props> {
  constructor(props: Props, context: {}) {
    super(props, context);
    checkIfTooManySecondaryActions(props.actions);
  }

  componentWillReceiveProps(nextProps: Props) {
    checkIfTooManySecondaryActions(nextProps.actions);
  }

  render() {
    return (
      <div>
        {this.props.actions.map((action, index) =>
          // eslint-disable-next-line react/no-array-index-key
          index < maxSecondaryItems ? <div key={index}>{action}</div> : null,
        )}
      </div>
    );
  }
}
