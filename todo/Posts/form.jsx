import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import is from 'is_js';
import { Form } from '@uidu/forms';
import { PanelBody } from 'components/Panel';

export default class PostsForm extends Component {
  constructor(props) {
    super(props);
    this.trackEvent = () => {
      window.dataLayer.push({
        event: 'GAEvent',
        eventCategory: 'Post',
        eventAction: 'create',
        eventLabel: 'donation_campaign',
        // 'eventValue' : value_for_Event_Value
      });
    };
    this.state = {
      submitted: false,
      attachments: props.attachments,
    };
  }

  addAttachment = attachments => {
    let updated = this.state.attachments;
    updated = updated.concat(attachments);
    this.setState({
      attachments: updated,
    });
  };

  previewAttachment = attachment => {
    const updated = this.state.attachments;
    const index = updated
      .map(item => attachment.position === item.position)
      .indexOf(true);
    const foo = update(updated, { [index]: { $set: attachment } });
    this.setState({
      attachments: foo,
    });
  };

  uploadAttachment = attachment => {
    const updated = this.state.attachments;
    const index = updated
      .map(item => attachment.position === item.position)
      .indexOf(true);
    const foo = update(updated, { [index]: { $set: attachment } });
    this.setState({
      attachments: foo,
    });
  };

  removeAttachment = attachment => {
    const updated = this.state.attachments.filter(
      obj => obj.id !== attachment.id,
    );
    this.setState({
      attachments: updated,
    });
  };

  allAttachmentsLoaded = () => {
    if (this.state.attachments.length > 0) {
      const ids = this.state.attachments.map(elem => elem.id);
      return is.all.existy(ids);
    }
    return true;
  };

  handleSubmit = (model, resetForm) => {
    const modelToSubmit = model;
    const messageContentState = this.editor.getContentState();
    modelToSubmit.post.message = this.editor.toFullText(messageContentState);
    modelToSubmit.post.message_raw = JSON.stringify(
      this.editor.toRaw(messageContentState),
    );

    if (modelToSubmit.related_attachments !== '') {
      modelToSubmit.post.related_attachments = this.state.attachments.map(
        attachment => attachment.id,
      );
    }

    const { onSave, url } = this.props;
    const that = this;
    window.Messenger().run(
      {},
      {
        data: modelToSubmit,
        url,
        type: 'POST',
        dataType: 'json',
        context: this,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        success(response) {
          onSave(response);
          that.trackEvent(response);
          resetForm();
          that.editor.clear();
          that.setState({
            submitted: true,
            attachments: [],
          });
        },
      },
    );
  };

  render() {
    const { postable, post, placeholder } = this.props;

    const { attachments, submitted } = this.state;

    return (
      <PanelBody>
        <Form
          handleSubmit={this.handleSubmit}
          submitted={submitted}
          footerRenderer={({ canSubmit }) => (
            <FormHelpers.Actions>
              <FormHelpers.Submit
                method="POST"
                label={window.I18n.t('utils.actions.send')}
                canSubmit={canSubmit && this.allAttachmentsLoaded()}
              />
              <AttachmentsNew
                className="btn btn-muted"
                name="attachment[file]"
                attachable={post}
                attachments={attachments}
                onAdd={this.addAttachment}
                onPreview={this.previewAttachment}
                onUpload={this.uploadAttachment}
                // url='/feed/attachments.json'
              >
                <i className="icon-camera" />
              </AttachmentsNew>
            </FormHelpers.Actions>
          )}
        >
          {postable && (
            <Input
              type="hidden"
              name="post[postable_type]"
              value={postable.klass}
            />
          )}
          {postable && (
            <Input type="hidden" name="post[postable_id]" value={postable.id} />
          )}
          <div className="form-group">
            <div className="media">
              <div className="media-body">
                <Textarea
                  name="post[message]"
                  ref={c => {
                    this.editor = c;
                  }}
                  layout="elementOnly"
                  placeholder={placeholder}
                  required
                />
                <Input
                  type="hidden"
                  id="post_related_attachments"
                  name="post[related_attachments]"
                  value={attachments.map(attachment => attachment.id).join(',')}
                />
                <Attachments
                  attachments={attachments}
                  onRemove={this.removeAttachment}
                />
              </div>
            </div>
          </div>
        </Form>
      </PanelBody>
    );
  }
}

PostsForm.defaultProps = {
  attachments: [],
  onSave: () => {},
  postable: null,
  post: {},
  placeholder: '',
};

PostsForm.propTypes = {
  url: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.obj),
  post: PropTypes.shape(PropTypes.obj),
  postable: PropTypes.shape(PropTypes.obj),
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
};
