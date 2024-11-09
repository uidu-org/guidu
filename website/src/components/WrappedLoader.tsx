import * as React from 'react';
import Loadable from 'react-loadable';

class Wrapper extends React.Component {
  componentDidMount() {}
  render() {
    return this.props.children;
  }
}

const WrappedLoadable = <Props2, Exports extends object>({
  render,
  ...rest
}: Loadable.OptionsWithRender<Props2, Exports>) =>
  Loadable({
    ...rest,
    render: (loaded: Exports, props: Props2) => (
      <Wrapper>{render(loaded, props)}</Wrapper>
    ),
  });

export default WrappedLoadable;
