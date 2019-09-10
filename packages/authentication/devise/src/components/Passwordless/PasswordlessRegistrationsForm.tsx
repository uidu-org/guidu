import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { Fragment, PureComponent } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  passwordless_registrations_title: {
    id: 'guidu.devise.passwordless_registrations_title',
    defaultMessage: 'Sign up',
    description: 'passwordless_registrations_title',
  },
  passwordless_registrations_description: {
    id: 'guidu.devise.passwordless_registrations_description',
    defaultMessage: 'Sign up with to discover stories and make impact',
    description: 'passwordless_registrations_description',
  },
  passwordless_registrations_primary_cta: {
    id: 'guidu.devise.passwordless_registrations_primary_cta',
    defaultMessage: 'Sign up',
    description: 'passwordless_registrations_primary_cta',
  },
  passwordless_registrations_email_label: {
    id: 'guidu.devise.passwordless_registrations_email_label',
    defaultMessage: 'Insert your email',
    description: 'passwordless_registrations_email_label',
  },

});

export default class PasswordlessRegistrationsForm extends PureComponent<
                 any,
                 any
               > {
                 handleSubmit = async ({ exists, ...model }) => {
                   const { onSignUp, signUp, onSignUpError } = this.props;
                   return signUp(model);
                 };

                 render() {
                   const { routes, additionalInfo } = this.props;
                   return (
                     <>
                       <div className="text-center mb-4">
                         <h3>
                           <FormattedMessage
                             {...messages.passwordless_registrations_title}
                           />
                         </h3>
                         <p className="mb-0">
                           <FormattedMessage
                             {...messages.passwordless_registrations_description}
                           />
                         </p>
                       </div>
                       <Form
                         handleSubmit={this.handleSubmit}
                         footerRenderer={({ canSubmit, loading }) => [
                           <FormSubmit
                             className="btn-primary w-100"
                             canSubmit={canSubmit}
                             loading={loading}
                             label={
                               <FormattedMessage
                                 {...messages.passwordless_registrations_primary_cta}
                               />
                             }
                           />,
                         ]}
                       >
                         <FieldText
                           type="email"
                           label={
                             <FormattedMessage
                               {...messages.passwordless_registrations_email_label}
                             />
                           }
                           name="user[email]"
                           autoComplete="email"
                           autoCorrect="off"
                           required
                         />
                         {additionalInfo}
                       </Form>
                     </>
                   );
                 }
               }
