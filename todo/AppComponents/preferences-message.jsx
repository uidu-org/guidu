import React, { Component } from 'react';
import pluralize from 'pluralize';
import snakeCase from 'lodash/snakeCase';

import {
  Form,
  FormFooter,
  FormMeta,
  FormActions,
  FormSubmit,
} from '@uidu/forms';

import { Textarea } from '@uidu/inputs';

import { ModalTrigger, Modal } from 'components/Modal';

export default class PreferencesMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: undefined,
    };
  }

  showPreview = e => {};

  render() {
    const { object, preferences, method, name } = this.props;

    return (
      <div>
        <p className="lead">
          {I18n.t(
            `apps.${pluralize(
              snakeCase(object.klass),
            )}.views.sections.preferences.${name}.description`,
          )}
        </p>
        <Form
          handleSubmit={values => console.log(values)}
          footerRenderer={({ canSubmit }) => (
            <FormFooter>
              <FormMeta>
                <ModalTrigger>
                  <button className="btn btn-simple" disabled={!canSubmit}>
                    {I18n.t('utils.actions.preview')}
                  </button>
                </ModalTrigger>
              </FormMeta>
              <FormActions>
                <FormSubmit method={method} canSubmit={canSubmit} />
              </FormActions>
            </FormFooter>
          )}
        >
          <Textarea
            ref={c => {
              this.editor = c;
            }}
            className="form-control form-control-autosize"
            value={preferences && preferences[name]}
            name={`${snakeCase(object.klass)}[preferences][${name}]`}
            placeholder={I18n.t(
              `activerecord.prompts.${snakeCase(
                object.klass,
              )}.preferences.${name}`,
            )}
            rows={10}
            required
          />
        </Form>
      </div>
    );
  }
}

// window.AppSectionsPreferencesMessage = React.createClass({

//   mixins: [FormHelpersMixin],

//   getInitialState() {
//     return {
//       canSubmit: false,
//       preview: null,
//     };
//   },

//   showPreview(e) {
//     const {
//       object,
//       name,
//     } = this.props;

//     e.preventDefault();
//     // Store event to pass it to children
//     const event = e;
//     // build preview
//     const model = this.form.getModel();
//     // format html
//     const bodyContentState = this.editor.getContentState();
//     const bodyHTML = this.editor.toHTML(bodyContentState);

//     // set state
//     this.setState({
//       preview: (
//         <Preview.Webpage
//           bodyHTML={bodyHTML}
//         />
//       ),
//     }, function preview() {
//       this.preview.new(event);
//     });
//   },

//   handleSubmit: function(model, resetForm) {
//     const {
//       object,
//       preferences,
//       method,
//       name,
//       url
//     } = this.props;

//     this.disableButton();

//     const bodyContentState = this.editor.getContentState();
//     model[snakeCase(object.klass)].preferences[name] = this.editor.toFullText(bodyContentState);

//     Messenger().run({
//       successMessage: 'Preferenze aggiornate con successo',
//       errorMessage: 'Errore',
//       progressMessage: I18n.t('utils.flash.processing'),
//       showCloseButton: false,
//       retry: true,
//     }, {
//       url,
//       type: 'PATCH',
//       data: model,
//       xhrFields: { withCredentials: true },
//       crossDomain: true,
//       dataType: 'text json',
//       context: this,
//       success(response) {
//         this.enableButton();
//         this.props.onSave && this.props.onSave(response);
//       },
//     });
//   },

//   ,
// })

// <PreviewsNew
//   ref={(c) => this.preview = c}
//   onClick={this.showPreview}
//   preview={this.state.preview}
// >
//   <button className="btn btn-simple" disabled={!canSubmit}>{I18n.t('utils.actions.preview')}</button>
// </PreviewsNew>
