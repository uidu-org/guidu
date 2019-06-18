import moment from 'moment';
import React, { PureComponent } from 'react';
// import { MessageWith, Share as ShareOn, Vote } from 'user/utils/components';
// import { automentioner } from 'utils';
import Form from './CommentForm';

export default class Comment extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      commenting: false,
    };
  }

  render() {
    const { commentable, comments, comment, currentUser } = this.props;
    const { commenting } = this.state;

    return (
      <div className="comment mt-4 mb-5" id={`comment-${comment.id}`}>
        <div className="media align-items-center mt-3 mb-2">
          <a href={comment.owner.path}>
            <img
              className="rounded-circle mr-3"
              src={comment.owner.avatar.thumb}
              alt={comment.owner.name}
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </a>
          <div className="media-body media-middle">
            <p className="mb-0">
              <a href={comment.owner.path}>{comment.owner.name}</a>
            </p>
            <p className="mb-0 small text-muted">
              @{comment.owner.name} Designer
            </p>
          </div>
        </div>
        <div className="pl-5">
          <p
            className="comment-body mb-2"
            dangerouslySetInnerHTML={{
              __html: comment.body,
            }}
          />
          <div className="text-muted d-flex align-items-center">
            {/* <Vote {...this.props} votable={comment}>
              {({ handleClick, active, loading }) => (
                <LaddaButton
                  loading={loading}
                  data-style={SLIDE_UP}
                  data-spinner-size={22}
                  data-spinner-color="#ccc"
                  data-spinner-lines={12}
                  className={classNames('btn font-weight-light p-1 mr-2', {
                    'text-primary': loading || active,
                    'text-muted': !active,
                  })}
                  onClick={handleClick}
                  type="button"
                >
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{active ? 'Voted' : 'Vote'}</span>
                </LaddaButton>
              )}
            </Vote> */}
            {currentUser && (
              <button
                className="btn font-weight-light p-1 mr-2 text-muted"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    commenting: !commenting,
                  });
                }}
              >
                <span>Reply</span>
              </button>
            )}
            {/* <MessageWith {...this.props} votable={comment}>
              {({ handleClick, active, loading }) => (
                <button
                  className="btn font-weight-light p-1 mr-2 text-muted"
                  type="button"
                  onClick={handleClick}
                >
                  Message
                </button>
              )}
            </MessageWith> */}
            {/* <span className="dropdown mr-2">
              <button
                className="btn font-weight-light p-1 text-muted"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Share
              </button>
              <div className="dropdown-menu">
                <ShareOn url={commentable.path} />
              </div>
            </span> */}
            <small className="text-muted ml-auto">
              {moment(comment.createdAt).calendar(null, {
                sameElse: 'lll',
              })}
            </small>
          </div>
          {commenting && (
            <div className="mt-3">
              <Form
                {...this.props}
                comment={{}}
                commentable={commentable}
                replyTo={comment}
                parentId={comment.id}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
