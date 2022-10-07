import getVideoId from 'get-video-id';
import React, { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

export interface Props {
  url: string;
}

class Video extends PureComponent<Props & WrappedComponentProps, {}> {
  render() {
    const { url } = this.props;
    const { id, service } = getVideoId(url);
    if (id && service) {
      const iframeSrc = () => {
        switch (service) {
          case 'youtube':
            return `https://www.youtube.com/embed/${id}`;
          case 'vimeo':
            return `https://vimeo.com/embed/${id}`;
          default:
            return '';
        }
      };

      return (
        <div tw="aspect-w-16 aspect-h-9 rounded">
          <iframe
            src={iframeSrc()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
            title="Embedded youtube"
            tw="rounded"
          />
        </div>
      );
    }
    return null;
  }
}

export default injectIntl(Video);
