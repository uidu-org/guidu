import { progressField } from '@uidu/data-fields';
import Renderer from './renderer';

export default () => ({
  type: progressField.kind,
  filter: 'agNumberColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: progressField.icon },
});
