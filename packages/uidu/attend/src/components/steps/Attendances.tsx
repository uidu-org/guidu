import Form, { FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Attendance from '../Attendance';

export default function Attendances({
  currentContact,
  order,
  createAttendance,
  onSave,
}) {
  if (!order || !order.attendances) {
    return null;
  }
  const { attendances } = order;

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
                  label={<FormattedMessage defaultMessage="Proceed" />}
                />
              )}
            >
              {attendances.map((attendance, index) => (
                <FormSection
                  key={attendance.id}
                  isFirst={index === 0}
                  isLast={index === attendances.length - 1}
                  name={
                    <FormattedMessage
                      defaultMessage="Participant {index}"
                      values={{
                        index: index + 1,
                      }}
                    />
                  }
                >
                  <Attendance index={index} attendance={attendance} />
                </FormSection>
              ))}
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
