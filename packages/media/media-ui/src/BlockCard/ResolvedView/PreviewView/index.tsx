import * as React from 'react';
import ImageLoader from 'react-render-image';
import ImageIcon from '@atlaskit/icon/glyph/image';
import NoImageIcon from './NoImageIcon';
import { Wrapper, ImageWrapper, IconWrapper } from './styled';

export const LoadingView = () => (
  <IconWrapper>
    <ImageIcon size="xlarge" label="loading" />
  </IconWrapper>
);

export const NoImageView = () => (
  <IconWrapper>
    <NoImageIcon />
  </IconWrapper>
);

export const LoadedView = ({ url }: { url: string }) => (
  <ImageWrapper url={url} />
);

export interface PreviewViewProps {
  url?: string;
}

export class PreviewView extends React.Component<PreviewViewProps> {
  renderContent() {
    const { url } = this.props;

    if (!url) {
      return <NoImageView />;
    }

    return (
      <ImageLoader
        src={url}
        loading={<LoadingView />}
        loaded={<LoadedView url={url} />}
        errored={<NoImageView />}
      />
    );
  }

  render() {
    return <Wrapper>{this.renderContent()}</Wrapper>;
  }
}
