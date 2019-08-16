const ComponentCommon = () => null;

ComponentCommon.defaultProps = {
  onChange: () => {},
  onSetValue: () => {},
  disabled: false,
  showErrors: false,
  layout: 'vertical',
  label: '',
  help: undefined,
  errorMessages: [],
};

export default ComponentCommon;
