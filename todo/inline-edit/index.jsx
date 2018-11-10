import React, { PureComponent } from 'react';
import { Form, FormFooter, FormSubmit } from '@uidu/forms';
import classNames from 'classnames';

export default class InlineEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  edit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { onEditing } = this.props;
    this.setState(
      {
        editing: true,
      },
      () => {
        // onEditing();
      },
    );
  };

  handleSubmit = model => {
    // FIX for empty arrays attributes
    // REF http://stackoverflow.com/questions/14999897/jquery-ajax-omits-empty-object-attributes
    // REF http://stackoverflow.com/questions/907979/how-do-i-put-json-data-to-ruby-on-rails-using-jquery
    console.log(model);
    // Messenger().run(
    //   {
    //     successMessage: 'Profilo aggiornato con successo',
    //     errorMessage: 'Errore',
    //     progressMessage: I18n.t('utils.flash.processing'),
    //     showCloseButton: false,
    //     retry: true,
    //   },
    //   {
    //     url: _self.props.url,
    //     type: _self.props.method,
    //     data: model,
    //     xhrFields: { withCredentials: true },
    //     crossDomain: true,
    //     dataType: 'json',
    //     success: function(response) {
    //       _self.setState(
    //         {
    //           editing: false,
    //         },
    //         function() {
    //           _self.props.onSave(response);
    //         },
    //       );
    //     },
    //   },
    // );
  };

  dismiss = e => {
    e.preventDefault();
    this.setState({
      editing: false,
    });
  };

  render() {
    const { editMode, children, form, className, placeholder } = this.props;
    const { editing } = this.state;

    console.log(this.props);

    if (editing) {
      return (
        <span className="editable-content">
          <Form
            handleSubmit={this.handleSubmit}
            footerRenderer={({ loading, canSubmit }) => (
              <FormFooter>
                <FormSubmit
                  label={window.I18n.t('utils.actions.save')}
                  className="btn-raised"
                  canSubmit={canSubmit}
                  loading={loading}
                />
                <a
                  style={{ marginLeft: 8 }}
                  href="#"
                  className="link-secondary"
                  onClick={this.dismiss}
                >
                  {window.I18n.t('utils.actions.not_now')}
                </a>
              </FormFooter>
            )}
            className="editable-form"
          >
            {form}
          </Form>
        </span>
      );
    }

    if (editMode) {
      if (form.props.value && form.props.value !== '') {
        return (
          <span className="editable-content">
            <span
              className="editable"
              style={{ whiteSpace: 'pre-wrap' }}
              onClick={this.edit}
            >
              {children}
            </span>
          </span>
        );
      }

      return (
        <span className="editable-content">
          <span
            className={classNames(className, 'editable placeholder')}
            style={{ whiteSpace: 'pre-wrap' }}
            onClick={this.edit}
          >
            {placeholder}
          </span>
        </span>
      );
    }

    return children || null;
  }
}
