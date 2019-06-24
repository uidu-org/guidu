import MediaCard from '@uidu/media-card';
import React, { Fragment, PureComponent } from 'react';
import { ModalMediaViewer } from '..';
import { fetchAttachments } from '../../media-card/example-helpers';

export default class Basic extends PureComponent {
  state = {
    cards: [],
    currentIndex: undefined,
  };

  componentDidMount() {
    fetchAttachments().then(response => this.setState({ cards: response }));
  }

  render() {
    const { cards, currentIndex } = this.state;
    return cards.length ? (
      <Fragment>
        <div className="container">
          <div className="card-columns">
            {cards.map((card, index) => (
              <MediaCard
                className="w-100 card position-relative"
                file={card}
                onClick={() => {
                  this.setState({ currentIndex: index });
                }}
              />
            ))}
          </div>
        </div>
        <ModalMediaViewer
          views={cards}
          currentIndex={currentIndex}
          onClose={() => this.setState({ currentIndex: undefined })}
        />
      </Fragment>
    ) : (
      <div>Loading...</div>
    );
  }
}
