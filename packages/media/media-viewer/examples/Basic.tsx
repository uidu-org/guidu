import React, { PureComponent } from 'react';
import { fetchAttachments } from '../../media-card/example-helpers';
import MediaViewer from '../src';

export default class Basic extends PureComponent {
  state = {
    files: [],
  };

  componentDidMount() {
    fetchAttachments().then((response) => this.setState({ files: response }));
  }

  render() {
    const { files } = this.state;
    return files.length ? <MediaViewer files={files} /> : <div>Loading...</div>;
  }
}
