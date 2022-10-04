import React, { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

export interface Props {
  url: string;
}

class Video extends PureComponent<Props & WrappedComponentProps, {}> {
  render() {
    const { url } = this.props;
    return (
      <div tw="aspect-w-16 aspect-h-9">
        <iframe
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  }
}

export default injectIntl(Video);
