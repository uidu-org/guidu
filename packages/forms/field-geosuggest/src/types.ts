import { FieldBaseProps } from '@uidu/field-base/src';
import { LatLon, Suggestion } from 'use-places-autocomplete';

export type FieldGeosuggestProps = {
  onSuggestSelect?: (suggestion: Suggestion) => void;
  onGeocode?: (props: LatLon) => void;
  geocoderType?: Array<string>;
  bounds?: any;
  countryRestricted?: string;
  geolocationEnabled?: boolean;
  /** Customize how suggestions are rendered in dropdown */
  option?: React.FC<FieldGeosuggestItemProps>;
  /** How suggest to convert in value */
  valueGetter?: (suggestion: Suggestion) => string;
  /** Filter options to further customize google places autocomplete results */
  filterOption?: (suggestion: Suggestion) => boolean;
} & FieldBaseProps;

export type FieldGeosuggestItemProps = {
  suggestion: Suggestion;
  isActive?: boolean;
};
