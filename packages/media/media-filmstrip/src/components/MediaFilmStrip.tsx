// import { Heading } from '../../components';
import MediaCard from '@uidu/media-card';
import { colors } from '@uidu/theme';
import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
// import { largeDevice } from '../../../utils';
// import { Header } from './components';

const navButtonStyles = (base: any) => ({
  ...base,
  backgroundColor: 'white',
  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.18)',
  color: colors.N60,

  '&:hover, &:active': {
    backgroundColor: 'white',
    color: colors.N100,
    opacity: 1,
  },
  '&:active': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.14)',
    transform: 'scale(0.96)',
  },
});

type Props = {};
type State = { currentModal: number | null };

export default class MediaFilmStrip extends Component<Props, State> {
  state = { currentModal: null };

  toggleModal = (index: number | null = null) => {
    this.setState({ currentModal: index });
  };

  render() {
    const { images, isLoading } = this.props;
    const { currentModal } = this.state;

    console.log('ImageViewer', this.props);

    return (
      <div>
        {!isLoading ? (
          <FilmStrip>
            {images.map((image, index) => (
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
        <ModalGateway>
          {Number.isInteger(currentModal) ? (
            <Modal
              isFullscreen
              closeOnBackdropClick={false}
              onClose={this.toggleModal}
              styles={{
                blanket: base => ({
                  ...base,
                  backgroundColor: colors.N90,
                  zIndex: 3000,
                }),
                positioner: base => ({
                  ...base,
                  display: 'block',
                  zIndex: 3000,
                }),
              }}
            >
              <Carousel
                currentIndex={currentModal}
                components={{
                  Footer: null,
                  //, Header
                }}
                isFullscreen
                frameProps={{ autoSize: 'height' }}
                views={images}
                styles={{
                  container: base => ({
                    ...base,
                    height: '100vh',
                  }),
                  view: base => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: 'calc(100vh - 54px)',
                    justifyContent: 'center',

                    // [largeDevice]: {
                    //   padding: 20,
                    // },

                    '& > img': {
                      maxHeight: 'calc(100vh - 94px)',
                    },
                  }),
                  navigationPrev: navButtonStyles,
                  navigationNext: navButtonStyles,
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

const gutter = 8;

const FilmStrip = (props: any) => (
  <div
    style={{
      borderBottom: `1px solid ${colors.N10}`,
      borderTop: `1px solid ${colors.N10}`,
      marginLeft: -gutter,
      marginRight: -gutter,
      overflowX: 'auto',
      paddingBottom: 10,
      paddingTop: 10,
      WebkitOverflowScrolling: 'touch',
      whiteSpace: 'nowrap',
    }}
    {...props}
  />
);

const Image = (props: any) => (
  <div
    style={{
      backgroundColor: '#eee',
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: gutter,
      overflow: 'hidden',
      paddingBottom: '15%',
      position: 'relative',
      width: `calc(25% - ${gutter * 2}px)`,

      ':hover': {
        opacity: 0.9,
      },
    }}
    {...props}
  />
);
