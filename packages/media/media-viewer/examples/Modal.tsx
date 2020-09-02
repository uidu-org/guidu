import MediaCard from '@uidu/media-card';
import React, { Fragment, PureComponent } from 'react';
import { fetchAttachments } from '../../media-card/example-helpers';
import { ModalMediaViewer } from '../src';

export default class Basic extends PureComponent {
  state = {
    files: [],
    currentIndex: undefined,
  };

  componentDidMount() {
    fetchAttachments().then((response) => this.setState({ files: response }));
  }

  render() {
    const { files, currentIndex } = this.state;
    return files.length ? (
      <Fragment>
        <div className="container">
          <div className="card-columns">
            {files.map((card, index) => (
              <MediaCard
                file={card}
                onClick={() => {
                  this.setState({ currentIndex: index });
                }}
              />
            ))}
          </div>
        </div>
        <ModalMediaViewer
          files={files}
          currentIndex={currentIndex}
          onClose={() => this.setState({ currentIndex: undefined })}
        />
      </Fragment>
    ) : (
      <div>Loading...</div>
    );
  }
}
