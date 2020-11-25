import { FormSection, FormWrapper } from '@uidu/form';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
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

  const scroller = useRef(null);
  const { attendances } = order;

  return (
    <FormWrapper>
      {attendances.map((attendance, index) => (
        <FormSection
          name={
            <FormattedMessage
              defaultMessage="Participant"
              id="guidu.attend.attendance.step.label"
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
    </FormWrapper>
  );
}
