import { Icon } from '@fluentui/react/lib/Icon';
import MediaCard from '@uidu/media-card';
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
  const validAttachments = attachments.filter(({ file }) => !!file); // cleanup attachments with no files attached
  const files = validAttachments.map(({ file }) => file);

  if (!scrollable?.current) {
    return <div>Loading...</div>;
  }

  if (isOnlyImages(files)) {
    return (
      <>
        <div
          tw="flex "
          className={`row no-gutters mt-2 row-cols-${
            validAttachments.length > 4 ? 4 : validAttachments.length
          }`}
          style={{
            maxWidth: scrollable.current.offsetWidth * 0.66,
          }}
        >
          {validAttachments.map((attachment, index) => (
            <div className="col">
              <MediaCard
                file={attachment.file}
                onClick={() => setCurrentModal(index)}
              />
            </div>
          ))}
        </div>
        <ModalMediaViewer
          currentIndex={currentModal}
          files={files}
          onClose={() => setCurrentModal(null)}
        />
      </>
    );
  }

  return (
    <>
      <div
        tw="flex items-center space-x-2"
        style={{
          width: scrollable.current.offsetWidth * 0.45,
        }}
      >
        {validAttachments.map(
          (
            {
              file: {
                metadata: { extension, filename, size },
              },
            },
            index,
          ) => (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentModal(index);
              }}
              tw="p-2 mt-2 border rounded"
            >
              <div tw="flex items-center">
                <div tw="flex-shrink-0 flex">
                  <Icon
                    {...getFileTypeIconProps({
                      extension,
                      size: 40,
                    })}
                    // style={{
                    //   display: 'flex',
                    //   marginRight: '.5rem',
                    //   alignItems: 'center',
                    //   justifyContent: 'center',
                    //   flexShrink: 0,
                    // }}
                  />
                </div>

                <div tw="ml-3 min-w-0">
                  <p tw="truncate">{filename}</p>
                  <p tw="truncate text-gray-500">
                    {size ? `${formatBytes(size, 2)} - ` : ''}.{extension}
                  </p>
                </div>
              </div>
            </a>
          ),
        )}
      </div>
      <ModalMediaViewer
        currentIndex={currentModal}
        files={files}
        onClose={() => setCurrentModal(null)}
      />
    </>
  );
}
