import React, { PureComponent } from 'react';
import { fetchAttachments } from '../../media-card/example-helpers';
import MediaFilmstrip from '../src';

export default class ViewStory extends PureComponent<any, any> {
  state = {
    files: [],
  };

  componentDidMount() {
    fetchAttachments().then((files) => this.setState({ files }));
  }

  render() {
    const { files } = this.state;
    return <MediaFilmstrip files={files} />;
  }
}
