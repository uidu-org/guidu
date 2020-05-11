import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { isCustomPlan } from '../../utils';

function CustomPlanForm({ plan, handleSubmit, recurrence }) {
  const [customAmount, setCustomAmount] = useState(null);
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <div className="mt-3">
          <FormSubmit
            label={
              <FormattedMessage
                id="guidu.donate.donation.submit"
                defaultMessage={`Donate {customAmount} {recurrence, select,
                  once {}
                  month {each month}
                }`}
                values={{
                  recurrence,
                  customAmount: customAmount ? customAmount / 100 : null,
                }}
              />
            }
            loading={loading}
            canSubmit={canSubmit}
            className="px-5 btn-donations"
          />
        </div>
      )}
    >
      <FieldText
        type="hidden"
        name="subscription[subscriptionItemsAttributes][0][planId]"
        value={plan.id}
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
                  {plan.currency}
                </span>
              }
              type="number"
              placeholder={placeholder}
              name="subscription[subscriptionItemsAttributes][0][quantity]"
              label={
                <FormattedMessage
                  id="guidu.donate.plan.custom.label"
                  defaultMessage="Donation amount"
                />
              }
              onChange={(name, value) => setCustomAmount(value * 100)}
              min={5}
              required
              addonAfter={
                <span className="input-group-text">
                  <FormattedMessage
                    defaultMessage="Monthly"
                    id="guidu.donate.recurrence.monthly"
                  />
                </span>
              }
            />
          )}
        </FormattedMessage>
      </div>
    </Form>
  );
}

function PlanForm({ plan, handleSubmit, recurrence }) {
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <div className="mt-3">
          <FormSubmit
            label={
              <FormattedMessage
                id="guidu.donate.donation.submit"
                defaultMessage={`Donate {amount} {recurrence, select,
                  once {}
                  month {each month}
                }`}
                values={{
                  recurrence,
                  amount: plan.amount / 100,
                }}
              />
            }
            loading={loading}
            canSubmit={canSubmit}
            className="px-5 btn-donations"
          />
        </div>
      )}
    >
      <FieldText
        type="hidden"
        name="subscription[subscriptionItemsAttributes][0][planId]"
        value={plan.id}
      />
      <FieldText
        type="hidden"
        name="subscription[subscriptionItemsAttributes][0][quantity]"
        value={1}
      />
    </Form>
  );
}

export default function PlansForm({
  plan,
  isSelected,
  handleSubmit,
  recurrence,
}) {
  if (isCustomPlan(plan)) {
    return (
      <>
        <h6 className="mb-0 font-weight-bold">{plan.name}</h6>
        {isSelected && (
          <CustomPlanForm
            plan={plan}
            handleSubmit={handleSubmit}
            recurrence={recurrence}
          />
        )}
      </>
    );
  }

  return (
    <>
      <h6 className="mb-0 font-weight-bold">
        {plan.amount / 100}/{plan.interval}
      </h6>
      {plan.name && <p className="mt-2 mb-0">{plan.name}</p>}
      {plan.description && (
        <p className="text-muted mt-1 mb-0">{plan.description}</p>
      )}
      {isSelected && (
        <PlanForm
          plan={plan}
          handleSubmit={handleSubmit}
          recurrence={recurrence}
        />
      )}
    </>
  );
}
