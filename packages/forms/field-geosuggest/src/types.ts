import { FieldBaseProps } from '@uidu/field-base/src';
import { LatLng, Suggestion } from 'use-places-autocomplete';

export type FieldGeosuggestProps = {
  onSuggestSelect?: (suggestion: Suggestion) => void;
  onGeocode?: (props: LatLng) => void;
  geocoderType?: Array<string>;
  bounds?: any;
  countryRestricted: string;
} & FieldBaseProps;

export type FieldGeosuggestItemProps = {
  suggestion: Suggestion;
  isActive?: boolean;
  onClick: (suggestion: Suggestion) => void;
};
