import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

import Loader from '@uidu/loader';
import 'fileicon.css';

const AttachmentHeader = ({ index, onRemove }) => (
  <div
    className="p-2 d-flex justify-content-end align-items-center position-absolute"
    style={{ zIndex: 20, top: 0, right: 0 }}
  >
    <button
      className="btn btn-sm ml-auto d-flex align-items-center p-1"
      type="button"
      onClick={() => onRemove(index)}
    >
      <X size={12} />
    </button>
  </div>
);

AttachmentHeader.propTypes = {
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const AttachmentBody = ({ src, name }) => {
  if (src) {
    return <img src={src} className="d-none" alt={name} />;
  }

  return (
    <div className="card-body py-1 px-2 d-flex align-items-end w-100">
      <p className="mb-0 text-truncate text-dark small">{name}</p>
    </div>
  );
};

AttachmentBody.defaultProps = {
  src: null,
};

AttachmentBody.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const AttachmentFooter = ({ type, name }) => (
  <div
    className="w-100 p-1"
    style={{
      background: 'rgba(255, 255, 255, 0.8)',
      borderBottomLeftRadius: '3px',
      borderBottomRightRadius: '3px',
    }}
  >
    <div className="d-flex align-items-center">
      <div
        className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
        data-type={type}
        style={{
          width: '10px',
          height: '14px',
          verticalAlign: 'sub',
        }}
      />{' '}
      <p className="mb-0 text-truncate text-muted" style={{ fontSize: 12 }}>
        {name}
      </p>
    </div>
  </div>
);

AttachmentFooter.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const defaultStyles = {
  width: '132px',
  height: '88px',
  backgroundColor: '#fff',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
  // backgroundImage:
  //   attachment.previewUrl && `url('${attachment.previewUrl}')`,
  backgroundPosition: 'center',
  backgroundClip: 'content-box',
};

export default function Attachment({
  attachment,
  index,
  onOpen,
  onRemove,
  preview,
}) {
  if (preview) {
    return (
      <div key={attachment.signed_id || attachment.position}>
        <a
          className="card d-flex flex-column justify-content-end rounded mr-2"
          style={{
            ...defaultStyles,
            backgroundImage:
              attachment.previewUrl && `url('${attachment.previewUrl}')`,
            opacity: attachment.signed_id ? 1 : 0.4,
          }}
        >
          <AttachmentHeader onRemove={onRemove} index={index} />
          {!attachment.signed_id && (
            <Loader
              name="three-bounce"
              color="#17a2b8"
              wrapperClassName="d-flex align-items-center justify-content-center h-100 position-absolute w-100"
            />
          )}
          <AttachmentBody
            name={attachment.filename}
            src={attachment.previewUrl}
          />
          <AttachmentFooter type={attachment.type} name={attachment.filename} />
        </a>
      </div>
    );
  }

  if (attachment.blob.preview) {
    return (
      <div key={`attachment_${attachment.id}`}>
        <a
          href="#"
          tabIndex={0}
          role="button"
          onClick={e => {
            e.preventDefault();
            onOpen(attachment, index);
          }}
          className="card d-flex flex-column justify-content-end rounded mr-2"
          style={{
            ...defaultStyles,
            backgroundImage: `url('${attachment.blob.preview}')`,
          }}
        >
          <AttachmentBody
            name={attachment.blob.name}
            src={attachment.blob.preview}
          />
          <AttachmentFooter
            type={attachment.blob.type}
            name={attachment.blob.name}
          />
        </a>
      </div>
    );
  }

  return (
    <div key={`attachment_${attachment.id}`}>
      <a
        href="#"
        tabIndex={0}
        role="button"
        onClick={e => {
          e.preventDefault();
          onOpen(attachment, index);
        }}
        className="card d-flex flex-column justify-content-between rounded mr-2"
        style={{
          ...defaultStyles,
        }}
      >
        <AttachmentBody name={attachment.blob.name} />
        <AttachmentFooter
          type={attachment.blob.type}
          name={attachment.blob.name}
        />
      </a>
    </div>
  );
}

Attachment.propTypes = {
  attachment: PropTypes.shape(PropTypes.obj).isRequired,
  index: PropTypes.number.isRequired,
  preview: PropTypes.bool,
  onOpen: PropTypes.func,
  onRemove: PropTypes.func,
};

Attachment.defaultProps = {
  preview: false,
  onOpen: () => {},
  onRemove: () => {},
};
