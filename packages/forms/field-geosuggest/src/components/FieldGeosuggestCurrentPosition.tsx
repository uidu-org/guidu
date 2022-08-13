import Spinner from '@uidu/spinner';
import React, { MouseEvent, useState } from 'react';
import { MapPin } from 'react-feather';

export default function FieldGeosuggestCurrentPosition({
  onGeocode,
}: {
  onGeocode: (geocode: GeolocationPosition['coords']) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentPosition = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        if (onGeocode) {
          onGeocode(position.coords);
        }
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };
  return (
    <button
      tw="absolute right-0 inset-y-0 px-5 flex items-center"
      type="button"
      onClick={fetchCurrentPosition}
    >
      {isLoading ? <Spinner size="small" /> : <MapPin size={16} />}
    </button>
  );
}
