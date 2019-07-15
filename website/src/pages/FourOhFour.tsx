import { ShellBody } from '@uidu/shell';
import * as React from 'react';

export type FourOhFourProps = {};

export default class FourOhFour extends React.PureComponent<FourOhFourProps> {
  props: FourOhFourProps;

  // Not able to use getDerivedStateFromProps because it logs error on console that state was not set properly
  // Cannot use use componentWillMount as it will be deprecated
  componentDidMount() {
    if (
      sessionStorage.getItem('loadedOnce') === null ||
      sessionStorage.getItem('loadedOnce') === 'false'
    ) {
      sessionStorage.setItem('loadedOnce', 'true');
      window.location.reload();
    }
  }

  render() {
    return (
      <ShellBody scrollable>
        <h1>Oops!</h1>
        <p>{"Couldn't find this page."}</p>
      </ShellBody>
    );
  }
}
