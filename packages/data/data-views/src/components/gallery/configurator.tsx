import { Toggler } from '@uidu/data-controls';
import FieldNumber from '@uidu/field-number';
import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import { CheckSquare, Grid, Layout } from 'react-feather';

export default class Configurator extends PureComponent<any> {
  handleSubmit = async model => console.log(model);

  render() {
    const {
      columnDefs,
      onDragEnd,
      onToggle,
      columnCount,
      onSetColumnCount,
    } = this.props;
    return (
      <>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <Grid size={16} className="mr-2" />
              Column Count
            </h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <FieldNumber
                name="columnCount"
                layout="elementOnly"
                value={columnCount}
                onChange={(_name, value) => onSetColumnCount(value)}
                min={1}
                max={5}
              />
            </Form>
          </div>
        </div>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <Layout size={16} className="mr-2" />
              Card preferences
            </h6>
          </div>
        </div>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <CheckSquare size={16} className="mr-2" />
              Visible fields
            </h6>
          </div>
        </div>
        <Toggler
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
          onToggle={onToggle}
          {...this.props}
        />
      </>
    );
  }
}
