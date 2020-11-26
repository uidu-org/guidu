import FieldText from '@uidu/field-text';
import { Form, FormSectionSubmit } from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { isCustomPlan } from '../../utils';

function CustomPlanForm({ donation, plan, handleSubmit, recurrence }) {
  const [customAmount, setCustomAmount] = useState(
    donation.amount ? donation.amount / 100 : null,
  );
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) =>
        canSubmit && (
          <div className="mt-3">
            <FormSectionSubmit
              label={
                <FormattedMessage
                  id="guidu.donate.donation.submit"
                  defaultMessage={`Donate {customAmount} {currency} {recurrence, select,
                  once {}
                  month {each month}
                }`}
                  values={{
                    currency: plan.currency,
                    recurrence,
                    customAmount: donation.amount
                      ? donation.amount / 100
                      : customAmount / 100,
                  }}
                />
              }
              loading={loading}
              canSubmit={canSubmit}
              scope="primary"
            />
          </div>
        )
      }
    >
      <FieldText
        type="hidden"
        name="subscriptionAttributes[itemsAttributes][0][planId]"
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
              name="subscriptionAttributes[itemsAttributes][0][quantity]"
              label={
                <FormattedMessage
                  id="guidu.donate.plan.custom.label"
                  defaultMessage="Donation amount"
                />
              }
              rowClassName="mb-0"
              value={customAmount}
              onChange={(_name, value) => setCustomAmount(value * 100)}
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
          <FormSectionSubmit
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
            scope="primary"
          />
        </div>
      )}
    >
      <FieldText
        type="hidden"
        name="subscriptionAttributes[itemsAttributes][0][planId]"
        value={plan.id}
      />
      <FieldText
        type="hidden"
        name="subscriptionAttributes[itemsAttributes][0][quantity]"
        value={1}
      />
    </Form>
  );
}

export default function PlansForm({
  donation,
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
            donation={donation}
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
