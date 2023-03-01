import React, { PureComponent } from 'react';
import { fetchAttachments } from '../../media-card/examples-utils';
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
    console.log('files', files);
    return files.length ? (
      <MediaViewer
        files={files.map((f) => f.file)}
        config={{
          pdfJsVersion: '3.3.122',
        }}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}
