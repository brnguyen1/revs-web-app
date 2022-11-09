import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '500px'
};

const center = {
  lat: 30.612552,
  lng: -96.341326
};

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDfNjTUiHor5frrxETqjmmRFPlQFbxAkro"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    
    <center>
        <h4>Google Maps API</h4>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        mapTypeId='satellite'
        onUnmount={onUnmount}
      >
        { /*CUSTOMIZE MAP HERE WIP */ }
        <></>
      </GoogleMap>
      </center>
  ) : <></>
}

export default React.memo(Maps)