import { Icon } from '@fluentui/react/lib/Icon';
import { ModalMediaViewer } from '@uidu/media-viewer';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import React, { useState } from 'react';
import { MessageAttachmentsProps } from '../../types';
import { isOnlyImages } from '../../utils';

export default function MessageAttachments({
  attachments,
  className,
  scrollable,
}: MessageAttachmentsProps) {
  const [currentModal, setCurrentModal] = useState(null);

  if (!scrollable.current) {
    return <div>Loading...</div>;
  }
  if (isOnlyImages(attachments)) {
    console.log('only images attachments');
    return (
      <>
        <div
          className={`row no-gutters row-cols-${
            attachments.length > 4 ? 4 : attachments.length
          }`}
          style={{
            maxWidth: scrollable.current.offsetWidth * 0.66,
          }}
        >
          {attachments.map((attachment, index) => (
            <div className="col">
              <img
                src={attachment.src}
                className="w-100"
                onClick={() => setCurrentModal(index)}
              />
            </div>
          ))}
        </div>
        <ModalMediaViewer
          currentIndex={currentModal}
          files={attachments}
          onClose={() => setCurrentModal(null)}
        />
      </>
    );
  }

  return (
    <div
      style={{
        width: scrollable.current.offsetWidth * 0.45,
      }}
    >
      {attachments.map(({ extension, filename }) => (
        <div className="card p-2 mt-2">
          <div className="d-flex align-items-center">
            <Icon
              {...getFileTypeIconProps({ extension, size: 48 })}
              // style={{
              //   display: 'flex',
              //   marginRight: '.5rem',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              //   flexShrink: 0,
              // }}
            />

            <div style={{ minWidth: 0 }} className="ml-2">
              <p className="text-truncate mb-0">{filename}</p>
              <p className="text-truncate text-muted mb-0">
                323kb - .{extension}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
