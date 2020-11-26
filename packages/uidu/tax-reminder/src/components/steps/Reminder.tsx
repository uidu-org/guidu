import FieldDate from '@uidu/field-date';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import Select from '@uidu/select';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Reminder({ handleSubmit }) {
  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <Form
              handleSubmit={handleSubmit}
              footerRenderer={({ canSubmit, loading }) => (
                <FormSectionSubmit
                  label={<span>Next</span>}
                  loading={loading}
                  canSubmit={canSubmit}
                  scope="primary"
                />
              )}
            >
              <FormSection
                isFirst
                isLast
                name={
                  <FormattedMessage
                    defaultMessage="Set your reminder"
                    id="guidu.taxReminder.reminder.title"
                  />
                }
                description={
                  <p className="text-muted">
                    Quando hai in programma la dichiarazione dei redditi? Ti
                    manderemo un promemoria il giorno selezionato.
                  </p>
                }
              >
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="day">
                        Che giorno vuoi ricevere il promemoria?
                      </label>
                      <div className="card card-body">
                        <FieldDate
                          name="day"
                          selectMonths
                          value={moment().toDate()}
                          required
                          layout="elementOnly"
                          withCalendar
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <Select
                      options={moment()
                        .localeData()
                        .months()
                        .map((item, index) => ({
                          id: index + 1,
                          name: item.charAt(0).toUpperCase() + item.slice(1),
                        }))}
                      label="Fascia oraria"
                      name="tax_return_campaign_reminder[month]"
                      value={6}
                      required
                    />
                  </div>
                </div>
              </FormSection>
            </Form>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
