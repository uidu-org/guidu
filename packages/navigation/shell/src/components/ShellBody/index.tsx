import Observer from '@researchgate/react-intersection-observer';
import React, { PureComponent } from 'react';
import { Body, ObserverComponent, Shadow } from './styled';
import { ShellBodyProps, ShellBodyState } from './types';

class ShellBody extends PureComponent<ShellBodyProps, ShellBodyState> {
  static defaultProps = {
    shadowOnScroll: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      shadowedHeader: false,
    };
  }
  handleHeader = e => {
    this.setState({
      shadowedHeader: !e.isIntersecting,
    });
  };

  render() {
    const { forwardRef, children, shadowOnScroll, ...otherProps } = this.props;
    const { shadowedHeader } = this.state;

    return (
      <Body ref={forwardRef} {...otherProps}>
        {shadowOnScroll && (
          <>
            <Observer
              onChange={this.handleHeader}
              root={forwardRef && forwardRef.current}
            >
              <ObserverComponent />
            </Observer>
            <Shadow active={shadowedHeader} />
          </>
        )}
        {children}
      </Body>
    );
  }
}
export default React.forwardRef((props: any, ref) => (
  <ShellBody forwardedRef={ref} {...props} />
));
