import MediaCard from '@uidu/media-card';
import { ModalMediaViewer } from '@uidu/media-viewer';
import React, { Component, Fragment } from 'react';

export default class MediaFilmStrip extends Component<any, any> {
  state = { currentModal: null };

  toggleModal = (index: number | null = null) => {
    this.setState({ currentModal: index });
  };

  render() {
    const { images, isLoading } = this.props;
    const { currentModal } = this.state;

    return (
      <Fragment>
        {!isLoading ? (
          <FilmStrip>
            {images.map((image: any, index: number) => (
              <div
                key={image.id}
                style={{
                  width: `calc(30% - 16px)`,
                  display: 'inline-flex',
                  marginRight: 8,
                }}
              >
                <MediaCard
                  onOpen={() => this.toggleModal(index)}
                  file={image}
                />
              </div>
            ))}
          </FilmStrip>
        ) : null}
        <ModalMediaViewer
          currentIndex={currentModal}
          views={images}
          onClose={() => this.toggleModal(null)}
        />
      </Fragment>
    );
  }
}

const FilmStrip = (props: any) => (
  <div
    style={{
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      whiteSpace: 'nowrap',
      paddingBottom: '1rem',
      paddingTop: '1rem',
      marginTop: '-1rem',
      marginBottom: '-1rem',
    }}
    {...props}
  />
);
