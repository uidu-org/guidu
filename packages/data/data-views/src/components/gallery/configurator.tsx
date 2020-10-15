import { Toggler } from '@uidu/data-controls';
import FieldCounter from '@uidu/field-counter';
import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import CardTypes from '../utils/CardTypes';

export default class Configurator extends PureComponent<any> {
  handleSubmit = async (model) => console.log(model);

  render() {
    const {
      columnDefs,
      onDragEnd,
      columnCount,
      onSetColumnCount,
      tableInstance,
    } = this.props;

    return (
      <>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">Card preferences</h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <div className="row">
                <div className="col-6">
                  <FieldCounter
                    name="columnCount"
                    label={
                      <FormattedMessage
                        defaultMessage="Column count"
                        id="data_views.gallery.configurator.columnCount"
                      />
                    }
                    value={columnCount}
                    onChange={(_name, value) => onSetColumnCount(value)}
                    min={1}
                    max={5}
                    rowClassName="mb-0"
                  />
                </div>
                <div className="col-6">
                  <CardTypes
                    columnDefs={columnDefs}
                    tableInstance={tableInstance}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">Visible fields</h6>
          </div>
        </div>
        <Toggler
          {...this.props}
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
        />
      </>
    );
  }
}
