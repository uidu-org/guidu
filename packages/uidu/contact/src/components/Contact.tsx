import Checkbox from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
// import Recaptcha from 'react-recaptcha';

export default class Contact extends PureComponent<any> {
  static defaultProps = {
    onSave: console.log,
    scope: 'contacts',
  };

  private recaptchaInstance = React.createRef();
  private form = React.createRef();

  handleSubmit = async () => {
    // (this.recaptchaInstance.current as any).execute();
    // console.log((this.recaptchaInstance.current as any).execute());
  };

  // executed once the captcha has been verified
  // can be used to post forms, redirect, etc.
  verifyCallback = captchaResponse => {
    const { onSave } = this.props;
    return onSave({
      ...(this.form.current as any).getModel(),
      'g-recaptcha-response': captchaResponse,
    });
  };

  render() {
    const { scope } = this.props;
    return (
      <Form
        ref={this.form}
        handleSubmit={this.props.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => (
          <FormSubmit
            loading={loading}
            canSubmit={canSubmit}
            className={`px-5 btn-${scope}`}
            label="Save"
          />
        )}
      >
        <FieldText
          type="text"
          label={
            <FormattedMessage
              defaultMessage="First name"
              id="guidu.contact.firstName"
            />
          }
          name="contact[first_name]"
          autoComplete="given-name"
          required
        />
        <FieldText
          type="text"
          label={
            <FormattedMessage
              defaultMessage="Last name"
              id="guidu.contact.lastName"
            />
          }
          name="contact[last_name]"
          autoComplete="family-name"
          required
        />
        <FieldText
          type="text"
          label={
            <FormattedMessage defaultMessage="Email" id="guidu.contact.email" />
          }
          name="contact[email]"
          autoComplete="email"
          required
        />
        <div className="form-group">
          <Checkbox
            name="contact[privacy]"
            label={
              <FormattedMessage
                defaultMessage="I accept the terms of service and have read the privacy policy. I agree that Eventbrite may share my information with the event organizer."
                id="guidu.contact.lastName"
              />
            }
            layout="elementOnly"
            required
          />
        </div>
        {/* <div className="form-group">
          <Recaptcha
            ref={this.recaptchaInstance}
            sitekey="6LdLkqgUAAAAAPNT6KJn0Emp5bgJw3N9CQ-n27Dg"
            size="invisible"
            render="explicit"
            badge="inline"
            verifyCallback={this.verifyCallback}
          />
        </div> */}
      </Form>
    );
  }
}
