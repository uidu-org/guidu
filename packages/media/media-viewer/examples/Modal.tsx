import React, { PureComponent } from 'react';
import MediaViewer from '..';
import { fetchAttachments } from '../../media-card/example-helpers';

export default class Basic extends PureComponent {
  state = {
    cards: [],
  };

  componentDidMount() {
    fetchAttachments().then(response => this.setState({ cards: response }));
  }

  render() {
    const { cards } = this.state;
    return cards.length ? <MediaViewer views={cards} /> : <div>Loading...</div>;
  }
}
