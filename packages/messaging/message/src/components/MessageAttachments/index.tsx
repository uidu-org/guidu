import MediaFilmStrip from '@uidu/media-filmstrip';
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
  }

  return (
    <div
      className={classNames('mt-2 w-auto', className)}
      style={{ maxWidth: '80%', minHeight: 140 }}
    >
      <MediaFilmStrip files={attachments} />
    </div>
  );
}
