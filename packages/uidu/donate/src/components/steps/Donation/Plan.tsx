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
            {plans.map((plan, index) => {
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
                    donation={donation}
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
