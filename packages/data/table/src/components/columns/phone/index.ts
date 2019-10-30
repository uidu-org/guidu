import { phoneField } from '@uidu/data-fields';
import Renderer from './renderer';

export default () => ({
  type: phoneField.id,
  filter: 'agTextColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: phoneField.icon },
});
