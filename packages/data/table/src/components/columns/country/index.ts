import { countryField } from '@uidu/data-fields';
import { allCountries } from '@uidu/select';
import Renderer from './renderer';

console.log(allCountries);

export default field => ({
  type: countryField.kind,
  filter: 'agTextColumnFilter',

  headerComponentParams: {
    menuIcon: countryField.icon,
  },
  cellRenderer: Renderer,
  keyCreator: params => params.value.name,
  valueGetter: ({ data }) =>
    allCountries.filter(option => option.abbr === data[field.colId])[0],
});
