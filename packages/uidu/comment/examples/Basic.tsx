import React, { Component, Fragment } from 'react';
import 'swiper/dist/css/swiper.min.css';
import Comment, { CommentForm } from '../';

export default class Basic extends Component<any, any> {
  render() {
    return (
      <Fragment>
        <CommentForm comment={{}} />
        <Comment comment={{ id: 1, body: 'foo', owner: { avatar: {} } }} />
      </Fragment>
    );
  }
}
