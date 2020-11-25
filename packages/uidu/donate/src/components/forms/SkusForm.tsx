import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { isCustomSku } from '../../utils';

function CustomSkuForm({ donation, sku, handleSubmit }) {
  const [customAmount, setCustomAmount] = useState(donation.amount);
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <div className="mt-3">
          <FormSubmit
            label={
              <FormattedMessage
                id="guidu.donate.donation.submit"
                defaultMessage={`Donate {customAmount}`}
                values={{
                  customAmount: customAmount ? customAmount / 100 : null,
                }}
              />
            }
            loading={loading}
            canSubmit={canSubmit}
            className="px-5 btn-primary"
          />
        </div>
      )}
    >
      <FieldText
        type="hidden"
        name="orderAttributes[itemsAttributes][0][skuId]"
        value={sku.id}
      />
      <div className="mt-3">
        <FormattedMessage
          defaultMessage="Choose your donation amount"
          id="guidu.donate.amount.custom"
        >
          {(placeholder) => (
            <FieldText
              addonBefore={
                <span className="input-group-text bg-white">
                  {sku.currency}
                </span>
              }
              type="number"
              placeholder={placeholder}
              name="orderAttributes[itemsAttributes][0][quantity]"
              label={
                <FormattedMessage
                  id="guidu.donate.sku.custom.label"
                  defaultMessage="Donation amount"
                />
              }
              onChange={(_name, value) => setCustomAmount(value * 100)}
              value={customAmount}
              min={5}
              required
            />
          )}
        </FormattedMessage>
      </div>
    </Form>
  );
}

function SkuForm({ sku, handleSubmit }) {
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <div className="mt-3">
          <FormSubmit
            label={
              <FormattedMessage
                id="guidu.donate.donation.submit"
                defaultMessage={`Donate`}
                values={{}}
              />
            }
            loading={loading}
            canSubmit={canSubmit}
            className="px-5 btn-primary"
          />
        </div>
      )}
    >
      <FieldText
        type="hidden"
        name="orderAttributes[itemsAttributes][0][skuId]"
        value={sku.id}
      />
      <FieldText
        type="hidden"
        name="orderAttributes[itemsAttributes][0][quantity]"
        value={1}
      />
    </Form>
  );
}

export default function SkuRenderer({
  donation,
  sku,
  handleSubmit,
  isSelected,
}) {
  if (isCustomSku(sku)) {
    return (
      <>
        <h6 className="mb-0 font-weight-bold">{sku.stripeAttributes?.name}</h6>
        {isSelected && (
          <CustomSkuForm
            donation={donation}
            sku={sku}
            handleSubmit={handleSubmit}
          />
        )}
      </>
    );
  }
  return (
    <>
      <h6 className="mb-0 font-weight-bold">{sku.price / 100}</h6>
      {sku.stripeAttributes?.name && (
        <p className="mb-0 mt-2">{sku.stripeAttributes?.name}</p>
      )}
      {sku.stripeAttributes?.description && (
        <p className="text-muted mt-1 mb-0">
          {sku.stripeAttributes?.description}
        </p>
      )}
      {isSelected && <SkuForm sku={sku} handleSubmit={handleSubmit} />}
    </>
  );
}
