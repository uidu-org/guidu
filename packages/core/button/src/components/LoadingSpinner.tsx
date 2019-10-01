import Spinner from '@uidu/spinner';
import * as React from 'react';

const appearances: string[] = ['primary', 'danger'];

type Props = {
  spacing: string;
  styles: {};
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
    const { spacing, styles } = this.props;
    let spinnerSize = spacing !== 'default' ? 'xsmall' : 'small';

    return (
      <div css={styles}>
        <Spinner size={spinnerSize} invertColor={this.invertSpinner()} />
      </div>
    );
  }
}
