import { MapPinIcon } from '@heroicons/react/24/outline';
import Spinner from '@uidu/spinner';
import React, { MouseEvent, useState } from 'react';

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
      (error) => {
        setIsLoading(false);
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };
  return (
    <button
      tw="px-4 flex items-center h-full"
      type="button"
      onClick={fetchCurrentPosition}
    >
      {isLoading ? <Spinner size="small" /> : <MapPinIcon tw="h-5 w-5" />}
    </button>
  );
}
