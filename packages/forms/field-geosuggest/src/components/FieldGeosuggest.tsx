import {
  noop,
  StyledAddon,
  StyledInput,
  StyledRow,
  useController,
  Wrapper,
} from '@uidu/field-base';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import DefaultPopup, { TriggerProps } from '@uidu/popup';
import React, {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import tw from 'twin.macro';
import usePlacesAutocomplete, {
  GeoArgs,
  getGeocode,
  getLatLng,
  RequestOptions,
  Suggestion,
} from 'use-places-autocomplete';
import { FieldGeosuggestProps } from '../types';
import FieldGeosuggestCurrentPosition from './FieldGeosuggestCurrentPosition';
import FieldGeosuggestItem from './FieldGeosuggestItem';

function FieldGeosuggest({
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
  onChange = noop,
  forwardedRef,
  geolocationEnabled = true,
  option: OptionRenderer = FieldGeosuggestItem,
  valueGetter,
  filterOption = () => true,
  value: defaultValue = '',
  popupComponent: Popup = DefaultPopup,
  ...rest
}: FieldGeosuggestProps) {
  const { field, wrapperProps, inputProps, fieldState } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const element = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardedRef, () => element.current, [element]);

  const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(
    null,
  );

  const requestOptions: RequestOptions = {
    types: geocoderType || ['geocode', 'establishment'],
    ...(bounds ? { bounds } : {}),
    ...(countryRestricted ? { country: countryRestricted } : {}),
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'googleMapsCallback',
    requestOptions,
    debounce: 300,
    defaultValue,
  });

  const { onChange: onFieldChange, ref: fieldRef } = field;

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

  const activateSuggestion = useCallback(
    (direction: string): void => {
      const suggestsCount = data.length - 1;
      const next = direction === 'next';

      let newActiveSuggest: Suggestion = null;
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
    },
    [activeSuggestion, data],
  );

  const geocodeSuggestion = useCallback(
    ({ description }: { description: GeoArgs['address'] }) => {
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(onGeocode)
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    },
    [onGeocode],
  );

  const selectSuggestion = useCallback(
    (suggestion: Suggestion): undefined => {
      if (!suggestion) return null;

      const { description } = suggestion;
      let v = description;
      if (valueGetter) {
        v = valueGetter(suggestion);
      }
      setValue(v, false);
      onFieldChange(v);
      onChange(name, v, suggestion);
      // callbacks
      if (onGeocode) {
        geocodeSuggestion(suggestion);
      }
      clearSuggestions();
      return undefined;
    },
    [
      clearSuggestions,
      valueGetter,
      setValue,
      onFieldChange,
      geocodeSuggestion,
      onChange,
      name,
      onGeocode,
    ],
  );

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown': // DOWN
          event.preventDefault();
          activateSuggestion('next');
          break;
        case 'ArrowUp': // UP
          event.preventDefault();
          activateSuggestion('prev');
          break;
        case 'Enter': // ENTER
          event.preventDefault();
          selectSuggestion(activeSuggestion);
          break;
        case 'Tab': // TAB
          selectSuggestion(activeSuggestion);
          break;
        case 'Escape': // ESC
          clearSuggestions();
          break;
        default:
          break;
      }
    },
    [selectSuggestion, activeSuggestion, clearSuggestions, activateSuggestion],
  );

  const onInputFocus = useCallback(() => {
    element.current?.setSelectionRange(0, 9999);
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        onFieldChange(e.target.value);
      }

      setValue(e.target.value);
    },
    [setValue, onFieldChange],
  );

  const CachedStyledRow = useCallback(
    (props) => (
      <StyledRow
        tw="relative"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    ),
    [],
  );

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledInput
        {...inputProps}
        {...triggerProps}
        ref={(e) => {
          if (e) {
            triggerProps.ref(e);
            element.current = e;
            fieldRef(e);
          }
        }}
        $hasError={!!fieldState?.error}
        value={value}
        className={className}
        css={[isGeolocationAvailable && tw`pr-14`]}
        disabled={!ready || disabled}
        type="search"
        autoComplete="off"
        // autoFocus={autoFocus}
        placeholder={placeholder as string}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        required={required}
      />
    ),
    [
      ready,
      value,
      fieldRef,
      fieldState?.error,
      className,
      disabled,
      placeholder,
      required,
      onInputFocus,
      onInputKeyDown,
      onInputChange,
      isGeolocationAvailable,
      inputProps,
    ],
  );

  const Content = useCallback(
    () => (
      <div tw="" style={{ minWidth: element.current.offsetWidth }}>
        <MenuGroup>
          {data.filter(filterOption).map((suggestion) => {
            const isActive =
              activeSuggestion &&
              suggestion.place_id === activeSuggestion.place_id;

            return (
              <ButtonItem
                key={suggestion.place_id}
                onClick={() => selectSuggestion(suggestion)}
                isSelected={isActive}
              >
                <OptionRenderer suggestion={suggestion} />
              </ButtonItem>
            );
          })}
        </MenuGroup>
      </div>
    ),
    [data, activeSuggestion, selectSuggestion, filterOption, OptionRenderer],
  );

  return (
    <Wrapper
      overrides={{
        StyledRow: {
          component: CachedStyledRow,
        },
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...wrapperProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(isGeolocationAvailable
        ? {
            addonsAfter: [
              <StyledAddon>
                <FieldGeosuggestCurrentPosition onGeocode={onGeocode} />
              </StyledAddon>,
            ],
          }
        : {})}
      required={required}
    >
      <div tw="relative w-full">
        <Popup
          autoFocus={false}
          isOpen={status === 'OK'}
          placement="bottom-start"
          trigger={Trigger}
          content={Content}
        />
      </div>
    </Wrapper>
  );
}

export default forwardRef((props, ref) => (
  <FieldGeosuggest forwardedRef={ref} {...props} />
));
