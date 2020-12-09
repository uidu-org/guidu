import FieldText from '@uidu/field-text';
import React from 'react';

export default function Attendance({ attendance, index }) {
  return (
    <>
      <FieldText
        type="hidden"
        name={`attendancesAttributes[${index}][orderItemId]`}
        value={attendance.orderItemId}
      />
      <div className="row">
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="Nome"
            name={`attendancesAttributes[${index}][attenderAttributes][firstName]`}
            required
          />
        </div>
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="Cognome"
            name={`attendancesAttributes[${index}][attenderAttributes][lastName]`}
            required
          />
        </div>
      </div>
      <FieldText
        type="email"
        label="Email"
        name={`attendancesAttributes[${index}][attenderAttributes][email]`}
        required
      />
    </>
  );
}
