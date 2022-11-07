import React from 'react';
import { FieldDateStateless } from '../src';

export default function Stateless() {
  return (
    <div>
      <FieldDateStateless
        formatSubmit="yyyy-MM-dd"
        displayFormat="yyyy-MM-dd"
        onChange={console.log}
      />
      <FieldDateStateless
        formatSubmit="yyyy-MM-dd"
        displayFormat="yyyy-MM-dd"
        value="2022-11-20"
      />
    </div>
  );
}
