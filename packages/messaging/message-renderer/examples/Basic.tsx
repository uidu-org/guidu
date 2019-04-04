import React, { Fragment } from 'react';
import MessageRenderer from '../src';

export default class Basic extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <MessageRenderer
          tagName="div"
          content="Default value [John Doe](Member:johndoe) e poi altro, possibilmente con molto testo per capire come si comporta su due righe"
        />
        <br />
        <MessageRenderer
          tagName="div"
          content="This contains a URL, https://github.com/milesj/interweave, and a hashtag, #interweave, that will be converted to an anchor link!"
        />
      </Fragment>
    );
  }
}
