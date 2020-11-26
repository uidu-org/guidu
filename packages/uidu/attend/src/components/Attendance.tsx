import FieldText from '@uidu/field-text';
import { Form } from '@uidu/form';
import React from 'react';

export default function Attendance({ order, attendance, handleSubmit }) {
  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={
        ({ canSubmit }) => null
        // <FormSubmit
        //   className="btn-events px-5"
        //   canSubmit={canSubmit}
        //   label={
        //     <FormattedMessage
        //       defaultMessage="Confirm"
        //       id="guidu.attend.attendance.submit"
        //     />
        //   }
        // />
      }
    >
      <FieldText type="hidden" name="orderId" value={order.id} />
      <FieldText type="hidden" name="skuId" value={attendance.skuId} />
      <div className="row">
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="Nome"
            name={`enhancements[first_name]`}
            required
          />
        </div>
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="Cognome"
            name={`enhancements[last_name]`}
            required
          />
        </div>
      </div>
      <FieldText
        type="email"
        label="Email"
        name={`enhancements[email]`}
        required
      />
    </Form>
  );
}
