import { linkRecordField } from '@uidu/data-fields';
import Renderer from './renderer';

export default () => ({
  type: linkRecordField.kind,
  viewType: linkRecordField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: linkRecordField.icon },
  cellRenderer: Renderer,
});
