import { ComponentHOC, Wrapper } from '@uidu/field-base';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { MapPin } from 'react-feather';
import FieldGeosuggestItem from './FieldGeosuggestItem';

class FieldGeosuggest extends PureComponent<any, any> {
  static defaultProps = {
    onSuggestSelect: () => {},
    onGeocode: () => {},
  };

  geolocationAvailable: boolean;
  geosuggestInput: React.RefObject<HTMLInputElement> = React.createRef();
  geocoder;
  autocompleteService;
  googleMaps;
  componentForm;

  constructor(props) {
    super(props);
    if (
      (window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost') &&
      'geolocation' in navigator
    ) {
      this.geolocationAvailable = true;
    } else {
      this.geolocationAvailable = false;
    }
    this.state = {
      value: props.value,
      help: props.help,
      loading: false,
      isSuggestsHidden: true,
      activeSuggest: null,
      suggests: [],
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.geosuggestInput.current.focus();
    }

    const googleMaps = (window as any).google && (window as any).google.maps;

    if (!googleMaps) {
      console.error('Google map api was not found in the page.');
      return;
    }

    this.googleMaps = googleMaps;

    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.geocoder = new googleMaps.Geocoder();

    this.componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const { value, onSetValue } = this.props;
    const isValueChanging = nextProps.value !== value;
    if (isValueChanging) {
      this.setState({
        value: nextProps.value,
      });
      onSetValue(nextProps.value);
    }
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.geosuggestInput.current.setSelectionRange(0, 9999);
    if (onFocus) {
      onFocus();
    }
  };

  /**
   * When the input got changed
   */
  onInputChange = event => {
    const {
      onSetValue,
      onChange,
      name,
      geocoderType,
      countryRestricted,
    } = this.props;
    const { value } = event.target;
    this.setState(
      {
        value,
      },
      () => {
        // this.props.onSetValue(userInput);
        // this.props.onChange(this.props.name, userInput);
        if (!value) {
          this.updateSuggests();
        }
      },
    );

    if (!value) {
      onSetValue(value);
      onChange(name, value);
      return;
    }

    const options: any = {
      input: value,
    };

    if (geocoderType) {
      options.types = [geocoderType];
    } else {
      options.types = ['geocode', 'establishment'];
    }

    let bounds;
    if (countryRestricted) {
      options.componentRestrictions = {
        country: countryRestricted,
      };
    } else {
      bounds = new this.googleMaps.LatLngBounds(
        new this.googleMaps.LatLng(41.887754, 12.492707),
      );
      options.bounds = bounds;
    }

    this.autocompleteService.getPlacePredictions(options, suggestsGoogle => {
      this.updateSuggests(suggestsGoogle);
    });
  };

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onInputKeyDown = event => {
    const { activeSuggest } = this.state;
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.activateSuggest('next');
        break;
      case 38: // UP
        event.preventDefault();
        this.activateSuggest('prev');
        break;
      case 13: // ENTER
        event.preventDefault();
        this.selectSuggest(activeSuggest);
        break;
      case 9: // TAB
        this.selectSuggest(activeSuggest);
        break;
      case 27: // ESC
        this.hideSuggests();
        break;
      default:
        break;
    }
  };

  /**
   * Get the suggest items for the list
   * @return {Array} The suggestions
   */
  getSuggestItems = () => {
    const { suggests, activeSuggest, value } = this.state;
    return suggests.map(suggest => {
      const isActive =
        activeSuggest && suggest.placeId === activeSuggest.placeId;

      return (
        <FieldGeosuggestItem
          key={suggest.placeId}
          suggest={suggest}
          isActive={isActive}
          userInput={value}
          onClick={this.selectSuggest}
        />
      );
    });
  };

  parseGoogleResponse = components =>
    components.reduce((acc, component) => {
      const type = component.types[0];
      acc[type] = {
        long_name: component.long_name,
        short_name: component.short_name,
      };
      return acc;
    }, {});

  getAddressFromCoordinates = (lat, lng) => {
    const {
      help,
      onSetValue,
      onChange,
      onGeocode,
      name,
      formatAddressFromCoordinates,
    } = this.props;
    const latLng = new this.googleMaps.LatLng(lat, lng);
    this.geocoder.geocode({ latLng }, (results, status) => {
      if (status === this.googleMaps.GeocoderStatus.OK) {
        if (results[1]) {
          const value = formatAddressFromCoordinates(
            this.parseGoogleResponse(results[0].address_components),
          );
          this.setState(
            {
              loading: false,
              help,
              value,
            },
            () => {
              onSetValue(value);
              onChange(name, value);
              onGeocode({ lat, lng });
            },
          );
        } else {
          this.setState({
            loading: false,
            value: '',
            help: 'No results found',
          });
        }
      } else {
        this.setState({
          loading: false,
          value: '',
          help: `Geocoder failed due to: ${status}`,
        });
      }
    });
  };

