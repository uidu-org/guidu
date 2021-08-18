import Spinner from '@uidu/spinner';
import * as React from 'react';

const appearances: string[] = ['primary', 'danger'];

type Props = {
  spacing: string;
  isDisabled: boolean;
  isSelected: boolean;
  appearance?: string;
};

export default class LoadingSpinner extends React.Component<Props> {
  invertSpinner = () => {
    const { appearance, isSelected, isDisabled } = this.props;
    if (isSelected) {
      return true;
    }
    if (isDisabled) {
      return false;
    }
    if (appearance !== undefined) {
      if (appearances.indexOf(appearance) !== -1) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { spacing } = this.props;
    let spinnerSize = spacing !== 'default' ? 'xsmall' : 'small';

    return (
      <div tw="flex absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <Spinner size={spinnerSize} invertColor={this.invertSpinner()} />
      </div>
    );
  }
}
