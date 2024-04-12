import { FieldBaseProps } from '@uidu/field-base/src';
import { PopupProps } from '@uidu/popup';
import { LatLng, RequestOptions, Suggestion } from 'use-places-autocomplete';

export type FieldGeosuggestProps = {
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
  /** Custom popup component */
  popupComponent?: React.FC<PopupProps>;
} & FieldBaseProps<string>;

export type FieldGeosuggestItemProps = {
  suggestion: Suggestion;
  isActive?: boolean;
};
