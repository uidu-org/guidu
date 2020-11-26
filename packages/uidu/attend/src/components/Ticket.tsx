import FieldCounter from '@uidu/field-counter';
import FieldText from '@uidu/field-text';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Ticket({ ticket, index, handleCounterChange }) {
  return (
    <div className="mb-4 border-bottom pb-4" key={index}>
      <div className="">
        <div className="d-flex align-items-center">
          <div className="d-flex flex-grow-1 justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <p className="font-weight-bold mb-0">{ticket.name}</p>
              <p className="mb-0 text-muted d-flex align-items-center">
                <FormattedMessage
                  defaultMessage="{tickets} left"
                  values={{
                    tickets:
                      ticket.inventoryQuantity - (ticket.inventoryLeft || 0),
                  }}
                />
              </p>
            </div>
            {ticket.price > 0 ? (
              <span className="mx-3">{ticket.price / 100} €</span>
            ) : null}
          </div>
          <div style={{ flex: '0 0 20%' }} className="flex-shrink-0">
            <FieldText
              type="hidden"
              name={`items[${index}][id]`}
              value={ticket.id}
            />
            <FieldText
              type="hidden"
              name={`items[${index}][stripeKind]`}
              value="sku"
            />
            <FieldCounter
              name={`items[${index}][quantity]`}
              layout="elementOnly"
              className="form-control form-control-sm"
              min={0}
              max={10}
              placeholder="0"
              mobile
              onChange={(_name, value) => {
                handleCounterChange(ticket, value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
