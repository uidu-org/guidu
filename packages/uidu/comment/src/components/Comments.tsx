import Spinner from '@uidu/spinner';
import orderBy from 'lodash/orderBy';
import React, { PureComponent } from 'react';
import Comment from './Comment';

export default class Comments extends PureComponent<any> {
  render() {
    const { comments, loaded } = this.props;

    if (!loaded) {
      return <Spinner />;
    }

    return (
      <div className="comments-wrapper">
        {orderBy(comments, 'createdAt', 'desc').map((comment) => (
          <Comment {...this.props} key={comment.uid} comment={comment} />
        ))}
      </div>
    );
  }
}
