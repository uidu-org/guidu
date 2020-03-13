import FieldMentions from '@uidu/field-mentions';
import FieldText from '@uidu/field-text';
import { Form } from '@uidu/form';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CommentForm extends Component<any, any> {
  private form = React.createRef();

  fetchUsers = debounce((query, callback) => {
    if (!query) return;
    const { fetchUsers } = this.props;

    fetchUsers(`q=${query}`)
      .then(response =>
        response.items.map(user => ({
          ...user,
          id: user.id,
          display: user.name,
          type: 'User',
        })),
      )
      .then(callback);
  }, 300);

  constructor(props) {
    super(props);
    this.state = {
      // attachments: [],
      // emojiPicker: false,
      submitted: false,
      // submitLabel: props.message.body
      //   ? this.messageSender()
      //   : this.thumbSender(),
    };
  }

  handleSubmit = model => {
    console.log(model);
    const { commentable, comment, createComment, updateComment } = this.props;
    const modelToSubmit = {
      comment: {
        ...model.comment,
        body: model.comment.body && model.comment.body.value,
        mentions: model.comment.body ? model.comment.body.mentions : [],
      },
    };

    if (!comment.id) {
      return createComment(commentable, modelToSubmit);
    }
    return updateComment(commentable, comment.id, modelToSubmit);
  };

  render() {
    const {
      currentUser,
      restrictedTo,
      replyTo,
      parentId,
      comment,
      onSave,
    } = this.props;
    const { submitted } = this.state;

    if (restrictedTo && !!!restrictedTo) {
      return (
        <div className="alert alert-secondary bg-light border-0">
          You need to become a Contributor to join the discussion.{' '}
          <Link
            className="alert-link"
            to={{
              pathname: '/accounts/sign_in',
              state: { modal: true },
            }}
          >
            Scopri come
          </Link>
        </div>
      );
    }

    return (
      <Form
        ref={this.form}
        handleSubmit={async model => {
          const response = await this.handleSubmit(model);
          this.setState(
            {
              submitted: true,
            },
            () => {
              (this.form.current as any).form.reset();
              onSave(response);
            },
          );
        }}
        footerRenderer={({ canSubmit, loading }) =>
          canSubmit && (
            <p className="ml-5 mb-0 small text-muted form-text">
              Press <kbd>key</kbd> to submit, <kbd>@</kbd> to mention
            </p>
          )
        }
      >
        {parentId && (
          <FieldText type="hidden" name="comment[parent_id]" value={parentId} />
        )}
        <div className="media">
          {currentUser && (
            <img
              className="rounded-circle mr-3 mt-2"
              src={currentUser.avatar.thumb}
              alt={currentUser.name}
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          )}
          <div className="media-body">
            <FieldMentions
              name="comment[body]"
              value={comment.body ? { value: comment.body } : ''}
              className="form-control bg-light"
              layout="elementOnly"
              help={
                <span>
                  Press <kbd>key</kbd> to submit, <kbd>@</kbd> to mention
                </span>
              }
              placeholder={
                parentId
                  ? 'utils.actions.respond_to'
                  : 'activerecord.prompts.comment.body'
              }
              items={[
                {
                  // type: 'User',
                  trigger: '@',
                  data: this.fetchUsers,
                  style: { backgroundColor: '#d1c4e9' },
                  renderSuggestion: (
                    suggestion: any,
                    search,
                    highlightedDisplay,
                  ) => (
                    <div className="d-flex align-items-center">
                      <img
                        src={suggestion.avatar.thumb}
                        className="rounded-circle mr-3"
                        alt={suggestion.name}
                        style={{ width: '2rem', height: '2rem' }}
                      />
                      <p className="mb-0 text-truncate">{highlightedDisplay}</p>
                    </div>
                  ),
                },
              ]}
              onKeyDown={event => {
                if (event.keyCode === 13 && !event.shiftKey) {
                  event.preventDefault();
                  (this.form.current as any).form.submit();
                }
              }}
              // placeholder={placeholder}
              // displayTransform={(id, display) => display}
              required
            />
          </div>
        </div>
      </Form>
    );
  }
}

// CommentsForm.propTypes = {
//   comment: PropTypes.shape(PropTypes.obj).isRequired,
//   replyTo: PropTypes.shape(PropTypes.obj),
//   commentable: PropTypes.shape(PropTypes.obj).isRequired,
//   parentId: PropTypes.number,
//   onSave: PropTypes.func,
//   createComment: PropTypes.func,
//   updateComment: PropTypes.func.isRequired,
//   addToast: PropTypes.func.isRequired,
// };

// CommentsForm.defaultProps = {
//   parentId: null,
//   replyTo: null,
//   onSave: () => {},
//   createComment: null,
// };
