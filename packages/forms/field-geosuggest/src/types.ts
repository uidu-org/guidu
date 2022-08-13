import { FieldBaseProps } from '@uidu/field-base/src';
import { LatLng, RequestOptions, Suggestion } from 'use-places-autocomplete';

export type FieldGeosuggestProps<T> = {
  onSuggestSelect?: (suggestion: Suggestion) => void;
  onGeocode?: (props: LatLng) => void;
  geocoderType?: RequestOptions['types'];
  bounds?: RequestOptions['bounds'];
  countryRestricted?: string;
  geolocationEnabled?: boolean;
  /** Customize how suggestions are rendered in dropdown */
  option?: React.FC<FieldGeosuggestItemProps>;
  /** How suggest to convert in value */
  valueGetter?: (suggestion: Suggestion) => string;
  /** Filter options to further customize google places autocomplete results */
  filterOption?: (suggestion: Suggestion) => boolean;
} & FieldBaseProps<T>;

export type FieldGeosuggestItemProps = {
  suggestion: Suggestion;
  isActive?: boolean;
};
