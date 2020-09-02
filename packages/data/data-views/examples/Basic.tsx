import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import dataViews from '../src';
import { formDefaultProps } from '../../../forms/form/examples-utils';

export default class Basic extends PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      currentDataView: null,
    };
  }

  renderConfigurator = () => {
    const { currentDataView } = this.state;
    const { configurator: ConfiguratorForm, before } = currentDataView;
    return (
      <>
        <h6 className="d-flex align-items-center">
          <span className="mr-2">{before}</span>
          {currentDataView.name}
        </h6>
        <p>{currentDataView.description}</p>
        <ConfiguratorForm fallback={<div>Loading...</div>} />
      </>
    );
  };

  render() {
    const { currentDataView } = this.state;
    return (
      <IntlProvider locale="en">
        <Form {...formDefaultProps}>
          <Select
            name="dataview"
            options={dataViews.map(({ icon: Icon, color, ...rest }) => ({
              ...rest,
              before: <Icon size={16} color={color} />,
            }))}
            label="Choose dataView"
            onChange={(name, value, { option }) => {
              this.setState({
                currentDataView: option,
              });
            }}
          />
          {currentDataView ? this.renderConfigurator() : null}
        </Form>
      </IntlProvider>
    );
  }
}
