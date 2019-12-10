import { checkboxField } from '@uidu/data-fields';
import Renderer from './renderer';

export default () => ({
  // cellEditorFramework: DatePicker,
  type: checkboxField.kind,
  viewType: checkboxField.kind,
  filter: 'agDateColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: checkboxField.icon },
});
