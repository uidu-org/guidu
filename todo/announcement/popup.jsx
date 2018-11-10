import React, { Component } from 'react';

export default class Popup extends Component {
  componentDidMount() {
    const that = this;
    this.$modal = window.$(this.modal);
    setTimeout(() => {
      that.$modal.modal('show');
      that.track('view');
      that.$modal.on('hide.bs.modal', () => {
        that.track('dismiss');
      });
    }, 2000);
  }

  track = action => {
    window.$.ajax({
      url: '/ajaxes/track',
      data: {
        ic_action: action,
        ic_uid: this.props.id,
      },
      method: 'POST',
      context: this,
    });
  };

  render() {
    const { content, campaign, id } = this.props;

    const buttonHref = `${content.button_href}?ic_name=${
      campaign.inner_name
    }&ic_uid=${id}&ic_source=ann`;

    return (
      <div
        ref={c => {
          this.modal = c;
        }}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby={content.title}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{content.title}</h4>
            </div>
            <div className="modal-body">
              <p className="lead">{content.description}</p>
              <p>
                <a href={buttonHref} className="btn btn-primary">
                  {content.button_label}
                </a>{' '}
                <a
                  href="#"
                  className="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Non ora
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
