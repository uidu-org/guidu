import Input from '@uidu/field-text';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import React from 'react';

export default function AttendancesFormInfo({
  attendance,
  order,
  onSave,
  ...otherProps
}) {
  console.log(order);
  console.log(otherProps);
  if (!order) {
    return null;
  }

  if (!order.items) {
    return null;
  }

  let childIndex = -1;

  return (
    <div className="p-3 p-xl-4">
      <Form
        handleSubmit={async model => console.log}
        withLoader={false}
        footerRenderer={({ canSubmit }) => (
          <FormFooter>
            <FormSubmit
              className="btn-events btn-block"
              canSubmit={canSubmit}
              label={'utils.actions.attend.default'}
            />
          </FormFooter>
        )}
      >
        {order.items
          .filter(item => item.stripeKind === 'sku')
          .map(item => {
            const ticketAttendances = Array.from(Array(item.quantity).keys());
            return ticketAttendances.map(() => {
              childIndex += 1;
              return (
                <div className="card card-body mb-3 p-3">
                  <Input
                    type="hidden"
                    name={`attendances[${childIndex}][order_id]`}
                    value={order.id}
                  />
                  <Input
                    type="hidden"
                    name={`attendances[${childIndex}][sku_id]`}
                    value={item.skuId}
                  />
                  <Input
                    type="text"
                    label="Nome"
                    name={`attendances[${childIndex}][enhancements][first_name]`}
                  />
                  <Input
                    type="text"
                    label="Cognome"
                    name={`attendances[${childIndex}][enhancements][last_name]`}
                  />
                  <Input
                    type="email"
                    label={`Partecipante ${childIndex + 1} biglietto ${
                      item.description
                    }`}
                    name={`attendances[${childIndex}][enhancements][email]`}
                  />
                </div>
              );
            });
          })}
      </Form>
    </div>
  );
}

AttendancesFormInfo.defaultProps = {
  form: {},
  attendance: {},
};
