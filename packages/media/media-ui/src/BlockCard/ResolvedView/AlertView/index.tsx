import * as React from 'react';
import * as debounce from 'lodash.debounce';
import Button from '@atlaskit/button';
import { Ellipsify } from '../../../ellipsify';
import { Wrapper } from './styled';

const contentWidthWhenCardIs400px = 384;

export interface AlertViewProps {
  type: 'success' | 'failure';
  text?: string;
  onRetry: () => void;
  onDismis: () => void;
  style?: {};
}

export interface AlertViewState {
  width?: number;
}

export default class AlertView extends React.Component<
  AlertViewProps,
  AlertViewState
> {
  state: AlertViewState = {};

  el?: HTMLDivElement;

  handleRetry = (event: React.MouseEvent) => {
    const { onRetry } = this.props;
    if (onRetry) {
      event.preventDefault();
      event.stopPropagation();
      onRetry();
    }
  };

  handleDismis = (event: React.MouseEvent) => {
    const { onDismis } = this.props;
    if (onDismis) {
      event.preventDefault();
      event.stopPropagation();
      onDismis();
    }
  };

  handleMount = (el?: HTMLDivElement) => {
    if (el) {
      this.el = el;
    }
  };

  handleResize = debounce(() => {
    if (this.el) {
      this.setState({ width: this.el.clientWidth });
    }
  }, 250);

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderContent() {
    const { type, text } = this.props;
    const { width } = this.state;

    const txt = type === 'success' ? text : 'Something went wrong.';

    if (width && width < contentWidthWhenCardIs400px) {
      return <Ellipsify text={txt} lines={2} inline />;
    } else {
      return <Ellipsify text={txt} lines={1} inline />;
    }
  }

  renderRetryAndCancel() {
    const { type } = this.props;

    if (type === 'success') {
      return null;
    }

    return (
      <>
        <Button appearance="link" spacing="none" onClick={this.handleRetry}>
          Try again
        </Button>{' '}
        or{' '}
        <Button appearance="link" spacing="none" onClick={this.handleDismis}>
          cancel
        </Button>
        .
      </>
    );
  }

  render() {
    const { type, style } = this.props;
    return (
      <Wrapper ref={this.handleMount} type={type} style={style}>
        {this.renderContent()} {this.renderRetryAndCancel()}
      </Wrapper>
    );
  }
}
