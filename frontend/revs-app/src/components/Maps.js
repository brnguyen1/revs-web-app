import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '150%',
  height: '300%'
};

const center = {
  lat: 30.61253,
  lng: -96.34074
};

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDfNjTUiHor5frrxETqjmmRFPlQFbxAkro"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const revMarker = new window.google.maps.Marker({
    position:center,
    map:map,
    label:"Rev's American Grill"
  })

  return isLoaded ? (
    <div className="h-100 mt-4">
      <h4>Google Maps API</h4>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /*CUSTOMIZE MAP HERE WIP */}
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(Maps)