import MediaCard from '@uidu/media-card';
import { ModalMediaViewer } from '@uidu/media-viewer';
import React, { Component } from 'react';
import { FilmStrip } from '../styled';
import { MediaFilmstripProps, MediaFilmstripState } from '../types';

export default class MediaFilmstrip extends Component<
  MediaFilmstripProps,
  MediaFilmstripState
> {
  state = { currentModal: undefined };

  toggleModal = (index: number | undefined = undefined) => {
    this.setState({ currentModal: index });
  };

  render() {
    const { files, ...otherProps } = this.props;
    const { currentModal } = this.state;

    return (
      <>
        <FilmStrip>
          {files.map((image: any, index: number) => (
            <div
              key={image.id}
              style={{
                width: `calc(35% - 16px)`,
                display: 'inline-flex',
                marginRight: 8,
              }}
            >
              <MediaCard
                onOpen={() => this.toggleModal(index)}
                {...image}
                {...otherProps}
              />
            </div>
          ))}
        </FilmStrip>
        <ModalMediaViewer
          currentIndex={currentModal}
          files={files}
          onClose={() => this.toggleModal(null)}
        />
      </>
    );
  }
}
