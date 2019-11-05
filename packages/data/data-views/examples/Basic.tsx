import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import { tableDataView } from '..';
import { formDefaultProps } from '../../../forms/form/examples-utils';

export default class Basic extends PureComponent {
  render() {
    const { form: LinkRecordForm } = tableDataView;
    return (
      <>
        <h6>
          {tableDataView.icon} {tableDataView.name}
        </h6>
        <p>{tableDataView.description}</p>
        {LinkRecordForm && (
          <Form {...formDefaultProps}>
            <LinkRecordForm
              onSave={console.log}
              options={[{ id: 1, name: 'Donations' }]}
            />
          </Form>
        )}
      </>
    );
  }
}
