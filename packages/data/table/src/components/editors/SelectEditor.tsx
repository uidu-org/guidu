import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';

export default class SelectEditor extends PureComponent<any, any> {
  private select: any;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentDidMount() {
    this.focus();
  }

  focus = () => {
    window.setTimeout(() => {
      this.select.focus();
      // let container = ReactDOM.findDOMNode(this.refs.container);
      // if (container) {
      //   container.focus();
      // }
    });
  };

  getValue() {
    console.log(this.state.value);
    return this.state.value;
  }

  isPopup() {
    return false;
  }

  setValue = (_name, value) => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.api.stopEditing();
      },
    );
  };

  render() {
    const { column, options, node, multiple } = this.props;
    const { value } = this.state;

    return (
      <div
        ref="container"
        tabIndex={1} // important - without this the keypresses wont be caught
        style={{
          width: column.actualWidth - 2,
          lineHeight: 'initial',
        }}
      >
        <Form
          handleSubmit={async model => console.log(model)}
          footerRenderer={() => {}}
        >
          <Select
            multiple={multiple}
            componentRef={ref => {
              this.select = ref;
            }}
            layout="elementOnly"
            name="value"
            options={options}
            menuPortalTarget={document.body}
            isSearchable
            styles={{
              control: base => ({
                ...base,
                height: node.rowHeight - 3,
              }),
            }}
            value={value}
            onChange={this.setValue}
            menuIsOpen={true}
            // menuShouldBlockScroll
          />
        </Form>
      </div>
    );
  }
}
