import { Wrapper } from '@uidu/field-base';
import InlineDialog from '@uidu/inline-dialog';
import React, { PureComponent } from 'react';
import { EditableInput, Swatch } from 'react-color/lib/components/common';
import color from 'react-color/lib/helpers/color';

const DefaultTrigger = ({ toggleDialog, value }) => (
  <button
    className="btn btn-sm border p-0 d-block"
    type="button"
    onClick={toggleDialog}
  >
    <div
      style={{
        backgroundColor: value,
        width: '3rem',
        height: '1.5rem',
        borderRadius: '2px',
      }}
    />
  </button>
);

class FieldColorPicker extends PureComponent<any, any> {
  static defaultProps = {
    trigger: DefaultTrigger,
    colors: [
      '#FF6900',
      '#FCB900',
      '#7BDCB5',
      '#00D084',
      '#8ED1FC',
      '#0693E3',
      '#ABB8C3',
      '#EB144C',
      '#F78DA7',
      '#9900EF',
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  onChange = ({ hex }) => {
    const { onSetValue, onChange, name } = this.props;
    onSetValue(hex);
    onChange(name, hex);
    this.toggleDialog();
  };

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen });

  handleClick = (hexcode, _e) =>
    color.isValidHex(hexcode) &&
    this.onChange({
      hex: hexcode.startsWith('#') ? hexcode : `#${hexcode}`,
    });

  render() {
    const { value, trigger: Trigger, colors } = this.props;
    const { dialogOpen } = this.state;

    const content = (
      <div style={{ width: 276, marginTop: 6 }}>
        {colors.map((color, index) => (
          <Swatch
            key={index}
            color={color}
            hex={color}
            onClick={this.handleClick}
            style={{
              width: '30px',
              height: '30px',
              float: 'left',
              borderRadius: '4px',
              margin: '0 6px 6px 0',
            }}
          />
        ))}
        <div
          style={{
            background: '#F0F0F0',
            height: '30px',
            width: '30px',
            borderRadius: '4px 0 0 4px',
            float: 'left',
            color: '#98A1A4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          #
        </div>
        <EditableInput
          label={null}
          style={{
            input: {
              width: '100px',
              fontSize: '14px',
              color: '#666',
              border: '0px',
              outline: 'none',
              height: '28px',
              boxShadow: 'inset 0 0 0 1px #F0F0F0',
              boxSizing: 'content-box',
              borderRadius: '0 4px 4px 0',
              float: 'left',
              paddingLeft: '8px',
            },
          }}
          value={value ? value.replace('#', '') : ''}
          onChange={this.handleClick}
        />
      </div>
    );

    return (
      <Wrapper {...this.props}>
        <InlineDialog
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          content={content}
          isOpen={dialogOpen}
        >
          <Trigger toggleDialog={this.toggleDialog} value={value} />
        </InlineDialog>
      </Wrapper>
    );
  }
}

export default FieldColorPicker;
