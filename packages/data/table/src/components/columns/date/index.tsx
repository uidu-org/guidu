import { dateField } from '@uidu/data-fields';
import moment from 'moment';
import Editor from './editor';

export default ({ format = 'L' }) => ({
  type: dateField.kind,
  cellEditorFramework: Editor,
  filter: 'agDateColumnFilter',
  headerComponentParams: { menuIcon: dateField.icon },
  valueFormatter: ({ value, aggData, node }) =>
    node && node.group ? null : moment(value).format(format),
  // cellClass: 'justify-content-center',
  // headerClass: 'text-center',
});
