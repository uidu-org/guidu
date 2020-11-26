import FieldTextarea from '@uidu/field-textarea';
import FieldToggle from '@uidu/field-toggle';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DedicationForm from '../forms/DedicationForm';

export default function Preferences({
  handleSubmit,
  currentContact,
  donation,
}) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [leaveAMessage, setLeaveAMessage] = useState(!!donation.body);
  const [isDedicated, setIsDedicated] = useState(!!donation.dedication);

  const anonymize = (e) => {
    e.preventDefault();
    setIsAnonymous(!isAnonymous);
  };

  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <Form
              handleSubmit={handleSubmit}
              footerRenderer={({ canSubmit }) => (
                <FormSectionSubmit
                  canSubmit={canSubmit}
                  scope="primary"
                  label={
                    <FormattedMessage
                      defaultMessage="Next"
                      id="guidu.donate.preferences.submit"
                    />
                  }
                />
              )}
            >
              <FormSection
                name="Donation preferences"
                description={
                  <p className="text-muted">
                    Choose how much you want to donate and if you want to donate
                    recurringly
                  </p>
                }
                isFirst
                isLast
              >
                <FieldToggle
                  className="py-3 mb-2"
                  name="preferences[isAnonymous]"
                  label={
                    <div>
                      <h6 className="mb-1">
                        <FormattedMessage
                          defaultMessage="Donate anonymously"
                          id="guidu.donate.preferences.anonymous"
                        />
                      </h6>
                      <p className="small text-muted text-form">
                        When you donate anonymously, your name will never appear
                        in public as a donor. But, your name will be recorded so
                        that we can send a tax donation receipt.
                      </p>
                    </div>
                  }
                />
                <div>
                  <FieldToggle
                    className="py-3 mb-2"
                    name="preferences[isDedicated]"
                    onChange={(_name, value) => setIsDedicated(value)}
                    label={
                      <div>
                        <h6 className="mb-1">
                          <FormattedMessage
                            defaultMessage="Dedicate this donation"
                            id="guidu.donate.preferences.dedicated"
                          />
                        </h6>
                        <p className="small text-muted text-form">
                          You can dedicate your donation to someone special. If
                          you would like to notify the person or someone else of
                          your dedication, add their email to the field that
                          says "Email address for notification." Your message
                          and information about your donation will be sent to
                          that email address.
                        </p>
                      </div>
                    }
                  />
                  {isDedicated && (
                    <DedicationForm dedication={donation.dedication} />
                  )}
                </div>
                <div>
                  <FieldToggle
                    className="py-3 mb-2"
                    name="preferences[leaveAMessage]"
                    onChange={(_name, value) => {
                      setLeaveAMessage(value);
                    }}
                    label={
                      <div>
                        <h6 className="mb-1">
                          <FormattedMessage
                            defaultMessage="Leave a message"
                            id="guidu.donate.preferences.leaveAMessage"
                          />
                        </h6>
                        <p className="small text-muted text-form">
                          You can choose whether your message is public or
                          private
                        </p>
                      </div>
                    }
                  />
                  {leaveAMessage && (
                    <>
                      <div className="mb-3">
                        <FieldTextarea
                          autoFocus
                          layout="elementOnly"
                          rows={3}
                          label={
                            <FormattedMessage
                              defaultMessage="Leave a message"
                              id="guidu.donate.preferences.submit"
                            />
                          }
                          name="body"
                          className="form-control form-control-autosize"
                          value={donation?.body}
                        />
                      </div>
                    </>
                  )}
                </div>
              </FormSection>
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
