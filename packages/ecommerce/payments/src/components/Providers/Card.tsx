import Form from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FieldCard from '../Fields/FieldCard';

export default function Card({
  handleSubmit,
  providerProps = {},
  onChange,
  loading = false,
  canSubmit = false,
  error,
  footerRenderer,
  provider,
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <style>{`#credit-card { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <Form
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={() => footerRenderer({ loading, canSubmit })}
      >
        <div
          style={{
            position: 'relative',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          <FieldCard
            label={
              <FormattedMessage defaultMessage="Insert your credit / debit card details" />
            }
            id="credit-card"
            name="credit-card"
            onChange={onChange}
            providerProps={providerProps}
            onReady={() => setIsLoading(false)}
            required
          />
        </div>
        {error && <div className="alert alert-warning">{error.message}</div>}
        {children}
      </Form>
    </>
  );
}
