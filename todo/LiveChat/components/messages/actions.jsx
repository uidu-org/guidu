import React from 'react';
import { MoreHorizontal } from 'react-feather';
import swal from '@sweetalert/with-react';

export default function MessageActions({
  message,
  destroyMessage,
  messageable,
  kind,
  isSelf,
  onEdit,
}) {
  if (!isSelf) {
    return null;
  }

  return (
    <div
      className="btn-group btn-group-sm d-hover position-absolute"
      role="group"
      aria-label="Button group with nested dropdown"
      style={{ right: 0, top: -6 }}
    >
      <div
        className="btn-group btn-group-sm hint--top"
        role="group"
        aria-label="More actions"
      >
        <button
          id="btnGroupDrop1"
          type="button"
          className="btn btn-sm border py-1 px-3 d-flex align-items-center border"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <MoreHorizontal size={16} />
        </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          {isSelf && (
            <a
              className="dropdown-item"
              href="#"
              onClick={e => {
                e.preventDefault();
                onEdit();
              }}
            >
              Edit
            </a>
          )}
          {isSelf && (
            <a
              className="dropdown-item text-danger"
              href="#"
              onClick={e => {
                e.preventDefault();
                swal({
                  title: 'Are you sure?',
                  text:
                    'Once deleted, you will not be able to recover this imaginary file!',
                  // icon: 'warning',
                  buttons: true,
                  // dangerMode: true,
                }).then(willDelete => {
                  if (willDelete) {
                    destroyMessage(messageable, kind, message);
                  }
                });
              }}
            >
              Delete
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
