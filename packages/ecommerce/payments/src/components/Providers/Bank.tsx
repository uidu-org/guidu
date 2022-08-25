import Form, { FormProps, useForm } from '@uidu/form';
import SectionMessage from '@uidu/section-message';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';
import FieldBank from '../Fields/FieldBank';

export default function Bank({
  label = (
    <FormattedMessage
      defaultMessage="Insert your bank details"
      id="uidu.payments.bank.label"
    />
  ),
  error,
  handleSubmit,
  footerRenderer = (props: { loading?: boolean; canSubmit?: boolean }) => null,
  loading = false,
  canSubmit = false,
  provider,
  providerProps = {},
  formProps = {},
  children,
}: {
  label?: React.ReactNode;
  error?: React.ReactNode;
  handleSubmit: (model: any) => Promise<any>;
  footerRenderer?: FormProps['footerRenderer'];
}) {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({ mode: 'onChange' });

  return (
    <>
      <style>{`#iban-element { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <Form
        form={form}
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={footerRenderer}
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
        {error && (
          <SectionMessage appearance="error" tw="mb-3">
            {error.message}
          </SectionMessage>
        )}
        {children}
      </Form>
    </>
  );
}
