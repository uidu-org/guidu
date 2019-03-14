export default {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  scrollwheel: false,
  styles: [
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        { hue: '#FFBB00' },
        { saturation: 43.400000000000006 },
        { lightness: 37.599999999999994 },
        { gamma: 1 },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        { hue: '#00FF6A' },
        { saturation: -1.0989010989011234 },
        { lightness: 11.200000000000017 },
        { gamma: 1 },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        { hue: '#FFC200' },
        { saturation: -61.8 },
        { lightness: 45.599999999999994 },
        { gamma: 1 },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { hue: '#FF0300' },
        { saturation: -100 },
        { lightness: 51.19999999999999 },
        { gamma: 1 },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        { hue: '#FF0300' },
        { saturation: -100 },
        { lightness: 52 },
        { gamma: 1 },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        { hue: '#0078FF' },
        { saturation: -13.200000000000003 },
        { lightness: 2.4000000000000057 },
        { gamma: 1 },
      ],
    },
  ],
};
