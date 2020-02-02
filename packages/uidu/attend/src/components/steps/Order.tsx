import FieldCounter from '@uidu/field-counter';
import FieldText from '@uidu/field-text';
import { Form, FormSectionSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';

export default class AttendancesOrder extends PureComponent<any> {
  render() {
    const { event, onSave } = this.props;

    return (
      <div>
        <Form
          handleSubmit={onSave}
          footerRenderer={({ canSubmit, loading }) => (
            <FormSectionSubmit
              scope="events"
              canSubmit={canSubmit}
              loading={loading}
              label={'utils.actions.attend.default'}
            />
          )}
        >
          <FieldText type="hidden" name="order[kind]" value="event" />
          <FieldText type="hidden" name="order[currency]" value="eur" />
          {(event.tickets || []).map((ticket, index) => (
            <div
              className="card mb-3 d-flex justify-content-between flex-md-row p-3 align-items-md-center"
              key={index}
            >
              <div className="w-75 mb-3 mb-md-0">
                <p className="text-medium mb-0">
                  {ticket.stripeAttributes.name}
                </p>
                <p className="mb-0 text-muted d-flex align-items-center">
                  {ticket.price > 0 ? (
                    <span className="mr-2">{ticket.price / 100} €</span>
                  ) : null}
                  <span className="badge badge-light py-1">
                    {ticket.inventoryQuantity - (ticket.inventoryLeft || 0)}{' '}
                    rimanenti
                  </span>
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <FieldText
                  type="hidden"
                  name={`order[order_items_attributes][${index}][stripe_id]`}
                  value={ticket.stripeId}
                />
                <FieldText
                  type="hidden"
                  name={`order[order_items_attributes][${index}][stripe_kind]`}
                  value="sku"
                />
                <FieldCounter
                  name={`order[order_items_attributes][${index}][quantity]`}
                  layout="elementOnly"
                  className="form-control form-control-sm"
                  placeholder={`Select how many ${ticket.stripeAttributes.name} tickets`}
                />
              </div>
            </div>
          ))}
        </Form>
      </div>
    );
  }
}
