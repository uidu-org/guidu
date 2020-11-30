import Checkbox from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import Form, { FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useRef } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { FormattedMessage } from 'react-intl';

function Contact({ contact, handleSubmit }) {
  const form = useRef(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyCallback = async (model) =>
    executeRecaptcha('login').then((token) =>
      handleSubmit({
        ...model,
        'g-recaptcha-response': token,
      }),
    );

  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <FormSection
              isFirst
              isLast
              name={<FormattedMessage defaultMessage="Contact info" />}
              description={
                <p className="text-muted">
                  <FormattedMessage defaultMessage="Insert your contact details" />
                </p>
              }
            >
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="card-header">
                      <FormattedMessage defaultMessage="Proceed as a guest" />
                    </div>
                    <div className="card-body">
                      <Form
                        ref={form}
                        handleSubmit={verifyCallback}
                        footerRenderer={({ canSubmit, loading }) => (
                          <FormSectionSubmit
                            loading={loading}
                            canSubmit={canSubmit}
                            scope="primary"
                            label="Save"
                          />
                        )}
                      >
                        <FieldText
                          type="text"
                          label={
                            <FormattedMessage defaultMessage="First name" />
                          }
                          name="contact[firstName]"
                          autoComplete="given-name"
                          value={contact?.firstName}
                          required
                        />
                        <FieldText
                          type="text"
                          label={
                            <FormattedMessage defaultMessage="Last name" />
                          }
                          name="contact[lastName]"
                          autoComplete="family-name"
                          value={contact?.lastName}
                          required
                        />

                        <FieldText
                          type="text"
                          label={<FormattedMessage defaultMessage="Email" />}
                          name="contact[email]"
                          autoComplete="email"
                          value={contact?.email}
                          required
                        />
                        <div className="form-group">
                          <Checkbox
                            name="contact[privacy]"
                            label={
                              <FormattedMessage defaultMessage="I accept the terms of service and have read the privacy policy. I agree that Eventbrite may share my information with the event organizer." />
                            }
                            layout="elementOnly"
                            required
                            value={contact?.privacy}
                          />
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100">
                    <div className="card-header">Registrati</div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}

export default function ContactWithRecaptcha({
  reCaptchaKey = '6LdLkqgUAAAAAPNT6KJn0Emp5bgJw3N9CQ-n27Dg',
  contact,
  handleSubmit,
}) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      <Contact contact={contact} handleSubmit={handleSubmit} />
    </GoogleReCaptchaProvider>
  );
}
