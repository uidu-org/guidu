import { StyledRow, Wrapper } from '@uidu/field-base';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import React, {
  forwardRef,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import tw from 'twin.macro';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  RequestOptions,
  Suggestion,
} from 'use-places-autocomplete';
import { FieldGeosuggestProps } from '../types';
import FieldGeosuggestCurrentPosition from './FieldGeosuggestCurrentPosition';
import FieldGeosuggestItem from './FieldGeosuggestItem';

function FieldGeosuggest({
  onSuggestSelect = () => {},
  onGeocode,
  name,
  autoFocus,
  className,
  disabled,
  id,
  placeholder,
  required,
  geocoderType,
  bounds,
  countryRestricted,
  onSetValue,
  onChange,
  forwardedRef,
  geolocationEnabled = true,
  option: OptionRenderer = FieldGeosuggestItem,
  valueGetter,
  filterOption = (_option: Suggestion) => true,
  value: propValue,
  ...rest
}: FieldGeosuggestProps) {
  const element = useRef<HTMLInputElement>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(
    null,
  );

  useImperativeHandle(forwardedRef, () => element.current);

  const requestOptions: RequestOptions = {
    types: geocoderType || ['geocode', 'establishment'],
  };
  if (bounds) {
    requestOptions.bounds = bounds;
  }
  if (countryRestricted) {
    requestOptions.componentRestrictions = {
      country: countryRestricted,
    };
  }

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions,
    debounce: 300,
    defaultValue: propValue,
  });

  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(false);

  useEffect(() => {
    if (geolocationEnabled) {
      if (
        (window.location.protocol === 'https:' ||
          window.location.hostname === 'localhost') &&
        'geolocation' in navigator
      ) {
        setIsGeolocationAvailable(true);
      } else {
        setIsGeolocationAvailable(false);
      }
    }
  }, [geolocationEnabled]);

  const activateSuggestion = (direction: string) => {
    const suggestsCount = data.length - 1;
    const next = direction === 'next';

    let newActiveSuggest = null;
    let newIndex = 0;
    let i = 0;

    for (i; i <= suggestsCount; i += 1) {
      if (data[i] === activeSuggestion) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!activeSuggestion) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = data[newIndex];
    }

    setActiveSuggestion(newActiveSuggest);
  };

  const geocodeSuggestion = ({ description }) => {
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(onGeocode)
      .catch((error) => {
        console.log('😱 Error: ', error);
      });
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    if (!suggestion) return null;

    const { description } = suggestion;
    let v = description;
    if (valueGetter) {
      v = valueGetter(suggestion);
    }
    setValue(v, false);
    // formsy
    onSetValue(v);
    onChange(name, v, suggestion);
    // callbacks
    if (onGeocode) {
      geocodeSuggestion(suggestion);
    }
    clearSuggestions();
    return undefined;
  };

  const onInputKeyDown = (event: KeyboardEvent) => {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        activateSuggestion('next');
        break;
      case 38: // UP
        event.preventDefault();
        activateSuggestion('prev');
        break;
      case 13: // ENTER
        event.preventDefault();
        selectSuggestion(activeSuggestion);
        break;
      case 9: // TAB
        selectSuggestion(activeSuggestion);
        break;
      case 27: // ESC
        clearSuggestions();
        break;
      default:
        break;
    }
  };

  const onInputFocus = () => {
    element.current?.setSelectionRange(0, 9999);
  };

  const onInputChange = (e) => setValue(e.target.value);

  return (
    <Wrapper
      overrides={{
        StyledRow: {
          component: (props) => <StyledRow tw="relative" {...props} />,
        },
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(isGeolocationAvailable
        ? {
            addonAfter: (
              <FieldGeosuggestCurrentPosition onGeocode={onGeocode} />
            ),
          }
        : {})}
      required={required}
      id={id}
    >
      <input
        className={className}
        css={[
          tw`background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]`,
          isGeolocationAvailable && tw`pr-14`,
        ]}
        disabled={!ready || disabled}
        name={name}
        ref={element}
        type="search"
        id={id}
        value={value}
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder={placeholder as string}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        required={required}
      />
      <div tw="absolute overflow-y-scroll p-0 z-30 w-full rounded-b bg-white shadow max-h-72 divide-y top-full">
        {status === 'OK' && (
          <MenuGroup>
            {data.filter(filterOption).map((suggestion) => {
              const isActive =
                activeSuggestion &&
                suggestion.reference === activeSuggestion.reference;

              return (
                <ButtonItem
                  key={suggestion.reference}
                  onClick={() => selectSuggestion(suggestion)}
                  isSelected={isActive}
                >
                  <OptionRenderer suggestion={suggestion} />
                </ButtonItem>
              );
            })}
          </MenuGroup>
        )}
      </div>
    </Wrapper>
  );
}

export default forwardRef((props: FieldGeosuggestProps, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldGeosuggest {...props} forwardedRef={ref} />
));
