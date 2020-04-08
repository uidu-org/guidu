import { Icon } from '@fluentui/react/lib/Icon';
import { ModalMediaViewer } from '@uidu/media-viewer';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import React, { useState } from 'react';
import { MessageAttachmentsProps } from '../../types';
import { isOnlyImages } from '../../utils';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
    <>
      <div
        style={{
          width: scrollable.current.offsetWidth * 0.45,
        }}
      >
        {attachments.map(({ extension, filename, size }, index) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentModal(index);
            }}
            className="card p-2 mt-2"
          >
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
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
              </div>

              <div style={{ minWidth: 0 }} className="ml-2">
                <p className="text-truncate mb-0">{filename}</p>
                <p className="text-truncate text-muted mb-0">
                  {size ? `${formatBytes(size, 2)} - ` : ''}.{extension}
                </p>
              </div>
            </div>
          </a>
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
