import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { Fragment, PureComponent } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  simple_sessions_title: {
    id: 'guidu.devise.simple_sessions_title',
    defaultMessage: 'Sign in',
    description: 'simple_sessions_title',
  },
  simple_sessions_description: {
    id: 'guidu.devise.simple_sessions_description',
    defaultMessage: 'Sign in with your email and password',
    description: 'simple_sessions_description',
  },
  simple_sessions_primary_cta: {
    id: 'guidu.devise.simple_sessions_primary_cta',
    defaultMessage: 'Sign in',
    description: 'simple_sessions_primary_cta',
  },
  simple_sessions_secondary_cta: {
    id: 'guidu.devise.simple_sessions_secondary_cta',
    defaultMessage: 'Create an account',
    description: 'simple_sessions_secondary_cta',
  },
  simple_sessions_email_label: {
    id: 'guidu.devise.simple_sessions_email_label',
    defaultMessage: 'Insert your email',
    description: 'simple_sessions_email_label',
  },
  simple_sessions_remember_me_label: {
    id: 'guidu.devise.simple_sessions_remember_me_label',
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
});

export default class SessionsForm extends PureComponent<any, any> {
  handleSubmit = async model => {
    const { requestPasswordlessToken } = this.props;
    return requestPasswordlessToken(model);
  };

  render() {
    const { routes } = this.props;
    return (
      <Fragment>
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.simple_sessions_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.simple_sessions_description} />
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
                <FormattedMessage {...messages.simple_sessions_primary_cta} />
              }
            />,
          ]}
        >
          <FieldText
            type="email"
            label={
              <FormattedMessage {...messages.simple_sessions_email_label} />
            }
            name="user[email]"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </Form>
      </Fragment>
    );
  }
}
