import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import React, { useState } from 'react';

export default function Preferences({ handleSubmit, currentMember, donation }) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const anonymize = (e) => {
    e.preventDefault();
    setIsAnonymous(!isAnonymous);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit }) => (
        <FormFooter>
          <FormSubmit
            label="Salva"
            canSubmit={canSubmit}
            className="px-5 btn-donations"
          />
        </FormFooter>
      )}
    >
      <FieldTextarea
        rows={3}
        label="Lascia un messaggio (opzionale)"
        name="body"
        className="form-control form-control-autosize"
        value={donation?.body}
      />
      <div className="form-group">
        <label
          className="mb-2 w-100 d-flex justify-content-between"
          htmlFor="donation-display-name"
        >
          <span>display_name',</span>
          <a role="button" tabIndex={0} onClick={anonymize}>
            {isAnonymous ? 'Inserisci il nome' : '.anonymous'}
          </a>
        </label>
        <FieldText
          type="text"
          layout="elementOnly"
          name="preferences[display_name]"
          id="donation-display-name"
          value={isAnonymous ? '' : currentMember && currentMember.name}
          // help={'activerecord.hints.donation.preferences.display_name'}
          disabled={isAnonymous}
        />
      </div>
      <div className="form-group">
        <Checkbox
          label="Anonimo"
          name="preferences[anonymous]"
          layout="elementOnly"
          value={isAnonymous ? 'true' : 'false'}
        />
      </div>
    </Form>
  );
}
