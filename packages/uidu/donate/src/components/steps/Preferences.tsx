import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export default function Preferences({
  handleSubmit,
  currentContact,
  donation,
}) {
  const [isAnonymous, setIsAnonymous] = useState(false);

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
                <FieldTextarea
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
                <div className="form-group">
                  <label
                    htmlFor="preferences_displayName"
                    className="w-100 mb-2 d-flex align-items-center justify-content-between"
                  >
                    <span>
                      <FormattedMessage
                        id="guidu.donate.preferences.displayName"
                        defaultMessage="Display name"
                      />
                    </span>
                    <Checkbox
                      layout="elementOnly"
                      name="preferences[isAnonymous]"
                      value={isAnonymous}
                      onChange={(_name, value) => setIsAnonymous(value)}
                      label={
                        <FormattedMessage
                          id="guidu.donate.preferences.isAnonymous"
                          defaultMessage="Anonymous"
                        />
                      }
                    />
                  </label>
                  <FieldText
                    name="preferences[displayName]"
                    layout="elementOnly"
                    value={
                      isAnonymous ? '' : currentContact && currentContact.name
                    }
                    disabled={isAnonymous}
                  />
                </div>
              </FormSection>
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
