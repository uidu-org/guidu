import { paymentMethodField } from '@uidu/data-fields';
import Renderer from './renderer';

export default field => ({
  type: paymentMethodField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: paymentMethodField.icon,
  },
  keyCreator: params => params.value.name,
  filterValueGetter: params => params.data[field.colId],
  cellRenderer: Renderer,
  cellRendererParams: {
    options: field.options,
  },
  valueGetter: ({ data }) => {
    if (!data) {
      return null;
    }

    return field.options.filter(option => option.id === data[field.colId])[0];
  },
});
