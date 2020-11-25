import { FormSection, FormWrapper } from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import classNames from 'classnames';
import Downshift from 'downshift';
import React, { useEffect, useState } from 'react';
import { Check } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { DonationProps } from '../../../types';
import Plan from './Plan';
import Sku from './Sku';

const Option = styled.div`
  cursor: pointer;
  transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
  *zoom: 1;

  &:hover,
  &.active {
    transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transform: scale(1);
  }
`;

function RecurrenceOption({ item, index, isSelected, getItemProps }) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <button
      className={`btn mr-2 border${isSelected ? ' btn-primary' : ''}`}
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

export function OptionScaffold({
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
        'border-primary active': isHighlighted || isSelected,
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
          'bg-primary text-white': isSelected,
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
          right: '1rem',
          top: '1rem',
        }}
      >
        {isSelected && <Check size={16} />}
      </span>
      <div className="card-body p-4 py-md-4">{children}</div>
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
  donationCampaign,
  donation,
  handleSubmit,
}: DonationProps) {
  const [recurrence, setRecurrence] = useState(
    donation?.orderItem ? 'once' : 'month',
  );

  console.log(donation);

  useEffect(() => {
    setRecurrence(donation.orderItem ? 'once' : 'month');
  }, [donation.orderItem]);

  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <FormSection
              name="Choose funding option"
              description={
                <p className="text-muted">
                  Choose how much you want to donate and if you want to donate
                  recurringly
                </p>
              }
              isLast
              isFirst
            >
              <Downshift
                onChange={(selection) => {
                  setRecurrence(selection.id);
                }}
                itemToString={(item) => (item ? item.id : '')}
                initialSelectedItem={recurrences.find(
                  (r) => r.id === recurrence,
                )}
              >
                {({
                  getItemProps,
                  getMenuProps,
                  selectedItem,
                  getRootProps,
                }) => (
                  <div
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getRootProps(
                      { refKey: 'ref' },
                      { suppressRefError: true },
                    )}
                  >
                    <div className="form-group">
                      {/* <label htmlFor="">Choose your donation recurrence</label> */}
                      <div
                        className="d-flex align-items-center"
                        {...getMenuProps()}
                      >
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
                  </div>
                )}
              </Downshift>
              {recurrence === 'month' ? (
                <Plan
                  donation={donation}
                  donationCampaign={donationCampaign}
                  handleSubmit={handleSubmit}
                  recurrence={recurrence}
                />
              ) : (
                <Sku
                  donation={donation}
                  donationCampaign={donationCampaign}
                  handleSubmit={handleSubmit}
                />
              )}
            </FormSection>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
