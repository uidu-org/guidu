import { dateField } from '@uidu/data-fields';
import moment from 'moment';
import Editor from './editor';

export default field => ({
  type: dateField.kind,
  cellEditorFramework: Editor,
  filter: 'agDateColumnFilter',
  headerComponentParams: { menuIcon: dateField.icon },
  comparator: (valueA, valueB) => {
    if (valueA === null) {
      return -1;
    }
    if (valueB === null) {
      return 1;
    }

    return +valueA.momentObj - +valueB.momentObj;
  },
  valueGetter: params => {
    if (!params.data) {
      return null;
    }

    const momentObj = moment(params.data[field.colId]);

    return {
      year: momentObj.format('YYYY'),
      month: momentObj.format('MMM YYYY'),
      day: momentObj.format('DDD MM YYYY'),
      momentObj,
    };
  },
  valueFormatter: ({ value, aggData, node }) =>
    node && node.group ? null : value.momentObj.format(field.format),
  keyCreator: params => {
    return params.value.month;
    return params.value.momentObj.format('LLL');
  },
});
