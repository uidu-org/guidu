import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@uidu/button';
import * as React from 'react';
import { PureComponent } from 'react';
import {
  BackgroundWrapper,
  Container,
  LoaderStyle,
  ProgressLoaderWrapper,
} from './styles';

export interface Props {
  /** The real time progress fraction */
  progress: number;

  /** The 100% done size of the bar in px */
  maxWidth: number;

  /** If a cancel button should be shown, also the CB when it is clicked */
  onCancel?: () => any;

  /** The label for the cancel button */
  cancelLabel?: string;
}

export default class ProgressLoader extends PureComponent<Props, any> {
  render() {
    const { progress, maxWidth, onCancel, cancelLabel } = this.props;
    const maxLoaderWidth = maxWidth - 45;
    return (
      <Container>
        <ProgressLoaderWrapper>
          <BackgroundWrapper maxWidth={maxLoaderWidth}>
            <LoaderStyle progress={progress} maxWidth={maxLoaderWidth} />
          </BackgroundWrapper>
        </ProgressLoaderWrapper>

        {onCancel && (
          <div onClick={onCancel}>
            <Button appearance="subtle">
              <CrossIcon size="small" label={cancelLabel || ''} />
            </Button>
          </div>
        )}
      </Container>
    );
  }
}
