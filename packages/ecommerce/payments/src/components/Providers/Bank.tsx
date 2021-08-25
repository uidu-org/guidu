import Form from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';
import FieldBank from '../Fields/FieldBank';

export default function Bank({
  label = <FormattedMessage defaultMessage="Insert your bank details" />,
  handleSubmit,
  footerRenderer = (props: { loading?: boolean; canSubmit?: boolean }) => null,
  loading = false,
  canSubmit = false,
  provider,
  providerProps = {},
  formProps = {},
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <style>{`#iban-element { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <Form
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={() => footerRenderer({ loading, canSubmit })}
        {...formProps}
      >
        <div css={[tw`relative`, isLoading ? tw`invisible` : tw`visible`]}>
          <FieldBank
            label={label}
            name="iban-element"
            id="iban-element"
            onReady={() => setIsLoading(false)}
            providerProps={providerProps}
            required
          />
        </div>
        {children}
      </Form>
    </>
  );
}
