import classNames from 'classnames';
import Downshift from 'downshift';
import React, { useState } from 'react';
import { Check } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { DonationProps } from '../../types';
import PlansForm from '../forms/PlansForm';
import SkusForm from '../forms/SkusForm';

const Option = styled.div`
  cursor: pointer;
  transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover,
  &.active {
    transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transform: scale(1.05);
  }
`;

function RecurrenceOption({ item, index, isSelected, getItemProps }) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <button
      className={`btn border${isSelected ? ' btn-light' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      type="button"
      {...rest}
    >
      {item.name}
    </button>
  );
}

function OptionScaffold({
  item,
  highlightedIndex,
  index,
  isSelected,
  getItemProps,
  children,
}) {
  const { onClick, onMouseDown, ...rest } = getItemProps({ item, index });
  const isHighlighted = highlightedIndex === index;

  return (
    <Option
      key={index}
      className={classNames('card mb-3', {
        'border-donations active': isHighlighted || isSelected,
      })}
      {...(!isSelected && {
        onMouseDown,
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        },
      })}
      {...rest}
    >
      <span
        className={classNames('', {
          'bg-donations text-white': isSelected,
        })}
        style={{
          position: 'absolute',
          height: 20,
          width: 20,
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          right: -8,
          top: -8,
        }}
      >
        {isSelected && <Check size={16} />}
      </span>
      <div className="card-body p-3 py-md-4">{children}</div>
    </Option>
  );
}

const recurrences = [
  {
    id: 'once',
    name: (
      <FormattedMessage
        defaultMessage="Once"
        id="guidu.donate.recurrence.once"
      />
    ),
  },
  {
    id: 'month',
    name: (
      <FormattedMessage
        defaultMessage="Recurring"
        id="guidu.donate.recurrence.monthly"
      />
    ),
  },
];

export default function Donation({
  providers = [],
  donationCampaign,
  donation,
  handleSubmit,
}: DonationProps) {
  const [recurrence, setRecurrence] = useState(donation?.recurrence || 'month');

  return (
    <>
      <Downshift
        onChange={(selection) => setRecurrence(selection.id)}
        itemToString={(item) => (item ? item.id : '')}
        initialSelectedItem={recurrences[1]}
      >
        {({ getItemProps, getMenuProps, selectedItem, getRootProps }) => (
          <div {...getRootProps({ refKey: 'ref' }, { suppressRefError: true })}>
            <div className="btn-group w-100 mb-4" {...getMenuProps()}>
              {recurrences.map((item, index) => (
                <RecurrenceOption
                  key={item.id}
                  isSelected={selectedItem?.id === item.id}
                  index={index}
                  item={item}
                  getItemProps={getItemProps}
                />
              ))}
            </div>
          </div>
        )}
      </Downshift>
      {recurrence === 'month' && (
        <div className="alert alert-warning mb-4">
          <FormattedMessage
            defaultMessage="You can edit your recurring donation anytime"
            id="guidu.donate.recurring.warning"
          />
        </div>
      )}
      {recurrence === 'month' ? (
        <Downshift itemToString={(item) => item.id}>
          {({
            getItemProps,
            getMenuProps,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <div
              {...getRootProps({ refKey: 'ref' }, { suppressRefError: true })}
            >
              <div {...getMenuProps()}>
                {donationCampaign.products
                  .find((p) => p.stripeKind === 'service')
                  .plans.map((item, index) => {
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
                        <PlansForm
                          plan={item}
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
      ) : (
        <Downshift itemToString={(item) => item.id}>
          {({
            getItemProps,
            getMenuProps,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <div
              {...getRootProps({ refKey: 'ref' }, { suppressRefError: true })}
            >
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
      )}
    </>
  );
  {
    /* <Select
        name="paymentMethod"
        label={
          <FormattedMessage
            defaultMessage="Payment method"
            id="guidu.donate.paymentMethod.label"
          />
        }
        options={providers}
        value={providers[0].id}
        required
      /> */
  }
}
