import FieldDate from '@uidu/field-date';
import { Form, FormSubmit } from '@uidu/form';
import Select from '@uidu/select';
import moment from 'moment';
import React from 'react';

export default function Reminder({ handleSubmit }) {
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <FormSubmit
          label={<span>Dona</span>}
          loading={loading}
          canSubmit={canSubmit}
          className="px-5 btn-tax-returns mb-3"
        />
      )}
    >
      <p>
        Quando hai in programma la dichiarazione dei redditi? Ti manderemo un
        promemoria il giorno selezionato.
      </p>
      <FieldDate
        label="Che giorno vuoi ricevere il promemoria?"
        name="tax_return_campaign_reminder[day]"
        selectMonths
        value={moment().toDate()}
        required
      />
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
    </Form>
  );
}
