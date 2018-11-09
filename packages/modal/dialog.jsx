import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ModalDialog extends Component {
  componentDidMount() {
    const $modal = window.$(this.modal);
    const { onShow, onShown, onHide, onHidden } = this.props;

    $modal.on('show.bs.modal', () => {
      const zIndex = 1040 + 10 * window.$('.modal:visible').length;
      $modal.css('z-index', zIndex);
      setTimeout(() => {
        window
          .$('.modal-backdrop')
          .not('.modal-stack')
          .css('z-index', zIndex - 1)
          .addClass('modal-stack');
      }, 0);
      onShow();
    });

    $modal.on('shown.bs.modal', () => {
      window.$(document.body).addClass('modal-open');
      $modal.find('.form-control-autofocus').focus();
      onShown();
    });

    $modal.on('hide.bs.modal', () => {
      onHide();
    });

    $modal.on('hidden.bs.modal', e => {
      e.preventDefault();
      if (window.$('.modal:visible').length) {
        window.$(document.body).addClass('modal-open');
      }
      onHidden();
    });
  }

  render() {
    const {
      modalClassName,
      className,
      flash,
      children,
      onDismiss,
    } = this.props;

    return (
      <div
        className={classNames('modal fade', modalClassName)}
        tabIndex="-1"
        role="dialog"
        ref={c => {
          this.modal = c;
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className={classNames(className, 'modal-dialog')} role="document">
          {flash && (
            <div
              className={`alert modal-flash alert-${flash.className}`}
              role="alert"
            >
              {flash.link ? (
                flash.link
              ) : (
                <a
                  href="#"
                  className="pull-right alert-link"
                  onClick={onDismiss}
                >
                  {window.I18n.t('utils.actions.not_now')}
                </a>
              )}
              {flash.content}
            </div>
          )}
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  onShow: PropTypes.func,
  onShown: PropTypes.func,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  modalClassName: PropTypes.string,
  className: PropTypes.string,
  flash: PropTypes.element,
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func,
};

ModalDialog.defaultProps = {
  onShow: () => {},
  onShown: () => {
    window.dispatchEvent(new Event('resize'));
  },
  onHide: () => {},
  onHidden: () => {},
  onDismiss: () => {},
  modalClassName: null,
  className: null,
  flash: null,
};
