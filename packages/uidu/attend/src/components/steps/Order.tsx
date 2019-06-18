import FieldCounter from '@uidu/field-counter';
import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import moment from 'moment';
import React, { PureComponent } from 'react';

export default class AttendancesOrder extends PureComponent<any> {
  render() {
    const { event, onSave } = this.props;

    return (
      <div className="p-3 p-xl-4">
        <h1 className="h4 font-weight-bold mb-1">{event.name}</h1>
        <p className="mb-0">{event.location.address}</p>
        <p>
          {moment([event.beginsAt, event.beginTime].join(' ')).format('LL')} -{' '}
          {moment([event.finishesAt, event.endTime].join(' ')).format('LL')}
          <br />
          <a href="">Aggiungi al calendario</a>
        </p>
        {event.tags && event.tags.length > 0 && (
          <div>
            <dt>{'views.events.show.tags.title'}</dt>
            <dd>
              {event.tags.map(elem => (
                <a
                  href={`/search?q=${elem.name}`}
                  key={`tag_${elem.id}`}
                  className="badge badge-info badge-pill mr-1"
                >
                  #{elem.name}
                </a>
              ))}
            </dd>
          </div>
        )}
        <Form
          handleSubmit={onSave}
          footerRenderer={({ canSubmit, loading }) => (
            <FormFooter>
              <FormSubmit
                className="btn-events btn-block"
                canSubmit={canSubmit}
                loading={loading}
                label={'utils.actions.attend.default'}
              />
            </FormFooter>
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
