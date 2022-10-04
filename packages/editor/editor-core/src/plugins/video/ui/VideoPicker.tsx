import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '@uidu/modal-dialog';
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

  return (
    <Modal
      onClose={() =>
        setVideoPickerAt(null)(editorView.state, editorView.dispatch)
      }
    >
      <ModalHeader>
        <ModalTitle>Choose video</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form
          form={form}
          handleSubmit={async (model) => {
            insertVideo({
              url: model.url,
            })(editorView.state, editorView.dispatch);
            setVideoPickerAt(null)(editorView.state, editorView.dispatch);
          }}
          footerRenderer={(props) => (
            <FormSubmit {...props}>
              {intl.formatMessage({ defaultMessage: 'Add video' })}
            </FormSubmit>
          )}
        >
          <FieldText name="url" label="URL" />
        </Form>
      </ModalBody>
    </Modal>
  );
}
