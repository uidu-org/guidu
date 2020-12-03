import FieldDate from '@uidu/field-date';
import styles from '@uidu/field-date/index.module.scss';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import Spinner from '@uidu/spinner';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Slots from '../Slots';

export const SlotsFallback = styled.div`
  height: 385px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Reminder({ bookable, handleSubmit }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <Form
              handleSubmit={handleSubmit}
              footerRenderer={({ canSubmit, loading }) => (
                <div className="my-5 text-center">
                  <FormSectionSubmit
                    canSubmit={canSubmit && selectedSlot && selectedDay}
                    loading={loading}
                    scope="primary"
                    label={
                      <FormattedMessage defaultMessage="Conferma appuntamento" />
                    }
                  />
                  <p className="mt-3 small text-muted">
                    {selectedDay && (
                      <>
                        {dayjs(selectedDay).format('LL')}
                        {selectedSlot && (
                          <> {dayjs(selectedSlot).format('HH:mm')}</>
                        )}
                        <br />
                      </>
                    )}
                    {/* {selectedLocation.name}
                    <br />
                    {selectedLocation.address} */}
                  </p>
                </div>
              )}
            >
              <FormSection
                isFirst
                isLast
                name={<FormattedMessage defaultMessage="Set your reminder" />}
                description={
                  <p className="text-muted">
                    Quando hai in programma la dichiarazione dei redditi? Ti
                    manderemo un promemoria il giorno selezionato.
                  </p>
                }
              >
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor="day">
                        Che giorno vuoi ricevere il promemoria?
                      </label>
                      <div className="card card-body">
                        <FieldDate
                          name="day"
                          selectMonths
                          value={dayjs().toDate()}
                          required
                          layout="elementOnly"
                          withCalendar
                          dayPickerProps={{
                            classNames: styles,
                            modifiers: {
                              [styles.selected]: dayjs().toDate(),
                            },
                          }}
                          onChange={(name, value) => setSelectedDay(value)}
                        />
                      </div>
                    </div>
                  </div>
                  {selectedDay && (
                    <div className="col-md-5">
                      <div className="px-4">
                        <p>{dayjs(selectedDay).format('LL')}</p>
                        <Slots
                          fallback={
                            <SlotsFallback>
                              <Spinner />
                            </SlotsFallback>
                          }
                          selectedService={bookable}
                          selectedDay={selectedDay}
                          onSelect={setSelectedSlot}
                        />
                      </div>
                    </div>
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