  setPositionFromBrowser = () => {
    this.setState({ loading: true, help: null });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => this.setState({ loading: false, help: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  /**
   * Update the suggests
   * @param  {Object} suggestsGoogle The new google suggests
   */
  updateSuggests = (suggestsGoogle = null) => {
    let suggestsGoogleToUse = suggestsGoogle;

    if (!suggestsGoogleToUse) {
      suggestsGoogleToUse = [];
    }

    const suggests = [];

    suggestsGoogleToUse.map(suggest => {
      suggests.push({
        label: suggest.description
          .split(', ')
          .slice(0, -1)
          .join(', '),
        placeId: suggest.place_id,
      });
    });
    this.setState(
      {
        suggests,
      },
      () => {
        if (suggests.length > 0) {
          this.showSuggests();
        } else {
          this.hideSuggests();
        }
      },
    );
  };

  /**
   * When the input gets focused
   */
  showSuggests = () => {
    this.setState({ isSuggestsHidden: false });
  };

  /**
   * When the input loses focused
   */
  hideSuggests = () => {
    this.setState({ isSuggestsHidden: true });
  };

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest = direction => {
    const suggestsCount = this.state.suggests.length - 1;
    const next = direction === 'next';

    let newActiveSuggest = null;
    let newIndex = 0;
    let i = 0;

    for (i; i <= suggestsCount; i += 1) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex];
    }

    this.setState({
      activeSuggest: newActiveSuggest,
    });
  };

  /**
   * When an item got selected
   * @param {GeosuggestItem} suggest The selected suggest item
   */
  selectSuggest = suggest => {
    const { onSetValue, onChange, name, onSuggestSelect } = this.props;
    const { value } = this.state;

    let suggestToUse = suggest;
    if (!suggestToUse) {
      suggestToUse = {
        label: value,
      };
    }
    this.setState(
      {
        isSuggestsHidden: true,
        value: suggestToUse.label,
      },
      () => {
        onSetValue(suggestToUse.label);
        onChange(name, suggestToUse.label, suggestToUse);
        if (suggestToUse.location) {
          onSuggestSelect(suggestToUse);
          return;
        }
        this.geocodeSuggest(suggestToUse);
      },
    );
  };

  /**
   * Geocode a suggest
   * @param  {Object} suggest The suggest
   */
  geocodeSuggest = suggest => {
    const { onSuggestSelect, onGeocode } = this.props;
    const suggestToUse = suggest;
    this.geocoder.geocode(
      {
        address: suggestToUse.label,
      },
      (results, status) => {
        if (status !== this.googleMaps.GeocoderStatus.OK) {
          return;
        }

        const gmaps = results[0];
        const { location } = gmaps.geometry;

        suggestToUse.gmaps = gmaps;
        suggestToUse.location = {
          lat: location.lat(),
          lng: location.lng(),
        };
        onSuggestSelect(suggestToUse);
        onGeocode(suggestToUse.location);
      },
    );
  };

  renderGeoLocation = () => {
    if (this.geolocationAvailable) {
      if (this.state.loading) {
        return (
          <div
            className="spinner-inline"
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
            <div className="rect5" />
          </div>
        );
      }
      return (
        <a
          role="button"
          tabIndex={-1}
          style={{
            padding: '1rem',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          onClick={this.setPositionFromBrowser}
        >
          <MapPin size={16} />
        </a>
      );
    }
    return null;
  };

  renderElement = () => {
    const { name, className, disabled, id, placeholder, required } = this.props;
    const { value, isSuggestsHidden } = this.state;

    return (
      <div
        // role="form-control"
        className="dropdown"
        // onClick={this.onClick}
      >
        <input
          className={classNames('form-control', className, {
            'pr-5 text-truncate': this.geolocationAvailable,
          })}
          name={name}
          ref={this.geosuggestInput}
          type="search"
          disabled={disabled}
          id={id}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          onFocus={this.onFocus}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onInputChange}
          required={required}
        />
        {this.renderGeoLocation()}
        <ul
          className={classNames('dropdown-menu', {
            show: !isSuggestsHidden,
          })}
        >
          {this.getSuggestItems()}
        </ul>
      </div>
    );
  };

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const { layout, showErrors, errorMessages } = this.props;
    const { help } = this.state;
    const element = this.renderElement();

    return <Wrapper {...this.props}>{element}</Wrapper>;
  }
}

// InputGeosuggest.defaultProps = {
//   value: '',
//   formatAddressFromCoordinates: ({ locality }) =>
//     locality ? locality.long_name : '',
//   onSuggestSelect: () => {},
//   onGeocode: () => {},
// };

export default ComponentHOC(FieldGeosuggest);
