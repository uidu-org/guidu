import React from 'react';
import PhotoBox from 'components/PhotoBox';

import Attachment from './show';

export default function MessagesAttachments({ attachments }) {
  const itemsRenderer = (items, onOpen) =>
    attachments.map((item, index) => (
      <Attachment
        key={item.id}
        index={index}
        onOpen={onOpen}
        attachment={item}
      />
    ));

  return (
    <div className="my-3 d-flex" style={{ overflowX: 'auto' }}>
      <PhotoBox items={attachments} itemsRenderer={itemsRenderer} />
    </div>
  );
}
