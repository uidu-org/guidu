import * as React from 'react';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { Wrapper, InsertButton, CancelButton } from './styled';
import { startImport, hidePopup } from '../../actions';
import { SelectedItem, State } from '../../domain';

export interface FooterStateProps {
  readonly selectedItems: SelectedItem[];
  readonly canInsert: boolean;
  readonly canCancel: boolean;
}

export interface FooterDispatchProps {
  readonly onInsert: (selectedItems: SelectedItem[]) => void;
  readonly onCancel: () => void;
}

export type FooterProps = FooterStateProps & FooterDispatchProps;

export class Footer extends Component<FooterProps> {
  renderCancelButton(): JSX.Element {
    const { canCancel, onCancel } = this.props;
    return (
      <CancelButton
        appearance="subtle"
        onClick={onCancel}
        isDisabled={!canCancel}
      >
        <FormattedMessage {...messages.cancel} />
      </CancelButton>
    );
  }

  renderInsertButton(): JSX.Element | null {
    const { selectedItems, canInsert, onInsert } = this.props;
    const itemCount = selectedItems.length;

    if (itemCount === 0) {
      return null;
    }

    const onClick = () => onInsert(selectedItems);

    return (
      <InsertButton
        className="e2e-insert-button"
        appearance="primary"
        onClick={onClick}
        isDisabled={!canInsert}
      >
        <FormattedMessage
          {...messages.insert_files}
          values={{
            0: itemCount,
          }}
        />
      </InsertButton>
    );
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        {this.renderInsertButton()}
        {this.renderCancelButton()}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  isUploading,
  isCancelling,
  selectedItems,
}: State): FooterStateProps => {
  const isUploadingOrCancelling = isUploading || isCancelling;
  return {
    selectedItems,
    canInsert: !isUploadingOrCancelling,
    canCancel: !isUploadingOrCancelling,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
): FooterDispatchProps => ({
  onInsert: () => dispatch(startImport()),
  onCancel: () => dispatch(hidePopup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
