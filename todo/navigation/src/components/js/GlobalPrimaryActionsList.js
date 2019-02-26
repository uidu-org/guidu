// @flow
import React, { PureComponent, type Element } from 'react';

export const maxPrimaryItems = 3;

function checkIfTooManyPrimaryActions(actions = []) {
  if (actions.length > maxPrimaryItems) {
    // eslint-disable-next-line no-console
    console.warn(
      `AkGlobalNavigation will only render up to ${maxPrimaryItems} primary actions.`,
    );
  }
}

type Props = {
  actions: Array<Element<any>>,
};

export default class GlobalPrimaryActionsList extends PureComponent<Props> {
  constructor(props: Props, context: {}) {
    super(props, context);
    checkIfTooManyPrimaryActions(props.actions);
  }

  componentWillReceiveProps(nextProps: Props) {
    checkIfTooManyPrimaryActions(nextProps.actions);
  }

  render() {
    return (
      <div>
        {this.props.actions.map((action, index) =>
          // eslint-disable-next-line react/no-array-index-key
          index < maxPrimaryItems ? <div key={index}>{action}</div> : null,
        )}
      </div>
    );
  }
}
