import React, { PureComponent } from 'react';
import { fetchAttachments } from '../../media-card/example-helpers';
import MediaFilmStrip from '../src';

export default class ViewStory extends PureComponent<any, any> {
  state = {
    cards: [],
  };

  componentDidMount() {
    fetchAttachments().then(response => this.setState({ cards: response }));
  }

  render() {
    const { cards } = this.state;
    return <MediaFilmStrip images={cards} />;
  }
}
