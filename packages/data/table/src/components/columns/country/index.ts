import { countryField } from '@uidu/data-fields';
import { allCountries } from '@uidu/select';
import Renderer from './renderer';

export default field => ({
  type: countryField.kind,
  viewType: countryField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: countryField.icon,
  },
  cellRenderer: Renderer,
  cellRendererParams: { options: allCountries },
  // keyCreator: params => params.value.name,
  filterValueGetter: params => params.data[field.colId],
  // keyCreator: params => params.value,
  // valueGetter: ({ data }) =>
  //   allCountries.filter(option => option.id === data[field.colId])[0],
});
