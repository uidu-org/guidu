import MediaCard from '@uidu/media-card';
import { ModalMediaViewer } from '@uidu/media-viewer';
import { colors } from '@uidu/theme';
import React, { Component } from 'react';

export default class MediaFilmStrip extends Component<any, any> {
  state = { currentModal: null };

  toggleModal = (index: number | null = null) => {
    this.setState({ currentModal: index });
  };

  render() {
    const { images, isLoading } = this.props;
    const { currentModal } = this.state;

    return (
      <div>
        {!isLoading ? (
          <FilmStrip>
            {images.map((image: any, index: number) => (
              <MediaCard
                onClick={() => this.toggleModal(index)}
                key={image.id}
                file={image}
                style={{
                  width: `calc(40% - 16px)`,
                  display: 'inline-flex',
                  paddingBottom: '25%',
                  marginRight: 8,
                }}
              />
            ))}
          </FilmStrip>
        ) : null}
        <ModalMediaViewer
          currentIndex={currentModal}
          views={images}
          onClose={() => this.toggleModal(null)}
        />
      </div>
    );
  }
}

const FilmStrip = (props: any) => (
  <div
    style={{
      borderBottom: `1px solid ${colors.N10}`,
      borderTop: `1px solid ${colors.N10}`,
      overflowX: 'auto',
      paddingBottom: 10,
      paddingTop: 10,
      WebkitOverflowScrolling: 'touch',
      whiteSpace: 'nowrap',
    }}
    {...props}
  />
);
