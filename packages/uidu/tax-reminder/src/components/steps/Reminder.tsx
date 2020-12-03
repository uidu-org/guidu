import FieldDate from '@uidu/field-date';
import styles from '@uidu/field-date/index.module.scss';
import { Form, FormSection, FormSectionSubmit, FormWrapper } from '@uidu/form';
import Select from '@uidu/select';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import React from 'react';
import { FormattedMessage } from 'react-intl';

dayjs.extend(localeData);

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
                name={<FormattedMessage defaultMessage="Set your reminder" />}
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
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <Select
                      options={dayjs()
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
