// @flow
import type { DefaultBaseProps } from './types';

const defaultBaseProps: DefaultBaseProps = {
  isDisabled: false,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  size: 'regular',
  label: '',
  name: '',
  value: '',
  activeColor: '#28a745',
  baseColor: '#ededed',
};
export default defaultBaseProps;
