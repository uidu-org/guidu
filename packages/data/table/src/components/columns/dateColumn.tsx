import moment from 'moment';
import DatePicker from '../editors/DatePicker';

export default () => ({
  cellEditorFramework: DatePicker,
  filter: 'agDateColumnFilter',
  valueFormatter: ({ value }) => moment(value).format('L'),
});
