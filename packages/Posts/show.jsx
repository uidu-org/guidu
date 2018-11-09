import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from 'components/Avatar';
import { autolinker } from 'utils';

export default function Post({ post, actorableNameRenderer }) {
  return (
    <div className="feed-post" id={post.md5}>
      <div className="media-left">
        <Avatar
          className="feed-post-avatar"
          klass={post.actorable.klass}
          kind="media"
          name={post.actorable.name}
          avatar={post.actorable.avatar}
        />
      </div>
      <div className="media-body media-middle">
        <span className="feed-post-publisher">
          {actorableNameRenderer(post)}
        </span>
        <small className="text-muted">
          {moment(post.createdAt).calendar(null, { sameElse: 'lll' })}
        </small>
        <div className="feed-post-body">
          <p
            dangerouslySetInnerHTML={{ __html: autolinker.link(post.message) }}
          />
          {post.attachments.length > 0 && (
            <TeamPostsAttachments attachments={post.attachments} />
          )}
        </div>
      </div>
    </div>
  );
}

Post.defaultProps = {
  actorableNameRenderer: ({ actorable }) => actorable.name,
};

Post.propTypes = {
  post: PropTypes.shape(PropTypes.obj).isRequired,
  actorableNameRenderer: PropTypes.func,
};
