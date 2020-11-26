import Field from '@uidu/field';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell/src';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Application({ call, application, onSave }) {
  const handleSubmit = async (model) => console.log(model);

  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <Form
              handleSubmit={handleSubmit}
              footerRenderer={({ canSubmit, loading }) => (
                <FormSectionSubmit
                  scope="primary"
                  canSubmit={canSubmit}
                  loading={loading}
                  label={
                    <FormattedMessage
                      defaultMessage="Next"
                      id="guidu.apply.next"
                    />
                  }
                />
              )}
            >
              <FormSection
                isFirst
                isLast
                name={
                  <FormattedMessage
                    defaultMessage="Submit your application"
                    id="guidu.apply.application.name"
                  />
                }
                description={
                  <p className="text-muted">
                    <FormattedMessage
                      defaultMessage=""
                      id="guidu.apply.application.description"
                    />
                  </p>
                }
              >
                {call.form.questions.map((question) => (
                  <Field
                    {...question}
                    answers={application.answers}
                    object="application"
                  />
                ))}
              </FormSection>
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
