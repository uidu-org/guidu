import Downshift from 'downshift';
import React from 'react';
import { OptionScaffold } from '.';
import { isCustomSku } from '../../../utils';
import SkusForm from '../../forms/SkusForm';

export default function Sku({ donation, donationCampaign, handleSubmit }) {
  const skus = donationCampaign.products.find((p) => p.stripeKind === 'good')
    .skus;
  const customSku = skus.find(isCustomSku);

  return (
    <Downshift
      itemToString={(item) => item.id}
      initialSelectedItem={donation?.orderItem?.sku || customSku}
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
            {donationCampaign.products
              .find((p) => p.stripeKind === 'good')
              .skus.map((item, index) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <OptionScaffold
                    key={item.id}
                    item={item}
                    getItemProps={getItemProps}
                    index={index}
                    isSelected={isSelected}
                    highlightedIndex={highlightedIndex}
                  >
                    <SkusForm
                      donation={donation}
                      sku={item}
                      isSelected={isSelected}
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
