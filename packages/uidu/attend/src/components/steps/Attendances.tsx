import { FormSection, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Form, { FormSectionSubmit } from '../../../../../forms/form/src';
import Attendance from '../Attendance';

export default function Attendances({
  currentContact,
  order,
  createAttendance,
  onSave,
}) {
  if (!order || !order.items) {
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
                  label={
                    <FormattedMessage
                      defaultMessage="Proceed"
                      id="guidu.attend.order.submit"
                    />
                  }
                />
              )}
            >
              {attendances.map((attendance, index) => (
                <FormSection
                  isFirst={index === 0}
                  isLast={index === attendances.length - 1}
                  name={
                    <FormattedMessage
                      defaultMessage="Participant {index}"
                      id="guidu.attend.attendance.step.label"
                      values={{
                        index: index + 1,
                      }}
                    />
                  }
                >
                  <Attendance
                    order={order}
                    attendance={attendance}
                    handleSubmit={async (model) =>
                      createAttendance(model).then(() => {
                        jumpToStep(`attendance-${index + 2}`);
                      })
                    }
                  />
                </FormSection>
              ))}
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
