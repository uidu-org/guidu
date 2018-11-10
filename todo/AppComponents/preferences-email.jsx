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

import { Input, Textarea } from '@uidu/inputs';

import { ModalTrigger, Modal, ModalHeader, ModalBody } from 'components/Modal';

import { PreviewsEmail } from 'components/Previews';

export default class PreferencesEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: undefined,
    };
  }

  buildPreview = () => {
    const { object, name } = this.props;
    // build preview
    const model = this.form.form.getModel();
    console.log('called build preview');
    // format html
    // bodyContentState = this._editor.getContentState()
    // bodyHTML = this._editor.toHTML(bodyContentState)

    // set state
    this.setState({
      preview: {
        subject: model[snakeCase(object.klass)].preferences[name].subject,
        replyTo: model[snakeCase(object.klass)].preferences[name].reply_to,
        bodyHTML: model[snakeCase(object.klass)].preferences[name].body,
      },
    });
  };

  preferenceValue = key => {
    const { preferences, name } = this.props;
    if (preferences && preferences[name] && preferences[name][key]) {
      return preferences[name][key];
    }
    return undefined;
  };

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
          ref={c => {
            this.form = c;
          }}
          handleSubmit={values => console.log(values)}
          footerRenderer={({ canSubmit, loading }) => (
            <FormFooter>
              <FormMeta>
                <FormSubmit
                  loading={loading}
                  method={method}
                  canSubmit={canSubmit}
                />
                <ModalTrigger
                  tag="button"
                  className="btn btn-default"
                  // onSave={updateContacts}
                  onClick={this.buildPreview}
                  modalContent={
                    <Modal>
                      <ModalBody>
                        <PreviewsEmail preview={this.state.preview} />
                      </ModalBody>
                    </Modal>
                  }
                >
                  <span>{window.I18n.t('utils.actions.preview')}</span>
                </ModalTrigger>
              </FormMeta>
              <FormActions />
            </FormFooter>
          )}
        >
          <Input
            label={window.I18n.t(
              `activerecord.attributes.${snakeCase(
                object.klass,
              )}.preferences.${name}.subject`,
            )}
            type="text"
            name={`${snakeCase(object.klass)}[preferences][${name}][subject]`}
            value={this.preferenceValue('subject')}
            required
          />
          <Input
            label={window.I18n.t(
              `activerecord.attributes.${snakeCase(
                object.klass,
              )}.preferences.${name}.reply_to`,
            )}
            type="email"
            name={`${snakeCase(object.klass)}[preferences][${name}][reply_to]`}
            value={this.preferenceValue('reply_to')}
            required
          />
          <Textarea
            label={window.I18n.t(
              `activerecord.attributes.${snakeCase(
                object.klass,
              )}.preferences.${name}.body`,
            )}
            className="form-control form-control-autosize"
            name={`${snakeCase(object.klass)}[preferences][${name}][body]`}
            placeholder={window.I18n.t(
              `activerecord.prompts.${snakeCase(
                object.klass,
              )}.preferences.${name}.body`,
            )}
            value={this.preferenceValue('body')}
            required
            rows={10}
          />
        </Form>
      </div>
    );
  }
}

// window.AppSectionsPreferencesEmail = React.createClass({

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
//     // bodyContentState = this._editor.getContentState()
//     // bodyHTML = this._editor.toHTML(bodyContentState)

//     // set state
//     this.setState({
//       preview: (
//         <Preview.Email
//           subject={model[_.snakeCase(object.klass)].preferences[name].subject}
//           reply_to={model[_.snakeCase(object.klass)].preferences[name].reply_to}
//           bodyHTML={model[_.snakeCase(object.klass)].preferences[name].body}
//         />
//       ),
//     }, function() {
//       this.preview.new(event);
//     });
//   },

//   handleSubmit(model, resetForm) {
//     var _self = this;

//     this.disableButton();

//     Messenger().run(_self.getMessengerOptions('PATCH', _.snakeCase(this.props.object.klass)), {
//       url: _self.props.url,
//       type: 'PATCH',
//       data: model,
//       xhrFields: { withCredentials: true },
//       crossDomain: true,
//       dataType: 'text json',
//       success: function(response) {
//         _self.enableButton();
//         _self.props.onSave && _self.props.onSave(response)
//       }
//     });
//   },

//   preferenceValue(key) {
//     const {
//       preferences,
//       name,
//     } = this.props;
//     if (preferences && preferences[name] && preferences[name][key]) {
//       return preferences[name][key];
//     }
//     return undefined;
//   },

//   render() {
//     const {
//       object,
//       preferences,
//       method,
//       name,
//     } = this.props;

//     return (
//       <div>
//         <p className="lead">
//           {I18n.t(`apps.${pluralize(_.snakeCase(object.klass))}.views.sections.preferences.${name}.description`)}
//         </p>
//         <Formsy.Form ref={(c) => { this.form = c; }} onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
//           <Input name="utf8" type="hidden" value="✓" />
//           <Input type="hidden" name="authenticity_token" value={Uidu.csrfToken} />
//           <Input
//             label={I18n.t(`activerecord.attributes.${_.snakeCase(object.klass)}.preferences.${name}.subject`)}
//             type="text"
//             name={`${_.snakeCase(object.klass)}[preferences][${name}][subject]`}
//             value={this.preferenceValue('subject')}
//             required
//           />
//           <Input
//             label={I18n.t(`activerecord.attributes.${_.snakeCase(object.klass)}.preferences.${name}.reply_to`)}
//             type="email"
//             name={`${_.snakeCase(object.klass)}[preferences][${name}][reply_to]`}
//             value={this.preferenceValue('reply_to')}
//             required
//           />
//           <Textarea
//             label={I18n.t(`activerecord.attributes.${_.snakeCase(object.klass)}.preferences.${name}.body`)}
//             className="form-control form-control-autosize"
//             name={`${_.snakeCase(object.klass)}[preferences][${name}][body]`}
//             placeholder={I18n.t(`activerecord.prompts.${_.snakeCase(object.klass)}.preferences.${name}.body`)}
//             value={this.preferenceValue('body')}
//             required
//             rows={10}
//           />
//           <FormHelpers.Actions>
//             <FormHelpers.Submit method={method} canSubmit={this.state.canSubmit} />
//             <PreviewsNew
//               ref={(c) => this.preview = c}
//               onClick={this.showPreview}
//               preview={this.state.preview}
//             >
//               <button className="btn btn-simple" disabled={!this.state.canSubmit}>{I18n.t('utils.actions.preview')}</button>
//             </PreviewsNew>
//           </FormHelpers.Actions>
//         </Formsy.Form>
//       </div>
//     )
//   }
// })
