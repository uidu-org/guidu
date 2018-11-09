// @flow
import React from 'react';
import Page from '../components/Page';

type FourOhFourProps = {};

export default class FourOhFour extends React.PureComponent<FourOhFourProps> {
  props: FourOhFourProps;

  render() {
    return (
      <Page>
        <h1>Oops!</h1>
        <p>{"Couldn't find this page."}</p>
      </Page>
    );
  }
}
