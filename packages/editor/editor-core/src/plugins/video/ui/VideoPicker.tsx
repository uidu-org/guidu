import Button, { ButtonGroup } from '@uidu/button';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm, useFormFooter } from '@uidu/form';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@uidu/modal-dialog';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { useIntl } from 'react-intl';
import { insertVideo, setVideoPickerAt } from '../actions';

export default function VideoPicker({
  editorView,
}: {
  editorView: EditorView;
}) {
  const intl = useIntl();

  const form = useForm({});

  const { formFooterRef, renderFormFooter } = useFormFooter();

  return (
    <Modal
      onClose={() =>
        setVideoPickerAt(null)(editorView.state, editorView.dispatch)
      }
    >
      <ModalHeader>
        <ModalTitle>
          {intl.formatMessage({
            defaultMessage: 'Choose video',
            id: 'uidu.editor-core.video.picker.title',
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form
          form={form}
          id="video-picker"
          handleSubmit={async (model) => {
            insertVideo({ url: model.url })(
              editorView.state,
              editorView.dispatch,
            );
            setVideoPickerAt(null)(editorView.state, editorView.dispatch);
          }}
          footerRenderer={(props) =>
            renderFormFooter(
              <ButtonGroup>
                <Button
                  onClick={() =>
                    setVideoPickerAt(null)(
                      editorView.state,
                      editorView.dispatch,
                    )
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: 'uidu.editor-core.video.picker.cancel',
                  })}
                </Button>
                <FormSubmit {...props} form="video-picker">
                  {intl.formatMessage({
                    defaultMessage: 'Add video',
                    id: 'uidu.edito-core.video.picker.button',
                  })}
                </FormSubmit>
              </ButtonGroup>,
            )
          }
        >
          <FieldText name="url" label="URL" />
        </Form>
      </ModalBody>
      <ModalFooter>
        <div ref={formFooterRef} />
      </ModalFooter>
    </Modal>
  );
}
