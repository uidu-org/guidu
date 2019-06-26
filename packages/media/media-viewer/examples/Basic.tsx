import React, { PureComponent } from 'react';
import MediaViewer from '..';
import { fetchAttachments } from '../../media-card/example-helpers';

export default class Basic extends PureComponent {
  state = {
    files: [],
  };

  componentDidMount() {
    fetchAttachments().then(response => this.setState({ files: response }));
  }

  render() {
    const { files } = this.state;
    return files.length ? <MediaViewer files={files} /> : <div>Loading...</div>;
  }
}
