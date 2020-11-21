import Downshift from 'downshift';
import React from 'react';
import { OptionScaffold } from '.';
import { isCustomPlan } from '../../../utils';
import PlansForm from '../../forms/PlansForm';

export default function Plan({
  donationCampaign,
  donation,
  recurrence,
  handleSubmit,
}) {
  const plans = donationCampaign.products.find(
    (p) => p.stripeKind === 'service',
  ).plans;
  const customPlan = plans.find(isCustomPlan);
  const predefinedPlans = plans.filter((plan) => !isCustomPlan(plan));

  return (
    <Downshift
      itemToString={(item) => item.id}
      initialSelectedItem={donation?.subscriptionItem?.plan || customPlan}
    >
      {({
        getItemProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div {...getRootProps({ refKey: 'ref' }, { suppressRefError: true })}>
          <div {...getMenuProps()}>
            <OptionScaffold
              key={customPlan.id}
              item={customPlan}
              index={0}
              getItemProps={getItemProps}
              isSelected={selectedItem?.id === customPlan.id}
              highlightedIndex={highlightedIndex}
            >
              <PlansForm
                plan={customPlan}
                isSelected={selectedItem?.id === customPlan.id}
                recurrence={recurrence}
                handleSubmit={handleSubmit}
              />
            </OptionScaffold>
            <h6 className="my-4 text-center font-weight-bold">
              Or choose your impact
            </h6>
            {predefinedPlans.map((plan, index) => {
              const isSelected = selectedItem?.id === plan.id;
              return (
                <OptionScaffold
                  key={plan.id}
                  item={plan}
                  getItemProps={getItemProps}
                  index={index + 1}
                  isSelected={isSelected}
                  highlightedIndex={highlightedIndex}
                >
                  <PlansForm
                    plan={plan}
                    isSelected={isSelected}
                    recurrence={recurrence}
                    handleSubmit={handleSubmit}
                  />
                </OptionScaffold>
              );
            })}
          </div>
        </div>
      )}
    </Downshift>
  );
}
