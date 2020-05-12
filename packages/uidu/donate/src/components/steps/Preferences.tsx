import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
            label={
              <FormattedMessage
                defaultMessage="Next"
                id="guidu.donate.preferences.submit"
              />
            }
            canSubmit={canSubmit}
            className="px-5 btn-donations"
          />
        </FormFooter>
      )}
    >
      <FieldTextarea
        rows={3}
        label={
          <FormattedMessage
            defaultMessage="Leave a message (<small>optional</small>)"
            id="guidu.donate.preferences.submit"
            values={{
              small: (small) => <small className="text-muted">{small}</small>,
            }}
          />
        }
        name="body"
        className="form-control form-control-autosize"
        value={donation?.body}
      />
      <div className="form-group">
        <label
          htmlFor="preferences_displayName"
          className="w-100 mb-2 d-flex align-items-center justify-content-between"
        >
          <span>
            <FormattedMessage
              id="guidu.donate.preferences.displayName"
              defaultMessage="Display name"
            />
          </span>
          <Checkbox
            layout="elementOnly"
            name="preferences[isAnonymous]"
            value={isAnonymous}
            onChange={(_name, value) => setIsAnonymous(value)}
            label={
              <FormattedMessage
                id="guidu.donate.preferences.isAnonymous"
                defaultMessage="Anonymous"
              />
            }
          />
        </label>
        <FieldText
          name="preferences[displayName]"
          layout="elementOnly"
          value={isAnonymous ? '' : currentMember && currentMember.name}
          disabled={isAnonymous}
        />
      </div>
    </Form>
  );
}
