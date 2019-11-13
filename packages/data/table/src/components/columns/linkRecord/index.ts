import { linkRecordField } from '@uidu/data-fields';
import Renderer from './renderer';

export default () => ({
  type: linkRecordField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: linkRecordField.icon },
  cellRendererFramework: Renderer,
  keyCreator: params => params.value.name,
});
