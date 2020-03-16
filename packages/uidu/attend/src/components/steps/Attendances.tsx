import { ShellBody } from '@uidu/shell';
import Stepper, { Step } from '@uidu/stepper';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Attendance from '../Attendance';

export default function Attendances({
  currentMember,
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
    <ShellBody scrollable ref={scroller}>
      <Stepper defaultStep="1" scope="events" scrollElement={scroller}>
        {({ getStepProps, jumpToStep }) => (
          <>
            {attendances.map((attendance, index) => (
              <Step
                {...getStepProps()}
                name={`attendance-${index + 1}`}
                label={
                  <FormattedMessage
                    defaultMessage="Participant"
                    id="guidu.attend.attendance.step.label"
                  />
                }
                number={index + 1}
                // isActive={() => true}
              >
                <Attendance
                  order={order}
                  attendance={attendance}
                  handleSubmit={async model =>
                    createAttendance(model).then(() => {
                      jumpToStep(`attendance-${index + 2}`);
                    })
                  }
                />
              </Step>
            ))}
          </>
        )}
      </Stepper>
    </ShellBody>
  );
}
