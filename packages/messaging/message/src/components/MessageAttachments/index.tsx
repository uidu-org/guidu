import MediaFilmstrip from '@uidu/media-filmstrip';
import classNames from 'classnames';
import React from 'react';
import { MessageAttachmentsProps } from '../../types';
import { isOnlyImages } from '../../utils';

export default function MessageAttachments({
  attachments,
  className,
}: MessageAttachmentsProps) {
  console.log(attachments);
  if (isOnlyImages(attachments)) {
    console.log('only images attachments');
    return (
      <div
        className="d-flex"
        style={{ width: '100vw', maxWidth: 'calc(100vw * 0.4)' }}
      >
        {attachments.map((attachment) => (
          <img src={attachment.src} className="w-100" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={classNames('mt-2', className)}
      style={{ minHeight: 140, maxWidth: '35vw', width: '100vw' }}
    >
      <MediaFilmstrip files={attachments} />
    </div>
  );
}
